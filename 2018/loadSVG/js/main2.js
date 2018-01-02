'use strict';
//document.addEventListener("DOMContentLoaded", function(event) {});
// setup paper js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;

paper.setup(canvas);
// array des calques
var pointsX = [];
var pointsY = [];

// fonction appellée après l'import de svg
function svgLoaded(item, svg) {
  item.scale(0.1, item.bounds.topLeft);
  item.translate(w/2, h/2);
  item.style = {
	fillColor: 'red',
	strokeColor: 'black'
};
var copy = item.clone();
  copy.rotate(180);
}

function onFrame() {
}
// importation des svg
paper.project.importSVG('res/triangle1.svg', svgLoaded);
