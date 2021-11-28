let fordCircles = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  generateFordCircles(4);
}

function draw() {
  background(0);
  translate(width / 2, (height * 3) / 4);
  fordCircles.forEach((ford, index) => {
    if (index < fordCircles.length - 2) {
      //zoom (au cas où)
      ford.updateZoomLevel();
      //afficher les cercles
      ford.draw();
    }
  });
}

function mouseMoved() {
  //generation dynamique des cercles...
  fordCircles = [];
  let val = floor(map(mouseX, 0, width, 2, 32));
  /**
   * ATTENTION, cette technique va effacer tous les cercles en mémoires
   * Et en créer des nouveaux
   * ça pourrait être un problème pour la gestion du son
   * (si un son est jouer depui un cercle, et qu'il est supprimé de la mémoire, le son aussi...)
   */
  generateFordCircles(val);
}

/**
 *
 * fonction pour générer X cercles selon l'equation x = x/y
 */

function generateFordCircles(n) {
  let x1 = 0;
  let y1 = 1;
  let x2 = 1;
  let y2 = n;

  let x;
  let y = 0;
  while (y != 1) {
    x = Math.floor((y1 + n) / y2) * x2 - x1;
    y = Math.floor((y1 + n) / y2) * y2 - y1;

    fordCircles.push(new FordCircle(x / y, y, 1 / Math.pow(y, 2) / 2));

    x1 = x2;
    x2 = x;
    y1 = y2;
    y2 = y;
  }
}
