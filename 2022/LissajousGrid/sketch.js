let allCases;
let col = 4;
let row = 4;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  allCases = [];
  let sizeX = width / col;
  let sizeY = height / row;
  for (let y = 0; y < height; y += sizeY) {
    for (let x = 0; x < width; x += sizeX) {
      allCases.push(new Case(x, y, sizeX, sizeY, color(255)));
    }
  }
}

function draw() {
  background(0);
  allCases.forEach((item) => {
    item.dessine();
  });
}
