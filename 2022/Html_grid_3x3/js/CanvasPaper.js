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

class CanvasPaper {
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
    this.LETTER = new this.paper.Path();
    this.addSegments(this.LETTER, "./data/svg/letter_1.svg"); // Load external svg path

    setTimeout(() => {
      console.log(this.LETTER.segments.length);
    }, 1);

    // AFFECTATION DE DIVERSES VARIABLES POUR L'EXEMPLE D'ANIMATION DE PATH
    this.LETTER.strokeColor = "black";
    this.LETTER.strokeWidth = 50;
    this.LETTER.strokeJoin = "miter";
    this.LETTER.applyMatrix = false;
    this.debugMode = true;
    this.dash = { start: 0, end: 0.5, offset: 0 };
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

    let scale = 8 * 0.0001;
    let speed = 4 * 0.001;

    const totalLength = this.LETTER.length;
    const shownLength = totalLength * (this.dash.end - this.dash.start);

    // Montrer les ancres et les points
    this.LETTER.fullySelected = this.debugMode;

    // definir les réglages des dash
    this.LETTER.dashArray = [shownLength, totalLength - shownLength];

    // Animation le long de la ligne
    this.dash.offset = (this.dash.offset + speed) % 1; // increment offset
    this.LETTER.dashOffset =
      -totalLength * (this.dash.start + this.dash.offset); // apply offset

    // Garder les éléments au centre de l'ecran
    this.LETTER.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
    this.LETTER.scaling = new this.paper.Size(this.w * scale, this.w * scale);

    //!\ NE PAS MODIFIER /!\/
    this.paper.view.draw(); // Render de paper
    //!\ NE PAS MODIFIER /!\/
  }
  addSegments(path, svgFile) {
    path.importSVG(svgFile, function (svg) {
      path.segments = svg.lastChild.segments;
      // divisier la ligne par un facteur pour obtenir des points
      // essayer de changer ce chiffre ex: 0.5
      path.flatten(0.05);
    });
  }
}
