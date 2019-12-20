class App {
  constructor() {
    this.grid = new Grid();
    //
    // lettre A could be any class with a canvas
    // we just need a container (layer1)
    const layer1 = this.grid.cases[0];
    this.lettreA = new LettreA(layer1);

    const layer2 = this.grid.cases[1];
    this.letterP5 = new LettreP5(layer2);

    this.setup();
  }

  setup() {
    this.draw();
  }

  draw() {
    this.lettreA.update();
    this.lettreA.draw();

    this.letterP5.update();
    this.letterP5.draw();

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function() {
  new App();
};

// force p5
function setup() {}
