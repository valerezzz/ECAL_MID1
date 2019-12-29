class App {
  constructor() {
    this.grid = new Grid();
    //
    // lettre A could be any class with a canvas
    // we just need a container (layer1)
    // const layer1 = this.grid.cases[0];
    // this.lettreA = new LettreA(layer1);

    const layer1 = this.grid.cases[0];
    this.letterP5 = new LettreP5(layer1);

    const layer2 = this.grid.cases[1];
    this.snake = new Snake(layer2);

    this.initListeners();
    this.setup();
  }

  initListeners() {
    this.mousePressedHandler = this.mousePressed.bind(this);
    this.mouseReleasedHandler = this.mouseReleased.bind(this);
    document.addEventListener('mousedown', this.mousePressedHandler);
    document.addEventListener('mouseup', this.mouseReleasedHandler);
  }

  mousePressed(e) {
    this.snake.mousePressed(e);
  }
  mouseReleased(e) {
    if (!this.grid.isOpen) {
      this.grid.onClick(e);
    } else if (e.x > window.innerWidth - 50 && e.y < 50) {
      this.grid.onClick(e);
    } else {
      this.snake.mouseReleased(e);
    }
  }

  setup() {
    this.draw();
  }

  draw() {
    // this.lettreA.update();
    // this.lettreA.draw();

    this.letterP5.update();
    this.letterP5.draw();

    this.snake.update();
    this.snake.draw();

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function() {
  new App();
};

// force p5
// function setup() {}
