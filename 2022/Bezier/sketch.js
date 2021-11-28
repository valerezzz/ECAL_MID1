let p0, p1;
let modules;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  /**
   *
   *  on donne la position de départ du module (le coint top left et la largeur hauteur)
   */
  modules = [];
  for (let i = 0; i < 5; i++) {
    const w = window.innerWidth;
    const h = window.innerHeight / 5;
    const module = new Module(0, i * h, w, h);
    modules.push(module);
  }
}

function draw() {
  modules.forEach((item) => {
    item.update(mouseX, mouseY);
    item.draw();
  });
}

function mousePressed() {
  modules.forEach((item) => {
    item.activate(mouseX, mouseY);
  });
}

function mouseReleased() {
  modules.forEach((item) => {
    item.deactivate();
  });
}
