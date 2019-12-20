class LettreA {
  constructor(parent) {
    this.parent = parent;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.width = this.w = parseInt(parent.style.width);
    this.canvas.height = this.h = parseInt(parent.style.height);
    this.ctx = this.canvas.getContext('2d');
    parent.appendChild(this.canvas);

    this.angle = 0;
    // variable to check if the canvas is active or not
    this.active = false;
  }

  update() {
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);

    this.canvas.width = this.w ;
    this.canvas.height = this.h ;

    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  draw() {
    if (this.active) {
      this.ctx.fillStyle = 'rgba(0,0,255,0.5)';
    } else {
      this.ctx.fillStyle = 'rgb(0,0,0)';
    }
    // example
    // cercle moving back and forth
    let r = 0;
    if (this.h < this.w) {
      r = this.h / 2;
    } else {
      r = this.w / 2;
    }
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.beginPath();
    this.ctx.arc(
        this.w / 2, this.h / 2,
        Math.abs(Math.sin(this.angle * Math.PI / 180)) * r, 0, Math.PI * 2,
        false);
    // this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.angle++;
  }
}
