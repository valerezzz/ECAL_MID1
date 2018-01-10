'use strict';

// let canvas = document.getElementsByTagName('canvas')[0];
let canvas = document.getElementById('canvas');
// Donner les dimensions au canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// definition du context
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let stopDraw = false;
let sound = document.getElementById('audio');
let w = new Wave(canvas.width / 2, canvas.height / 2);

let mouseX, mouseY, width, height;
width = window.innerWidth;
height = window.innerHeight;

function initialise() {
  var canvas = document.getElementById('canvas');
  canvas.addEventListener('mousedown', doMouseDown, false);
  canvas.addEventListener('mouseup', doMouseUp, false);
  draw();
}


function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  ctx.fillRect(mouseX - 1, canvas.height / 2 - 85, 3, 200);
  ctx.fillRect(canvas.width - mouseX, canvas.height / 2 - 85, 3, 200);
  requestAnimationFrame(draw);
}


window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}


function drawText() {
  ctx.font = '120px replica';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  for (let letter of letters) {
    letter.draw();
  }
}

function doMouseDown(event) {
  console.log('appuyé')
  // let c = new Circle(canvas.width / 2,canvas.height / 2,100);
  w.actif = true;
}

function doMouseUp(event) {
  w.actif = false;
  console.log('relaché');
}
