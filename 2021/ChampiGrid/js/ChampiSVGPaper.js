/**
 *  EXEMPLE DE CANVAS PAPERJS (LIBRAIRIE POUR DESSIN VECTORIEL : http://paperjs.org/ )
 *  OU L'ON CRE UN CANVAS ET ON Y APPLIQUE TOUTES LES FONCTIONNALITES VOULUES
 *
 *  LA PARTICULARITE A RESPECTER SONT LES 2 FUNCTIONS SUIVANTES :
 *
 *  UPDATE() & DRAW()
 *
 *  AINSI QUE LA VARIABLE :
 *  this.active = false
 *
 *  CES 2 FUNCTIONS SONT NECESSAIRE AU BON FONCTIONNEMENT DES CANVAS DANS L'ECOSYSTEM DE LA GRILLE
 *  ET LA VARIABLE this.active SERT A CONNAITRE L'ETAT DE LA CASE (SI ELLE EST ACTIVE OU PAS)
 *
 */

class ChampiSVGPaper {
  constructor(parent) {
    // CONSTRUCTION DU CANVAS ET INJECTION DANS LE CALQUE DE LA CASE CORRESPONDANTE
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);
    // METHODE PARTICULIERE POUR ACCEDER AUX FONCTIONNALITES PAPERJS
    this.paper = new paper.PaperScope();
    // CONSTRUCTION DU CANVAS ET INJECTION DANS LE CALQUE DE LA CASE CORRESPONDANTE
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position: absolute;";
    this.parent.appendChild(canvas);
    this.paper.setup(canvas);
    this.paper.view.autoUpdate = false;

    // ON PEUT ENSUITE INITIALISER TOUTES LES FONCTIONS PAPERJS EN UTILISANT LA VALEUR this.paper. AVANT CHAQUE FONCTION

    // ON CHARGE LE SVG
    this.paper.project.importSVG("./data/svg/chapeau1-26.svg", (svg) => {
      //LE SVG A UN MASK PAR DEFAUT
      this.mask = svg.children[0];
      // LE DESSIN LUI MEME
      this.CHAPEAU = svg.children.chapeau;
      // ON RAJOUTE DES POINTS AUTOUR DU CHAPEAU POUR RENDRE LE POURTOUR INTERACTIF
      this.CHAPEAU.children[0].flatten(0.5);
      // POUR VERIFIER TOUS LES POINTS ACTIF AUTOUR DU CHAPEAU
      // this.CHAPEAU.children[0].fullySelected = true;
    });
    // ON CHARGE LE SVG DU PIED
    this.paper.project.importSVG("./data/svg/pied-27.svg", (svg) => {
      // LE SVG A UN MASK PAR DEFAUT
      this.mask2 = svg.children[0];
      // LE DESSIN LUI MEME
      this.PIED = svg.children.pied;
    });
    // UN OBJET POUR GARDER EN MEMOIRE TOUS LES "SPORES"
    this.allSpores = {};

    // ON CRE UNE SOURIS VIRTUEL POUR L'INTERACTION AU MOUSE MOVE
    this.mouse = { x: 0, y: 0 };
    canvas.addEventListener("mousemove", (e) => {
      this.mouse = { x: e.offsetX, y: e.offsetY };
    });
  }

  update() {
    // VERIFICATION PERMANENTE DES DIMENSION DE LA CASE AU CAS OU IL Y A UN REDIMENSIONNEMENT
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    this.paper.view.viewSize = new this.paper.Size(this.w, this.h);

    // AFFECTION DE LA VARIABLE DE VERIFICATION DE L'ETAT DE LA CASE
    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  draw() {
    /**
     *
     * TOUT CE QUI SE PASSE DANS CE DRAW EST UN EXEMPLE DE CODE SIMPLE POUR ILLUSTRER
     * LE FONCTIONNEMENT DANS CHAQUE CASE.
     *
     */

    // SI ON A UN CHAPEAU A L'ECRAN
    if (this.CHAPEAU) {
      // ON LE CENTRE AVEC SON MASK
      this.mask.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
      this.CHAPEAU.children[0].position = new this.paper.Point(
        this.w / 2,
        this.h / 2
      ); // to center of canvas

      // POUR TOUS LES POINTS QUI FORMENT LE POURTOUR CHAPEAU
      // ON VERIFIE LA DISTANCE AVEC LA SOURIS
      this.CHAPEAU.children[0].segments.forEach((item, index) => {
        //SI ON EST PLUS PETIT QUE 10 ON CRE UN NOUVEAU SPORE
        if (this.distance(item.point, this.mouse) < 10) {
          // SEULEMENT SI LE SPORE N'EXISTE PAS DEJA
          // POUR EVITER DE DEMULTIPLIER INUTILEMENT LA MÊME ZONE
          // DES QUE LE SPORE DISPARAÎT, ON PEUT RE-CREER UN SPORE à PARTIR DU MÊME ENDROIT
          if (
            !this.allSpores.hasOwnProperty(item.point.x + "_" + item.point.y)
          ) {
            //ON CREE LE SPORE
            const spore = new Spore(this.paper, item.point);
            // ON LE RAJOUTE à LA MEMOIRE GENERALE
            this.allSpores[item.point.x + "_" + item.point.y] = spore;
          }
        }
      });
    }
    // ON POSITIONNE LE PIED
    if (this.PIED) {
      this.mask2.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
      this.PIED.position = new this.paper.Point(this.w / 2, this.h / 2 + 160); // to center of canvas
    }

    // POUR LE MOUVEMENT DES SPORES
    const keys = Object.keys(this.allSpores);
    keys.forEach((item, index) => {
      const spore = this.allSpores[item];
      spore.update();
      // SI LE SPORE SORT DE L'ECRAN, ON SUPPRIME SA REFERENCE
      // ET ON L'EFFACE COMPLETEMENT DE PAPER.
      // SI LE SPORE DOIT DONNER VIE A UN NOUVEAU CHAMPI, IL FAUDRA PAS SUPPRIMER L'ELEMENT,
      // MAIS CREER UN NOUVEAU CHAMPI à PARTIR DE SA POSITION AU "SOL"
      if (spore.path.position.y > this.h + 10) {
        spore.path.remove();
        delete this.allSpores[item];
      }
    });
    //!\ NE PAS MODIFIER /!\/
    this.paper.view.draw(); // Render de paper
    //!\ NE PAS MODIFIER /!\/
  }
  /**
   *
   * @param {OBJECT} a point de coordonnée x,y
   * @param {OBJECT} b point de coordonnée x,y
   */
  distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
}
