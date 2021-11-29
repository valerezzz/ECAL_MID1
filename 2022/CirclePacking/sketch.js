/**
 *
 * ALGORITHME DE CIRCLE PACKING INSPIRE PAR
 * https://github.com/jcmiller11/circlepacking
 *
 * converti en version interactive simplifiée pour p5js
 *
 * La modification du nombre de cercle se déroule en live avec le mouvement de la souris en X
 *
 */

// CHIFFRE A UTILISER SI ON VEUT UN RAYON DE CERCLE INTERIEUR FIX
let INNER_CIRCLE_FIX_RADIUS = 150;
// CHIFFRE A UTILISER SI ON VEUT UUN RAYON  DE CERCLE EXTERIEUR FIX
// IL FAUT RAJOUTER LE BOOLEAN true DANS LE CONSTRUCTOR
let OUTER_CIRCLE_FIX_RADIUS = 300;
// NOMBRE DE CERCLES QUE L'ON VEUT
let CIRCLE_NUMBER = 12;
let packer;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // POUR REMPLIR L'ECRAN UN MAX
  // DECOMMENTER ICI
  // let OUTER_CIRCLE_FIX_RADIUS =
  //   window.innerWidth > window.innerHeight
  //     ? window.innerHeight / 2
  //     : window.innerWidth / 2;
  packer = new Packer(OUTER_CIRCLE_FIX_RADIUS, CIRCLE_NUMBER, true);
  noLoop();
}

function draw() {
  packer.calculateAllCircles();
}

function mouseMoved() {
  packer.updateCirclesNumber();
}
