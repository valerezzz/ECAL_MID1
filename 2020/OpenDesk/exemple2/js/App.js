class App {
  constructor() {
    this.lerpFactor = .1;
    this.canvas = document.getElementsByTagName('canvas')[0];
    // document.body.style.background = "black";
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.ctx = this.canvas.getContext('2d');
    this.tool = null;
    this.addKeyboardInteraction();
    this.setup();
    this.draw();
  }

  addKeyboardInteraction() {
    document.addEventListener('keydown', this.keydown.bind(this));
  }

  setup() {
    this.circles = [];
    this.blueCircles = [];
    for (let i = 0; i < 1024; i++) {
      const circle = new Circle(this.ctx);
      circle.y = this.h;
      circle.x = i * 2;
      this.circles.push(circle);
      const bcircle = new Circle(this.ctx);
      bcircle.y = this.h;
      bcircle.x = i * 2;
      bcircle.color = 'red';
      this.blueCircles.push(bcircle);
    }
  }

  draw() {
    // clean canvas
    this.ctx.clearRect(0, 0, this.w, this.h);

    // DO THE SOUND VISUALISATION HERE
    if (this.tool) {
      this.tool.updateFrequency();
      this.tool.updateWave();
      for (let i = 0; i < this.circles.length; i++) {
        // change height for each circle
        const circle = this.circles[i];
        const bcircle = this.blueCircles[i];
        const goal = this.h - this.tool.dataWave[i] * 10 + 750;
        circle.y = this.lerp(circle.y, goal, this.lerpFactor);
        bcircle.y = ((goal - 750) / 10) * 5 + 750;
        circle.draw();
        bcircle.draw();
      }
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  keydown(e) {
    console.log('keydown');
    const track = 'audio/goto10.mp3';
    switch (e.keyCode) {
      case 32:  // spacebar
        if (this.tool == null) {
          this.tool = new AudioTool(track);
          this.tool.toggle();
        } else {
          this.tool.reset();
          if (this.isMic) {
            this.tool.update(track);
            this.tool.toggle();
            this.isMic = false;
          } else {
            this.tool.update(null);
            this.isMic = true;
          }
        }
        break;
    }
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
  }
}

window.onload = (e) => {
  new App();
}
