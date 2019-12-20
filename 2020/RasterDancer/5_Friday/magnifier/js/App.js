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
    this.letters = new Letters(this.ctx);
    this.letters.set('a');
    this.initListeners();
    this.draw();
  }

  initListeners() {
    this.onMouseMoveHandler = this.mousemove.bind(this);
    this.onMouseClickHandler = this.mouseclick.bind(this);
    document.body.addEventListener('mousemove', this.onMouseMoveHandler);
    document.body.addEventListener('click', this.onMouseClickHandler);
  }

  mousemove(e) {
    // console.log(e.x);
    const factorX = map(e.x, 0, window.innerWidth, 4, 20);
    const factorY = map(e.y, 0, window.innerHeight, 10, 400);
    this.letters.move(factorX, factorY);
  }
  mouseclick(e) {
    this.letters.click();
  }
  draw() {
    /*
    before visible
    */
    this.letters.update();


    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */
    this.letters.show();

    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function() {
  new App();
}
