'use strict';

class Triangle {
  constructor(x, y, r, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = {'x': 1 - Math.random() * 2, 'y': 1 - Math.random() * 2};
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = 'postcard.jpg';
  }

  split(triList) {
    let currentIndex = triList.indexOf(this);
    triList.splice(currentIndex, 1);
    triList.push(
        new Triangle(this.x, this.y - this.r / 4, this.r / 2, this.ctx));
    triList.push(new Triangle(
        this.x - this.r / 2, this.y + this.r / 2, this.r / 2, this.ctx));
    triList.push(new Triangle(
        this.x + this.r / 2, this.y + this.r / 2, this.r / 2, this.ctx));
  }

  draw(i) {
    let x1 = this.x;
    let y1 = this.y - this.r / 2;

    let x2 = this.x - this.r;
    let y2 = this.y + this.r;

    let x3 = this.x + this.r;
    let y3 = this.y + this.r;


    this.ctx.save();
    this.ctx.fillStyle = 0;

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.fill();
    this.ctx.closePath();

    // add masked image
    this.size = y3 - y1;
    let new_width = this.img.width * this.size / this.img.height;
    this.ctx.clip();
    this.ctx.drawImage(this.img, x2, y1, new_width, this.size);
    // this.ctx.drawImage(
    //     this.img, x2, y1 - (((i % 3) + 1) * this.size / 4 - this.size / 4),
    //     new_width * ((i % 3) + 1), this.size * ((i % 3) + 1));
    this.ctx.restore();
  }
  edges() {
    if (this.x > window.innerWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = window.innerWidth;
    }
    if (this.y > window.innerHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = window.innerHeight;
    }
  }
  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
