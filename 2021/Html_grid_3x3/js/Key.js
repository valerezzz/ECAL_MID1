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

class Key {
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
    this.radius = this.h / 5;
    this.offsetY = 0;
    this.width = 30;
    this.randomKeys = [];
    for (let i = 0; i < 50; i++) {
      this.randomKeys.push(Math.random());
    }

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
    let val = 0;
    if (this.active) {
      // si on est en mode fullscreen on affecte la couleur bleu semi-transparent
      this.ctx.fillStyle = "rgb(0,0,0)";
      this.width = 24;
      this.ctx.lineWidth = this.width;
      this.offsetY = this.h / 5;
      // nombre variable selon la position y de la souris
      // ce nombre est mappé entre 8 et 16.
      val = Math.round(this.map(this.mouseY, 0, this.h, 8, 16));
    } else {
      // si on est en mode case on affecte la couleur noir
      this.ctx.fillStyle = "rgb(0,0,0)";
      this.width = 15;
      this.ctx.lineWidth = this.width;
      this.offsetY = 0;
    }
    this.ctx.clearRect(0, 0, this.w, this.h);

    // simple clef
    // le cercle du haut
    this.ctx.beginPath();
    this.ctx.arc(
      this.w / 2,
      this.h / 2 - this.offsetY,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.stroke();
    this.ctx.closePath();

    // la barre verticale
    this.ctx.fillRect(
      this.w / 2 - this.width / 2,
      this.h / 2 - this.offsetY + this.radius,
      this.width,
      this.h / 2
    );

    /**
     *  UN EXEMPLE POUR JOUER AVEC L'EMBOUT AVEC LA SOURIS
     *  IL MANQUE L'EFFET SURPRISE
     */
    //
    //on fait une boucle sur un nombre varialbe Val de segments (voir plus haut )
    for (let i = 0; i < val; i++) {
      // on défini la position Y d'un segment par rapport au bas de la tige de la clef
      // avec un ecartement de la hauteur d'un segment val
      let posy =
        this.h / 2 - this.offsetY + this.radius + this.h / 2 - (i + 1) * val;
      // on dessine un rectangle noir variable
      this.ctx.fillRect(
        /*position x du rectangle*/
        this.w / 2 + this.width / 2,
        /*position y du rectangle*/
        posy,
        /*largeur aléatoire du rectangle*/
        10 +
          this.randomKeys[i] *
            this.map(this.mouseX - this.w / 2, 0, this.w, 0, 70) *
            this.map(this.mouseX, 0, this.w, 5, 2),
        /*hauteur fix de hauteur val*/
        val
      );
    }
  }

  /* fonction utile juste pour mapper une valeur dans d'autres limitations minimales et maximales */
  map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}
