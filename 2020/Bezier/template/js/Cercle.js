class Cercle {
  constructor(ctx) {
    this.x = 0;
    this.y = 0;
    this.rayon = 3;
    this.color = 'rgba(255,165,0,0.1)';
    this.ctx = ctx;
    this.timer = 0;
  }

  affichage() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    // this.ctx.rect(x+(size*i),y+(size*j),size,size);
    this.ctx.ellipse(
        this.x, this.y, this.rayon, this.rayon * 35, 30, 0, Math.PI * 2, true);
    this.ctx.fill();
    // this.ctx.stroke();
    this.ctx.closePath();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }
}
