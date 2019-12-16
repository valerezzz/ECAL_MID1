class App {
  constructor() {
    this.grid = new Grid();
    //
    const layer1 = this.grid.cases[0];
    // lettre A could be any class with a canvas
    // we just need a container (layer1)
    this.lettreA = new LettreA(layer1);
    this.setup();
  }
  setup() {
    this.draw();
  }

  draw() {
    this.lettreA.update();
    this.lettreA.draw();
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function() {
  new App();
}
