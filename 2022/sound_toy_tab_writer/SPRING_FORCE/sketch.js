/**
 * TRANSFORMATION du code initial en 2 classes:
 * 1) la classe lettre qui devra contenir l'encodage de chaque lettre
 * 2) la classe ForcePoint qui effectue le calcul des spring force
 *
 * TOUS LES POINTS SONT "DRAGGABLE".
 * LA LETTRE S'ACTIVE AU CLAVIER EN CLICKANT SUR LA LETTRE CONCERNEE.
 *
 * TOUS LES POINTS ONT UNE TENDANCE A ATTEINDRE LEUR RESTE POSITION,
 * CAR IL N'Y A PAS DE CONDITION DE FORCE ENTRE DES POINTS DE RESISTANCE
 * A VOIR SI C'EST UN PROBLEME POUR TON PROJET....
 */

let visibleLetters = [];
let Xposition = 200;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}
function draw() {
  background(0);
  strokeWeight(1);
  stroke(255);

  visibleLetters.forEach((letter) => {
    letter.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  switch (key) {
    case "a":
      visibleLetters.push(new Letter(Xposition, 50, "A"));
      Xposition += 200;
      break;
    case "Backspace":
      visibleLetters.pop();
      Xposition -= 200;
      break;
  }
}
