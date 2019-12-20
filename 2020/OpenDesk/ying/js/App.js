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
    this.angle = 0;
    this.setup();
  }

  setup() {
    this.bigCercle = new Circle(this.ctx);
    this.bigCercle.r = 8 * 50;
    this.bigCercle.x = this.w / 2;
    this.bigCercle.y = this.h / 2;
    this.bigCercle.direction = 1;
    this.bigCercle.color = 'white';
    this.bigCercle.isHalf = true;
    // 2 medium circles
    const medCircle1 = new Circle(this.ctx);
    medCircle1.r = 4 * 50;
    medCircle1.x = 4 * 50;
    medCircle1.y = 0;
    medCircle1.direction = -2;
    medCircle1.color = 'white';
    medCircle1.isHalf = true;
    this.bigCercle.subCircles.push(medCircle1);
    const medCircle2 = new Circle(this.ctx);
    medCircle2.r = 4 * 50;
    medCircle2.x = -4 * 50;  // 0;  // this.w / 4;
    medCircle2.y = 0;        // this.h / 2;
    medCircle2.direction = -2;
    medCircle2.color = 'black';
    medCircle2.isHalf = true;
    medCircle2.delta = Math.PI;
    this.bigCercle.subCircles.push(medCircle2);


    // 4 small circles
    const smallCircle1 = new Circle(this.ctx);
    smallCircle1.r = 50;
    smallCircle1.x = 100;
    smallCircle1.color = 'black';
    smallCircle1.direction = 0;
    smallCircle1.outlineCircle = true;
    const smallCircle2 = new Circle(this.ctx);
    smallCircle2.r = 50;
    smallCircle2.x = -100;
    smallCircle2.color = 'white';
    smallCircle2.direction = 0;
    smallCircle2.outlineCircle = true;
    const smallCircle3 = new Circle(this.ctx);
    smallCircle3.r = 50;
    smallCircle3.x = 100;
    smallCircle3.color = 'white';
    smallCircle3.direction = 0;
    smallCircle3.outlineCircle = true;
    const smallCircle4 = new Circle(this.ctx);
    smallCircle4.r = 50;
    smallCircle4.x = -100;
    smallCircle4.color = 'black';
    smallCircle4.direction = 0;
    smallCircle4.outlineCircle = true;
    medCircle1.subCircles.push(smallCircle1);
    medCircle1.subCircles.push(smallCircle2);
    medCircle2.subCircles.push(smallCircle3);
    medCircle2.subCircles.push(smallCircle4);


    this.draw();
  }

  draw() {
    // clean canvas
    this.ctx.clearRect(0, 0, this.w, this.h);
    const radian = this.angle * Math.PI / 180;
    this.bigCercle.draw(-radian);
    this.angle += 0.5;
    requestAnimationFrame(this.draw.bind(this));
  }


  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
}

window.onload = (e) => {
  new App();
};
