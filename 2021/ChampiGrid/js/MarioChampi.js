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

class MarioChampi {
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

    // STOCKAGE DE TOUS LES CHAMPIGNON
    this.ALL_CHAMPS = [];
    // STOCKAGE DE TOUS LES "spore" pour la duplication
    this.ALL_DUP = [];

    // on cré un premier champignon à une position aléatoire (1/5 de la largeur)
    this.ALL_CHAMPS.push(new GrowingChampi(this.paper, this.w / 5, this.h));

    // ON CRE UNE SOURIS VIRTUEL POUR L'INTERACTION AU MOUSE MOVE
    this.mouse = { x: 0, y: 0 };
    canvas.addEventListener("mousemove", (e) => {
      this.mouse = { x: e.offsetX, y: e.offsetY };
    });

    canvas.addEventListener("click", (e) => {
      this.ALL_CHAMPS.forEach((item) => {
        // on calcule sur quel rond on click
        if (
          this.distance(item.interaction.position, this.mouse) <
          item.interaction.bounds.width / 2
        ) {
          // on ajoute un spore "duplicateur" dans le tableau
          this.ALL_DUP.push(item.launchDuplicationSpore());
        }
      });
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
      // on met à zéro les état des champignons si la cellule est fermée
      // l'animation continue à tourner, mais est bloqué à 0
      this.ALL_CHAMPS.forEach((item) => {
        item.s = 0;
        item.canGrow = true;
        item.update();
      });
    }

    if (this.active) {
      // si on est fullscreen, on active l'animation
      this.ALL_CHAMPS.forEach((item) => {
        item.x = item.origin.x;
        item.y = this.h;
        item.update();
      });
      // on met à jour tous les spores
      // leur position est updatée
      this.ALL_DUP.forEach((item) => {
        item.update();
        if (item.element.position.y >= this.h) {
          // si la position du pore touche le sol, on arrête de les mettre à jour
          // on les cache
          item.stop = true;
          item.element.fillColor = "transparent";
          item.element.strokeColor = "transparent";
          //ajouter un nouveau champi à cette position !
          if (!item.hasBeenAdded) {
            item.hasBeenAdded = true;
            this.ALL_CHAMPS.push(
              new GrowingChampi(this.paper, item.element.position.x, this.h)
            );
          }
        }
      });
    }
  }

  draw() {
    /**
     *
     * TOUT CE QUI SE PASSE DANS CE DRAW EST UN EXEMPLE DE CODE SIMPLE POUR ILLUSTRER
     * LE FONCTIONNEMENT DANS CHAQUE CASE.
     *
     */

    if (this.active) {
      this.ALL_CHAMPS.forEach((item) => {
        //   detect interaction
        if (
          item.interaction &&
          this.distance(item.interaction.position, this.mouse) <
            item.interaction.bounds.width / 2
        ) {
          item.interaction.fillColor = "red";
        } else if (item.interaction) {
          item.interaction.fillColor = "white";
        }
      });
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
