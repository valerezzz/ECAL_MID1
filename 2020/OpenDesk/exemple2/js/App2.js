class App {
  constructor() {
    this.setup();
  }

  setup() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.tool = null;
    document.addEventListener('keydown', this.keydown.bind(this));
    // mon stock de cercles
    this.allCircles = [];
    this.allCircles2 = [];
    for (let i = 0; i < 1024; i++) {
      const circle = new Circle(this.ctx);
      circle.x = i * 2;
      circle.y = this.h / 2;
      this.allCircles.push(circle);
      const circle2 = new Circle(this.ctx);
      circle2.x = i * 2;
      circle2.y = this.h / 2;
      circle2.color = 'red';
      this.allCircles2.push(circle2);
    }
    this.draw();
  }

  keydown(p) {
    // console.log(p);
    const track = 'audio/goto10.mp3';
    if (this.tool == null) {
      this.tool = new AudioTool(track);
      this.tool.toggle();
    } else {
      this.tool.toggle();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    if (this.tool != null) {
      this.tool.updateWave();
      this.tool.updateFrequency();
      for (let i = 0; i < this.allCircles.length; i++) {
        const circle = this.allCircles[i];
        const circle2 = this.allCircles2[i];
        const positiony = this.tool.data[i] * 3;
        const positiony2 = this.tool.dataWave[i] * 3;
        circle.y = positiony;
        circle.draw();
        circle2.y = positiony2;
        circle2.draw();
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}


window.onload = function() {
  new App();
}
