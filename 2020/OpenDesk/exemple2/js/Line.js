class Line {
  constructor(x, y, _x, _y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this._x = _x;
    this._y = _y;
    this.color = 'red';
  }

  draw() {
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this._x, this._y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
