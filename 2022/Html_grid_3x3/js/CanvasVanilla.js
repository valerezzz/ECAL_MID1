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

class CanvasVanilla {
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
    this.angle = 0;
    this.active = false;
    // Ajout de l'audio
    // pour que l'audio fonctionne il faut clicker une fois sur la page.
    // sans interaction l'audio est bloqué
    this.sound = new Audio();
    this.sound.src = "/data/sound/pop.mp3";
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
    if (this.active) {
      // si on est en mode fullscreen on affecte la couleur bleu semi-transparent
      this.ctx.fillStyle = "rgba(0,0,255,0.5)";
    } else {
      // si on est en mode case on affecte la couleur noir
      this.ctx.fillStyle = "rgb(0,0,0)";
    }
    // example
    // cercle qui s'aggrandi et qui rétrécie
    let r = 0;
    if (this.h < this.w) {
      r = this.h / 2;
    } else {
      r = this.w / 2;
    }
    const radius = Math.abs(Math.sin((this.angle * Math.PI) / 180)) * r;
    // on joue l'audio quand le rayon du cercle est plus petit que 2
    if (radius < 2 && this.active) {
      this.sound.play();
    }
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.beginPath();
    this.ctx.arc(this.w / 2, this.h / 2, radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
    this.angle++;
  }
}
