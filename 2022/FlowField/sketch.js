let scale = 40;
let cols, rows;
let cases = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);
  for (let y = 0; y < height; y += scale) {
    for (let x = 0; x < height; x += scale) {
      cases.push(new Case(x, y, scale, scale));
    }
  }
}

function draw() {
  background(255);
  fill(255);
  stroke(0);
  cases.forEach((item) => {
    item.update();
    item.draw();
  });
}
