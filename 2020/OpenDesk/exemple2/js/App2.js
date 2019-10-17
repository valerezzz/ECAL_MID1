class App {
  constructor() {
    this.setup();
  }

  setup() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.draw();
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
  }
}


window.onload = function() {
  new App();
}
