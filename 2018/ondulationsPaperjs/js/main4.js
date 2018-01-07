'use strict';

// setup paper js
var canvas = document.getElementById('canvas');
paper.setup(canvas);

var a = [];


function svgLoaded(item, svg) {
  // create the balls
  for (var letter of item.children) {
    if (letter.type == 'rectangle') continue;
    var x = letter.position.x;
    var y = letter.position.y;
    console.log(x,y);
  }
  // launch render loop
  paper.view.on('frame', onFrame);
}

function onFrame() {

}

// import svg file
paper.project.importSVG('res/h1.svg');

