'use strict';

// let canvas = document.getElementsByTagName('canvas')[0];
let canvas = document.getElementById('canvas');
// Donner les dimensions au canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// definition du context
let ctx = canvas.getContext('2d');
let backgroundColor;
let w = window.innerWidth;
let h = window.innerHeight;


function setup() {
  // initialisation de notre programme
  document.addEventListener('click', onMouseClick, false);

  draw();
}

function onMouseClick(e) {
  // Determiner la grille voulue, ici 2x2
  let cols = 2;
  let rows = 2;
  // Récupérer l'id de la "case" dans laquelle on a cliqué.
  let index = Math.floor(e.x / (window.innerWidth / cols)) +
      Math.floor(e.y / (window.innerHeight / rows)) * rows;
  console.log(index);
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // pour générer la boucle
  requestAnimationFrame(draw);
}

setup();
