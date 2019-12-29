class LettreP5 {
  constructor(parent) {
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);

    const P5 = this.P5 = new p5(sketch => sketch);

    // p5 canvas
    this.p5Canvas = P5.createCanvas(this.w, this.h);
    this.p5Canvas.canvas.style.position = 'absolute';
    this.p5Canvas.parent(parent);
    // init p5 VARS...
    P5.fill(255, 0, 0, 126);
    this.gravity = 9.0;
    this.mass = 2.0;
    this.s1 = new Spring2D(P5, 0.0, P5.width / 2, this.mass, this.gravity);
    this.s2 = new Spring2D(P5, 0.0, P5.width / 2, this.mass, this.gravity);

  }

  update() {
    const P5 = this.P5;

    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    // p5 resize canvas
    P5.resizeCanvas(this.w, this.h);

    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  draw() {
    const P5 = this.P5;

    if (this.active) {
      P5.background(0);
    }

    this.s1.update(P5.mouseX, P5.mouseY);
    this.s1.display(P5.mouseX, P5.mouseY);
    this.s2.update(this.s1.x, this.s1.y);
    this.s2.display(this.s1.x, this.s1.y);
  }
}


class Spring2D {
  constructor(P5Instance, xpos, ypos, m, g) {

    const P5 = this.P5 = P5Instance;

    this.x = xpos;  // The x- and y-coordinates
    this.y = ypos;
    this.vx = 0;  // The x- and y-axis velocities
    this.vy = 0;
    this.mass = m;
    this.gravity = g;
    this.radius = 30;
    this.stiffness = 0.2;
    this.damping = 0.7;
  }

  update(targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  display(nx, ny) {

    const P5 = this.P5;

    P5.noStroke();
    P5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    P5.stroke(255);
    P5.line(this.x, this.y, nx, ny);
  }
}
