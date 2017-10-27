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
let x = 0;

function setup() {
  // initialisation de notre programme

  draw();
}

function draw() {
  // pour générer la boucle
  requestAnimationFrame(draw);
}

setup();
