/**
 *  EXEMPLE DE CANVAS PUR JS (VANILLA)
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

class Feather {
  constructor(parent) {
    // CONSTRUCTION DU CANVAS ET INJECTION DANS LE CALQUE DE LA CASE CORRESPONDANTE
    this.parent = parent;
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.width = this.w = parseInt(parent.style.width);
    this.canvas.height = this.h = parseInt(parent.style.height);
    this.ctx = this.canvas.getContext("2d");

    parent.appendChild(this.canvas);

    // INITIALISATION DES VARIABLES UTILES
    document.addEventListener("mousemove", (e) => {
      this.mouseY = e.y;
      this.mouseX = e.x;
    });
  }

  update() {
    // VERIFICATION PERMANENTE DES DIMENSION DE LA CASE AU CAS OU IL Y A UN REDIMENSIONNEMENT
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    this.canvas.width = this.w;
    this.canvas.height = this.h;
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
    this.ctx.fillStyle = 0;
    this.ctx.fillRect(0, 0, this.w, this.h);

    if (this.active) {
      // si on est en mode fullscreen on affecte la couleur bleu semi-transparent
      this.ctx.fillStyle = "rgba(255,255,255,0.5)";
      // this.ctx.lineWidth = 5;
    } else {
      // si on est en mode case on affecte la couleur noir
      this.ctx.fillStyle = "rgba(255,255,255,0.5)";
    }
    //on récupère les dimensions de la case
    const w = this.parent.getBoundingClientRect().width;
    const h = this.parent.getBoundingClientRect().height;
    //on récupère le point d'origine de la case
    this.originx = this.parent.getBoundingClientRect().top;
    this.originy = this.parent.getBoundingClientRect().left;
    // on détermine un longueur de tige proportionnelle à la case
    const tige = h / 2;

    // on dessine la tige depuis le bas de la case
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(w / 2, h);
    this.ctx.lineTo(w / 2, h - tige);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.lineWidth = 1;

    /**
     *  On va dessiner une "plume" qui va être "programmée"
     *  - On a besoin d'un angle pour définira la courbe de la plume
     *  (la forme d'une plume est un peu comme une onde sur un axe de symétrie)
     *  - on a besoin d'un nombre de ramifications
     *  - on a besoin d'une valeur d'incrémentation pour l'angle
     *  (ce qui va définir la forme de la plume)
     *  - on a besoin de stocker les extrémités des ramifications pour connaître le contour
     *  de la plume
     */
    let angle = 0;
    // l'endroit ou les ramifications commencent
    let start = tige / 3;
    // le nombre de ramifications
    let nbrLignes = 20;
    // l'espace entre 2 ramifications
    let space = (tige - start) / nbrLignes;
    // valeur d'incrémentation de l'angle pour la forme de la plume
    // le max sera  360/50 et le minimum sera 1
    // en proportion de la position de la souris
    let fact = Math.max(50, this.map(this.mouseY - this.originy, 0, h, 0, 360));
    // tableaux pour stocker les extrémités de la plume (gauche et droite)
    let allPoints = { right: [], left: [] };

    //ON DESSINE LA PLUME
    for (let i = 0; i < nbrLignes + 10; i++) {
      // on dessine les ramifications de droites
      const pRight = this.buildLines(1, start, space, angle, w, h, i);
      // on dessine les ramifications de gauches
      const pLeft = this.buildLines(-1, start, space, angle, w, h, i);
      // on stock les points du contours
      allPoints.left.push(pLeft);
      allPoints.right.push(pRight);
      angle += (Math.PI * 2) / fact;
    }

    // (option)
    // creation d'un dégradé pour la couleur du pourtour
    // const my_gradient = this.ctx.createLinearGradient(0, 0, 0, h / 2);
    // my_gradient.addColorStop(0, "#ffffffff");
    // my_gradient.addColorStop(0.5, "#ffffffff");
    // my_gradient.addColorStop(1, "#0000ff33");
    // this.ctx.fillStyle = my_gradient;

    // on dessine le contour de la plume
    this.ctx.beginPath();
    for (const p of allPoints.left) {
      this.ctx.lineTo(p.x, p.y);
    }
    for (const p of allPoints.right.reverse()) {
      this.ctx.lineTo(p.x, p.y);
    }
    this.ctx.fill();
    this.ctx.closePath();
  }

  /**
   *
   * @param {number} orientation valeur soit -1 ou 1 pour définir quel côté on dessine
   * @param {number} start le point de départ des ramification
   * @param {number} space l'espacement entre les ramification
   * @param {number} angle la valeur de l'angle
   * @param {number} w la largeur d'une case
   * @param {number} h la hauteur d'une case
   * @param {number} i un facteur incrémental définissant la ramification
   */
  buildLines(orientation, start, space, angle, w, h, i) {
    // définition de la ligne à dessiner avant translation et rotation
    const point = { x: 0, y: Math.sin(angle) * (start * 3 - i * space) };
    const point2 = { x: 0, y: Math.sin(angle) * (start * 3 - i * space) - 3 };
    // blocage et repositionnement de l'interface de dessin
    this.ctx.save();
    this.ctx.beginPath();
    // déplacement du point suivant l'origin et le facteur incrémental
    this.ctx.translate(w / 2, h - start - i * space);
    // rotation de la ligne suivant la position x de la souris
    this.ctx.rotate(
      (Math.PI + Math.PI / this.map(this.mouseX - this.originx, 0, w, 1, 10)) *
        orientation
    );
    // dessin de la ligne
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.closePath();
    // on récupère les coordonée réelle dans l'écran
    // (pour dessiner le contour)
    const matrix = this.ctx.getTransform();
    const transformedPoint = {
      x: matrix.a * point2.x + matrix.c * point2.y + matrix.e,
      y: matrix.b * point2.x + matrix.d * point2.y + matrix.f,
    };
    this.ctx.restore();

    //option
    // on ajoute une forme au bout des ramifications
    // this.ctx.beginPath();
    // this.ctx.arc(
    //   transformedPoint.x,
    //   transformedPoint.y,
    //   2,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // this.ctx.fill();
    // this.ctx.closePath();

    // on retourne le point en coordonnée réelle de l'écran
    return transformedPoint;
  }

  map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}
