class ForcePoint {
  constructor(x, y) {
    this.children = [];
    this.position = createVector(x, y);
    this.radius = 16;
    //les valeurs constantes
    this.restLength = 90;
    this.k = 0.01;
    this.gravity = createVector(0, 0.2);
    this.velocity = createVector(0, 0);
  }

  add(point, applyForce = true) {
    this.children.push({ p: point, applyForce: applyForce });
  }

  updateForce() {
    if (mouseIsPressed) {
      let d = dist(mouseX, mouseY, this.position.x, this.position.y);
      if (d < this.radius) {
        this.dragging = true;
      }
    } else {
      if (this.dragging) {
        this.dragging = false;
      }
    }

    if (this.dragging) {
      this.position.set(mouseX, mouseY);
    }

    let anchor = this.position;
    if (this.children.length > 0) {
      this.children.forEach((bob) => {
        if (bob.applyForce) {
          let force = p5.Vector.sub(bob.p.position, anchor);
          let x = force.mag() - this.restLength;
          force.normalize();
          force.mult(-1 * this.k * x);
          this.velocity.add(force);
          this.velocity.add(this.gravity);
          bob.p.position.add(this.velocity);
          this.velocity.mult(0.99);
        }
      });
    }
  }

  draw() {
    circle(this.position.x, this.position.y, this.radius);
    this.children.forEach((bob) => {
      line(
        this.position.x,
        this.position.y,
        bob.p.position.x,
        bob.p.position.y
      );
    });
  }
}
