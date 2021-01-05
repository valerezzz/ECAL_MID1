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

class Signature {
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

    //
    // ON CHARGE LE SVG
    this.paper.project.importSVG("./data/svg/signature.svg", (svg) => {
      //LE SVG A UN MASK PAR DEFAUT
      this.mask = svg.children[0];
      console.log(this.mask);
      // LE DESSIN LUI MEME
      this.SIGNATURE = svg.children.signature;
      // ON RAJOUTE DES POINTS AUTOUR DU CHAPEAU POUR RENDRE LE POURTOUR INTERACTIF
      this.SIGNATURE.children[0].flatten(0.001);
      // POUR VERIFIER TOUS LES POINTS ACTIF AUTOUR DU CHAPEAU
      // this.SIGNATURE.children[0].fullySelected = true;
    });
    console.log(this.paper);
    this.paper.view.onMouseMove = (event) => {
      if (
        this.SIGNATURE.children[0].firstSegment.point.getDistance(event.point) <
        5
      ) {
        this.follow = true;
      }
      // console.log("mouse move", this.SIGNATURE.children[0]);
      if (this.follow) {
        this.SIGNATURE.children[0].firstSegment.point = event.point;
        for (
          let i = 0;
          i < this.SIGNATURE.children[0].segments.length - 1;
          i++
        ) {
          let segment = this.SIGNATURE.children[0].segments[i];
          let nextSegment = segment.next;
          let vector = new this.paper.Point(
            segment.point.x - nextSegment.point.x,
            segment.point.y - nextSegment.point.y
          );
          // let vector = segment.point - nextSegment.point;
          // console.log(segment, nextSegment, vector);
          vector.length = 1; //length;
          nextSegment.point.x = segment.point.x - vector.x;
          nextSegment.point.y = segment.point.y - vector.y;
        }
        this.SIGNATURE.children[0].smooth({ type: "continuous" });
      }
    };
  }

  update() {
    // VERIFICATION PERMANENTE DES DIMENSION DE LA CASE AU CAS OU IL Y A UN REDIMENSIONNEMENT
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    this.paper.view.viewSize = new this.paper.Size(this.w, this.h);
    if (this.mask) this.mask.size = new this.paper.Size(this.w, this.h);
    if (!this.active) {
      if (this.SIGNATURE) {
        this.mask.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas

        this.SIGNATURE.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
      }
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

    // if (this.SIGNATURE) {
    //   this.mask.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
    //   this.SIGNATURE.position = new this.paper.Point(this.w / 2, this.h / 2); // to center of canvas
    // }

    //!\ NE PAS MODIFIER /!\/
    this.paper.view.draw(); // Render de paper
    //!\ NE PAS MODIFIER /!\/
  }
  // addSegments(path, svgFile) {
  //   path.importSVG(svgFile, function (svg) {
  //     path.segments = svg.lastChild.segments;
  //     // divisier la ligne par un facteur pour obtenir des points
  //     // essayer de changer ce chiffre ex: 0.5
  //     path.flatten(0.05);
  //   });
  // }
}
