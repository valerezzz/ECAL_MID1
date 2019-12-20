class LettreP5 {
  constructor(parent) {
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);
    // p5 canvas
    this.canvas = createCanvas(this.w, this.h);
    this.canvas.canvas.style.position = 'absolute';
    this.canvas.parent(parent);
    // init p5 VARS...
    fill(255, 0, 0, 126);
    this.gravity = 9.0;
    this.mass = 2.0;
    this.s1 = new Spring2D(0.0, width / 2, this.mass, this.gravity);
    this.s2 = new Spring2D(0.0, width / 2, this.mass, this.gravity);
  }
  update() {
    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    // p5 resize canvas
    resizeCanvas(this.w, this.h);

    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  draw() {
    if (this.active) {
      background(0);
    }
    this.s1.update(mouseX, mouseY);
    this.s1.display(mouseX, mouseY);
    this.s2.update(this.s1.x, this.s1.y);
    this.s2.display(this.s1.x, this.s1.y);
  }
}

class Spring2D {
  constructor(xpos, ypos, m, g) {
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
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }
}
