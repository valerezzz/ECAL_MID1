/*
  App that create a skewed grid with interaction.
  The grid is composed of square modules.
  Each module can activate one of its side to draw a segment.

  This example draws random segments on the skewed grid, and make them appear or
  disapear whith mouse over
*/

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = '#000000';
    document.body.appendChild(this.canvas);
    // !! IMPORTANT VALUE TO DETERMINE HORIZONTAL SKEWING
    this.SKEW_FACTOR = -0.2;
    this.setup();
  }

  buildGrid() {
    this.grid = [];
    const size = (window.innerWidth) / 17;
    for (let y = 0; y < window.innerHeight; y += size) {
      // we add 300 pixels to fill the screen. This number can be changed
      for (let x = 0; x < window.innerWidth + 300; x += size) {
        const rect = new Rectangle(x, y, size, size);
        const module =
            new Module(rect, Math.floor(Math.random() * 5), this.ctx);
        // GIVE THE SKEWING INFO TO THE MODULE
        // !! important for correct interaction
        module.skew(this.SKEW_FACTOR, 0);
        this.grid.push(module);
      }
    }
    console.log(this.grid.length);
  }
  setup() {
    this.buildGrid();
    this.addListener();
    this.draw();
  }

  addListener() {
    this.moveHandler = this.onMove.bind(this);
    document.addEventListener('mousemove', this.moveHandler);
  }
  onMove(e) {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].over(e.x, e.y);
    }
  }

  draw() {
    /*
    before visible
    */
    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'black';
    this.ctx.save();
    // SKEW ALL THE GRID
    this.ctx.transform(1, 0, this.SKEW_FACTOR, 1, 0, 0);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].draw();
    }
    this.ctx.restore();
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function() {
  new App();
}
