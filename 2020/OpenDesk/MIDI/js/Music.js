class Music {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);


    // console.log('Music');
    this.midi = new Midi();
    this.midi.setup(this);

    this.rayon = 0;
    this.posy = 0;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */

    if (this.message) {
      if (this.message[3] == 1) {
        this.rayon = Number(this.message[4]);
      }
      if (this.message[3] == 0) {
        this.posy = this.map(Number(this.message[4]), 0, 127, 1, 360);
      }
    }

    this.ctx.beginPath();
    // this.ctx.arc(this.w / 2, this.posy, this.rayon * 2, 0, Math.PI * 2,
    // false);
    console.log(360 / this.posy);
    for (let i = 0; i < 360; i += (360 / this.posy)) {
      const x = this.w / 2 + Math.cos(i * Math.PI / 180) * this.rayon;
      const y = this.h / 2 + Math.sin(i * Math.PI / 180) * this.rayon;
      if (i == 0) {
        this.ctx.moveTo(x, y);
      }
      this.ctx.lineTo(x, y);
    }
    const x1 = this.w / 2 + Math.cos(0 * Math.PI / 180) * this.rayon;
    const y1 = this.h / 2 + Math.sin(0 * Math.PI / 180) * this.rayon;
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
    this.ctx.closePath();

    requestAnimationFrame(this.draw.bind(this));
  }

  onmessage(message) {
    console.log(message);
    this.message = message;
  }

  map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
};

window.onload = (e) => {
  new Music();
};
