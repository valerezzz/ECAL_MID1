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
let chapeau2;
let pied2;
let svg;
/**/

class ChampiSVG {
  constructor(parent) {
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);
    // METHODE PARTICULIERE POUR ACCEDER AUX FONCTIONNALITES P5
    const P5 = (this.P5 = new p5((sketch) => sketch));
    // CONSTRUCTION DU CANVAS ET INJECTION DANS LE CALQUE DE LA CASE CORRESPONDANTE
    this.p5Canvas = P5.createCanvas(600, 200);
    this.p5Canvas.canvas.style.position = "absolute";
    this.p5Canvas.parent(parent);

    // ON PEUT ENSUITE INITIALISER TOUTES LES FONCTIONS P5 EN UTILISANT LA VALEUR P5. AVANT CHAQUE FONCTION
    chapeau2 = P5.loadImage("./data/svg/chapeau1-26.svg");
    pied2 = P5.loadImage("./data/svg/pied-27.svg");

    this.cercles = [];
    this.chpPosX;
    this.chpPosY;
    this.chpWidth = 1;
    this.chpHeight = 1;
    for (let i = 0; i < 10; i++) {
      let cercle = {
        x: (this.chpPosX = P5.random(
          P5.windowWidth / 2 - 100,
          P5.windowWidth / 2 + 100
        )),
        y: (this.chpPosY = P5.random(
          P5.windowHeight / 2 - 30,
          P5.windowHeight / 2 + 30
        )),
        width: (this.chpWidth = P5.random(100, 200)),
        height: (this.chpHeight = P5.random(100, 200)),
      };
      this.cercles.push(cercle);

      /* if(this.chpWidth <P5.random(100, 200)){
        this.chpWidth += 1
      }*/
      /* if(this.chpHeight <P5.random(100, 200)){
        this.chpWidth += 1
      }*/
    }

    console.log(this.chpWidth);

    /*for(let j = 0; j<100;j++){

  }*/
  }

  update() {
    // VEILLER A BIEN RECUPERER L'OBJECT P5 A L'INTERIEUR DE LA FUNCTION (SINON UTILISER LA VARIABLE GLOBAL this.P5)
    const P5 = this.P5;

    // VERIFICATION PERMANENTE DES DIMENSION DE LA CASE AU CAS OU IL Y A UN REDIMENSIONNEMENT
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    // p5 resize canvas
    P5.resizeCanvas(this.w, this.h);
  }

  draw() {
    /**
     *
     * TOUT CE QUI SE PASSE DANS CE DRAW EST UN EXEMPLE DE CODE SIMPLE POUR ILLUSTRER
     * LE FONCTIONNEMENT DANS CHAQUE CASE.
     *
     */
    const P5 = this.P5;

    P5.background(0);
    P5.stroke(255);

    /*  P5.line(
      P5.windowWidth / 2,
      P5.windowHeight / 2,
      P5.windowWidth / 2,
      P5.windowHeight
    ); */

    this.cercles.forEach((cercle, index) => {
      P5.noFill();
      P5.stroke(255);
      P5.imageMode(P5.CENTER);
      P5.image(chapeau, cercle.x, cercle.y, cercle.width, cercle.height);
      P5.image(pied, P5.windowWidth / 2, P5.windowHeight / 2 + 270, 100, 400);

      /*this.cercles.forEach((cercle, index) => {
      P5.noFill();
      P5.stroke(255);
      P5.ellipse(cercle.x, cercle.y, cercle.radius);*/
    });
    // for (let i = 0; i < 30; i++) {
    //   console.log(i);

    //   P5.noFill()
    //   P5.stroke(255)
    //   P5.ellipse(P5.random(P5.windowWidth/2-100,P5.windowWidth/2+100),P5.random(P5.windowHeight/2-30,P5.windowHeight/2+30),P5.random(25,50));

    // }
  }
}
