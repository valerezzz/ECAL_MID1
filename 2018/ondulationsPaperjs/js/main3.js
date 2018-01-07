'use strict';

// setup paper js
var canvas = document.getElementById('canvas');
paper.setup(canvas);

document.addEventListener('mousemove', onMouseClick, false);
var move = 0;
var words = [];

// fonction appellée après l'import de svg
function svgLoaded(item, svg) {
  
  var word = item.children; //contient les deux fichiers svg    
  // console.log(item.children);
  
  words.push(word);
  console.log(words.length);
  if (words.length == 2) {
    item.remove();
    paper.view.on('frame', onFrame);
  }
}

function onFrame() {
  var numLetters = Math.min(words[0].length, words[1].length); //nombres de lettres
  // arcourir les lettres
  for (var i = 0; i < numLetters; i++) {
    var letter1 = words[0][i];
    var letter2 = words[1][i];
    if (!letter1.segments || !letter2.segments) {
      continue;
    }   
    //console.log(letter1.segments, letter2.segments);
    var numSegments = Math.min(letter1.segments.length, letter2.segments.length);
    // loupe sur les segments pour chaque lettre
    for (var j = 0; j < numSegments; j++) {
      var pt1 = letter1.segments[j].point;
      var pt2 = letter2.segments[j].point;
      pt1.x += (pt2.x - pt1.x) * 0.01;
      pt1.y += (pt2.y - pt1.y) * 0.01;
    
    }
  }
    document.body.onmousedown = function() {
        console.log("ok");
    }

}
function onMouseClick(e) { 
    move ++;
}

// importer les fichiers svg
paper.project.importSVG('res/a1.svg', svgLoaded);
paper.project.importSVG('res/a2.svg', svgLoaded);
