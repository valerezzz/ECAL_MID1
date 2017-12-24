// NOUVELLE VARIABLE pour stokcer tous les cercles
var allPath = [];


// Please note: dragging and dropping images only works for
// certain browsers when serving this script online:
var path, position, max;
var count = 0;
var grow = false;

// As the web is asynchronous, we need to wait for the raster to
// load before we can perform any operation on its pixels.
var raster = new Raster('mona');
raster.visible = false;
raster.on('load', resetSpiral);

var text = new PointText({
  justification: 'right',
  fontSize: 12,
  content: window.FileReader ?
      'drag & drop an image from your desktop to rasterize it' :
      'to drag & drop images, please use Webkit, Firefox, Chrome or IE 10'
});

function onFrame(event) {
  if (grow) {
    if (raster.loaded && (view.center - position).length < max) {
      for (var i = 0, l = count / 36 + 1; i < l; i++) {
        // growSpiral();
        growCircle();
      }
      // path.smooth();
    } else {
      grow = false;
    }
  }
}

// function growSpiral() {
//   count++;
//   var vector = new Point({angle: count * 5, length: count / 100});
//   var rot = vector.rotate(90);
//   var color = raster.getAverageColor(position + vector / 2);
//   var value = color ? (1 - color.gray) * 1 : 0;
//   rot.length = Math.max(value, 0.2);
//   path.add(position + vector - rot);
//   path.insert(0, position + vector + rot);
//   position += vector;
// }

// fonction pour générer les cercles concentriques
function growCircle() {
  // on doit créer un nouveau path par cercle
  allPath[count] = new Path({fillColor: 'black', closed: false});
  // on incrémente le compteur
  count++;

  // on détermine la longueur des segment pour générer les cercles
  var seg = 10;  // count;

  // on fait varier un angle d'incrémentation pour augmenter la taille des
  // cercles pour le compteur devient grand, plus l'angle sera petit et fera des
  // grands cercles avec une taille de segment fixe
  var angle = 10 / (count / 6);

  // on calcul la valeur du rayon pour chaque cercle
  // ref :
  // https://math.stackexchange.com/questions/1274036/how-to-the-find-the-radius-of-a-sector
  var radius = seg / (Math.PI * 2) * 360 / angle;

  // on se positionne au sommet du cercle par rapport au centre
  var offset = new Point(0, -radius);
  position = view.center + offset;

  // on ajoute tous les points sur 360 degré pour avec un cercle complet
  // le point important c'est de comprendre que l'on dessine une ligne avec une
  // épaisseur l'épaisseur de la ligne se calcul par rapport au vecteur
  // perpendiculaire à celui qu'on veut dessiner c'est pour cela que  l'on a
  // rot = vector.rotate(90) ensuite, on rajout chaque fois 2 points. Si on ne
  // trouve pas un pixel noir, ces 2 points se superposent.
  // on peut observer ça en cliquant sur la barre d'espace
  for (var i = 0; i < (360 + angle); i += angle) {
    var vector = new Point({angle: i, length: seg});
    var rot = vector.rotate(90);
    var color = raster.getAverageColor(position + vector / 2);
    var value = color ? (1 - color.gray) * 3 : 0;
    rot.length = Math.max(value, 0.2);
    allPath[count - 1].add(position + vector - rot);
    allPath[count - 1].insert(0, position + vector + rot);
    position += vector;
  }

  // on lisse la courbe (pas nécessaire vu la taille de nos segment 10)
  // si on augment la taille des segments, on gagnera en fluidité, mais on
  // pourrait perdre en précision pour le mot . Du coup il faudrait le smooth
  // pour conserver l'aspect lisse.
  allPath[count - 1].smooth();
}



function resetSpiral() {
  grow = true;

  // Transform the raster, so it fills the view:
  raster.fitBounds(view.bounds);

  if (path) path.remove();
  for (var i = 0; i < allPath.length; i++) {
    allPath[i].remove();
  }

  position = view.center;
  count = 0;
  // path = new Path({fillColor: 'black', closed: true});
  max = Math.min(raster.bounds.width, raster.bounds.height) * 0.5;
}

function onResize() {
  if (raster.loaded) resetSpiral();
  text.point = view.bounds.bottomRight - [30, 30];
}

function onKeyDown(event) {
  if (event.key == 'space') {
    // path.selected = !path.selected;
    for (var i = 0; i < allPath.length; i++) {
      allPath[i].selected = !allPath[i].selected;
    }
  }
}

function onDocumentDrag(event) {
  event.preventDefault();
}

function onDocumentDrop(event) {
  event.preventDefault();

  var file = event.dataTransfer.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var image = document.createElement('img');
    image.onload = function() {
      raster = new Raster(image);
      raster.visible = false;
      resetSpiral();
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);
