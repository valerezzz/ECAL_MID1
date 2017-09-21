var Shape = function(x, y, size, ctx, type) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.type = type;
  this.size = size; // object {"w":100,"h":100}
  this.speed = 1;
};

Shape.prototype = {

  update : function() { this.x += this.speed; },

  draw : function() {

    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "white";
    switch (this.type) {

    case "circle":
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size.w, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      break;
    default:
      // rectangle
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.size.w, this.size.h);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }

  }
}
