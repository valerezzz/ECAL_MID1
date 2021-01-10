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

class FeatherSVGPaper {
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
    this.paper.project.importSVG("./data/svg/plume.svg", (svg) => {
      // LE DESSIN LUI MEME
      this.PLUME = svg;

      this.angle = 0;
      this.plume_position = new this.paper.Point(this.w / 3, this.h / 3);
    });

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

    if (this.plume_position && this.active) {
      this.angle++;
      //   mouvement circulaire autour du centre de l'écran
      //   on décale la position de la plume de la moitié de sa largeur
      //   et de la moitié de sa hauteur pour que la pointe de la plume soit l'origine
      this.plume_position.x =
        this.w / 2 +
        this.PLUME.bounds.width / 2 +
        Math.cos((this.angle * Math.PI) / 180) * 200;
      this.plume_position.y =
        this.h / 2 -
        this.PLUME.bounds.height / 2 +
        Math.sin((this.angle * Math.PI) / 180) * 200;
    }

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
    if (this.PLUME) {
      // ON LE CENTRE AVEC SON MASK
      //   this.mask.position = new this.paper.Point(this.w / 3, this.h / 3); // to center of canvas
      this.PLUME.position = this.plume_position;
    }

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
