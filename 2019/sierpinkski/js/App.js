'use strict'
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    document.addEventListener('click', this.mouseClicked.bind(this));
    document.addEventListener('keydown', this.onEnterPressed.bind(this));
    this.setup();
  }

  setup() {
    // init variables
    this.isMoving = false;
    this.drawCount = 0;
    this.triList = [];
    // draw the first Triangle
    this.triList.push(new Triangle(
        window.innerWidth / 2, window.innerHeight / 4, window.innerHeight / 2,
        this.ctx));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawAll();

    if (this.isMoving) {
      this.updatePositions();
      requestAnimationFrame(this.draw.bind(this));
    }
  }

  mouseClicked(e) {
    if (this.drawCount > 0) {
      this.splitAll();
    }
    this.draw();
    this.drawCount++;
  }
  onEnterPressed(e) {
    if (e.keyCode == 13 && this.drawCount >= 3) {
      this.isMoving = !this.isMoving;
      this.draw();
    }
  }

  splitAll() {
    let toSplit = [];
    for (let i = 0; i < this.triList.length; i++) {
      let triangle = this.triList[i];
      toSplit.push(triangle);
    }
    for (let i = 0; i < toSplit.length; i++) {
      toSplit[i].split(this.triList);
    }
  }

  drawAll() {
    for (let i = 0; i < this.triList.length; i++) {
      let triangle = this.triList[i];
      triangle.draw((i + 1));
    }
  }
  updatePositions() {
    for (let i = 0; i < this.triList.length; i++) {
      this.triList[i].edges();
      this.triList[i].move();
    }
  }
}

window.onload = function() {
  new App();
}
