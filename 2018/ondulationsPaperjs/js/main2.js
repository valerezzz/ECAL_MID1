'use strict';
document.addEventListener('DOMContentLoaded', function(event) {

});
// setup paper js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
paper.setup(canvas);
var myPath;
var myPathN;
var path;
var amplitude = 10;
var decalage = 400;
var nbr = 4  // nombre de points créer en plus des deux extrémité du segment
var lettreNX = [];  // contient les coordonnées X
var lettreNY = [];
var position;

let allPaths = [];
let _item;

function NEW_svgLoaded(item, svg) {
  _item = item;
  item.scale(2);
  item.strokeWidth = 4;
  item.translate(decalage, 0);

  // boucle pour récupérer toutes les lignes
  for (let i = 0; i < item.children.length; i++) {
    if (item.children[i].segments != undefined) {
      // check pour récupérer les lignes courbes
      // (toutes les lignes ayant + que 2 points sont des courbes chez toi)
      if (item.children[i].segments.length != 2) {
        // subdivision des lignes courbes
        item.children[i].flatten(0.5);
      } else {
        // subdivision des lignes droites
        // il faut créer un fonction custom pour ça
        // paper n'a pas de fonction de subdivision automatique
        // ici on la subdivise en 10
        subdivide(item.children[i], 10);
      }
      // on affiche (ou non) les points de construction
      item.children[i].selected = true;
    }
  }

  // deuxième boucle de setup
  // on va enregistré pour chaque segment 2 nouveaux points:
  // - le position original de chaque Point
  // - le vecteur normal (perpendiculaire)

  for (let i = 0; i < item.children.length; i++) {
    if (item.children[i].segments != undefined) {
      for (let j = 0; j < item.children[i].segments.length; j++) {
        item.children[i].segments[j].originPoint =
            item.children[i].segments[j].point.clone();

        let offset =
            j / item.children[i].segments.length * item.children[i].length;
        let normal = item.children[i].getNormalAt(offset);
        item.children[i].segments[j].normalPoint = normal;
      }
    }
  }
  // on initialise le mouvement
  paper.view.on('frame', onFrame);
  // on initialise l'interaction souris
  paper.view.onMouseDown = onMouseDown;
}

function subdivide(path, num) {
  for (var i = 0; i < num; i++) {
    var offsetPt = path.getPointAt(path.length / num * i);
    var location = path.getNearestLocation(offsetPt);
    var splitedP = path.splitAt(location);
    path.join(splitedP);
  }
}



// fonction appellée après l'import de svg
// function svgLoaded(item, svg) {
//   item.scale(2);
//   item.strokeWidth = 4;
//   item.translate(decalage, 0);
//
//   // paper.view.on('frame', onFrame);
//
//   // partie vertivale du n
//   // for (var i=13; i<25; i++){
//   // var posX = item.children[i].segments[0].point.x;
//   // var posX2 = item.children[i].segments[1].point.x;
//   // var posY = item.children[i].segments[0].point.y;
//   // var posY2 = item.children[i].segments[1].point.y;
//   // lettreNX.push(posX,posX2);
//   // lettreNY.push(posY,posY2);
//   //}
//   // console.log(lettreNY);
//
//   //  path = new paper.Path.Circle({
//   //  center: [item.children[13].segments[0].point.x,
//   //  item.children[13].segments[0].point.y], radius: 5, fillColor: 'blue'
//   //  });
//
//   // création d'un path qui contient les points
//   myPath = new paper.Path();
//   myPath.strokeColor = 'red';
//   var pointDebutX = item.children[13].segments[0].point.x;
//   var pointDebutY = item.children[13].segments[0].point.y;
//   var pointFinX = item.children[13].segments[1].point.x;
//   var pointFinY = item.children[13].segments[1].point.y;
//   myPath.add(new paper.Point(pointDebutX, pointDebutY));
//   myPath.add(new paper.Point(pointFinX, pointFinY));
//   console.log(pointDebutX);
//   var longeur = pointFinY - pointDebutY;
//   position = pointDebutX;
//
//   for (var i = 1; i < nbr; i++) {
//     myPath.insert(
//         i, new paper.Point(pointDebutX, pointDebutY + (longeur / nbr) * i));
//   }
//
//   myPath.fullySelected = true;
//   myPath.strokeWidth = 5;
//
//   // myPath.smooth();
// }

function onFrame(event) {
  // annimation des points par lignes

  // boucle générale dans toutes les lignes (comme au début)
  // la référence _item nous permet d'accéder au SVG
  for (let i = 0; i < _item.children.length; i++) {
    if (_item.children[i].segments != undefined) {
      // on boucle dans tous les segments
      for (let j = 0; j < _item.children[i].segments.length; j++) {
        // on récupère le vecteur normal (perpendiculaire)
        // et on en fait une copie
        let normal = _item.children[i].segments[j].normalPoint.clone();
        // on modifie la valeur de ce vecteur
        normal.x *= Math.cos((event.time + j)) * 10;
        normal.y *= Math.sin((event.time + j)) * 10;

        // on altère la position x et y de chaque point par le vecteur
        // perpendiculaire
        // ce qui cré le mouvement
        _item.children[i].segments[j].point.x =
            _item.children[i].segments[j].originPoint.x + normal.x;
        _item.children[i].segments[j].point.y =
            _item.children[i].segments[j].originPoint.y + normal.y;
      }
    }
  }
}

function onMouseDown(event) {
  console.log('ok');  // ne marche pas ??
}
// importation des svg
paper.project.importSVG('res/online2.svg', NEW_svgLoaded);

// ITEM CORRESSPOND AUX DIFFéRENTES CALQUES ILLUSTRATOR. LE PREMIER EST CELUI EN
// BAS (A L'ARRIRE PLAN) SUR ILLUSTRATOR. VA DE 1 A NBR DE CALQUES  CHAQUE ITEM
// A UN SEGMENT QUI COMMPRENDS LES POINTS ILLUSTRATOR. VA DE 0 à NBR POINTS -1
// CAHQUE POINTS ON DES COORDONNéES X ET Y.
