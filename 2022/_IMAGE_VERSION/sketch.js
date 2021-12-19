let data;
let allShapes = [];
let superShape;
let limit;

function preload() {
  // on charge l'ensemble des formes / images / data pour supershape / sounds
  data = loadJSON("json/shapes.json");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  // on crée une classe qui va charger l'image, le son et les data pour chaque paramètre du JSON
  // on les stock dans un tableau
  /**
   *  CETTE FUNCTION A ETE REMPLACEE PAR LE CLICK
   *
   */
  // const keys = Object.keys(data);
  // for (let i = 0; i < keys.length; i++) {
  //   const shape = new ImageShape(
  //     width + random(0, 500),
  //     random(0, height - 120),
  //     data[keys[i]]
  //   );
  //   allShapes.push(shape);
  // }

  //on crée une super shape au centre de la page avec des paramètre initiaux...
  //on set la couleur pour cette superShape
  fill(0);
  superShape = new SuperShape(width / 2, height / 2, 100, 0, 0, 0, 0, 0, 0);

  //on défini la limit pour le morph
  limit = { x1: width / 2, y1: 0, x2: width / 2, y2: height };
}

function draw() {
  background(255);

  // on update la position de toutes les shapes dans la mémoire
  // on vérifie si chaque forme dépasse la limite
  // on affiche l'image
  allShapes.forEach((shape, index) => {
    shape.update();
    shape.check(superShape, limit);
    shape.draw();
    if (shape.x < -120) {
      allShapes.splice(index, 1);
    }
  });

  //affiche superShape
  noStroke();
  superShape.draw();

  //affiche limit
  stroke(255, 0, 0);
  line(limit.x1, limit.y1, limit.x2, limit.y2);
}

// Ajout d'éléments aléatoires au click
function mouseClicked(e) {
  const keys = Object.keys(data);
  const shape = new ImageShape(
    width /*+ random(0, 500)*/,
    random(0, height - 120),
    data[keys[floor(random(keys))]]
  );
  allShapes.push(shape);
}
