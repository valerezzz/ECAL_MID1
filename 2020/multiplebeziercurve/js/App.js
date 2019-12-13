class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.setup();
  }
  setup() {
    this.letter = new letter01(this.ctx);
    this.startListeners();
    this.draw();
  }

  startListeners() {
    this.mouseDownHandler = this.onMouseDown.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.keyDownHandler = this.onKeyDown.bind(this);

    document.addEventListener('mousedown', this.mouseDownHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    // pour exporter les points de toutes les courbes
    document.addEventListener('keydown', this.keyDownHandler);
  }


  // e = permets de chopper le point de clique de souris
  onMouseUp(e) {
    this.letter.up(e.x, e.y);
  }
  onMouseDown(e) {
    this.letter.down(e.x, e.y);
  }
  onMouseMove(e) {
    this.letter.update(e.x, e.y);
  }

  onKeyDown(e) {
    // touche enter
    if (e.keyCode == 13) {
      this.letter.getPoints();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.letter.draw();
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function() {
  new App();
}
