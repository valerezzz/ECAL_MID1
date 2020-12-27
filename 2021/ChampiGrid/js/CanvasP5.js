/**
 *  EXEMPLE DE CANVAS P5
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
class CanvasP5 {
  constructor(parent) {
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);
    // METHODE PARTICULIERE POUR ACCEDER AUX FONCTIONNALITES P5
    const P5 = (this.P5 = new p5((sketch) => sketch));
    // CONSTRUCTION DU CANVAS ET INJECTION DANS LE CALQUE DE LA CASE CORRESPONDANTE
    this.p5Canvas = P5.createCanvas(this.w, this.h);
    this.p5Canvas.canvas.style.position = "absolute";
    this.p5Canvas.parent(parent);

    // ON PEUT ENSUITE INITIALISER TOUTES LES FONCTIONS P5 EN UTILISANT LA VALEUR P5. AVANT CHAQUE FONCTION
    P5.fill(255, 0, 0, 126);
    this.gravity = 9.0;
    this.mass = 2.0;
    // EXEMPLE AVEC 2 FILS ELASTIQUES RELIES ENSEMBLES ET AVEC UN PEU DE PHYSIQUE
    this.s1 = new Spring2D(P5, 0.0, P5.width / 2, this.mass, this.gravity);
    this.s2 = new Spring2D(P5, 0.0, P5.width / 2, this.mass, this.gravity);
  }

  update() {
    // VEILLER A BIEN RECUPERER L'OBJECT P5 A L'INTERIEUR DE LA FUNCTION (SINON UTILISER LA VARIABLE GLOBAL this.P5)
    const P5 = this.P5;

    // VERIFICATION PERMANENTE DES DIMENSION DE LA CASE AU CAS OU IL Y A UN REDIMENSIONNEMENT
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    // p5 resize canvas
    P5.resizeCanvas(this.w, this.h);

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
    const P5 = this.P5;

    if (this.active) {
      // si on est en mode fullscreen on affecte la couleur de fond en noir (grace à la fonctionnalite p5)
      P5.background(0);
    }

    // exemple de 2 cercles accrochés avec des elastiques
    this.s1.update(P5.mouseX, P5.mouseY);
    this.s1.display(P5.mouseX, P5.mouseY);

    this.s2.update(this.s1.x, this.s1.y);
    this.s2.display(this.s1.x, this.s1.y);
  }
}

/**
 *
 *  DEFINITION D'UNE CLASSE DE GESTION DE LIGNE ELASTIQUE
 */
class Spring2D {
  constructor(P5Instance, xpos, ypos, m, g) {
    const P5 = (this.P5 = P5Instance);

    this.x = xpos; // The x- and y-coordinates
    this.y = ypos;
    this.vx = 0; // The x- and y-axis velocities
    this.vy = 0;
    this.mass = m;
    this.gravity = g;
    this.radius = 30;
    this.stiffness = 0.2;
    this.damping = 0.7;
  }

  update(targetX, targetY) {
    // ALGORITHME DE GESTION DE LA PHYSIQUE D'UN ELASTIQUE
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  display(nx, ny) {
    // FUNCTION D'AFFICHE AVEC LES METHODES P5
    const P5 = this.P5;
    P5.noStroke();
    P5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    P5.stroke(255);
    P5.line(this.x, this.y, nx, ny);
  }
}
