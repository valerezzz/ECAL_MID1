class Case {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vector = p5.Vector.fromAngle(PI / 4);
  }

  update() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      let diffx = mouseX - pmouseX;
      let diffy = mouseY - pmouseY;
      let orientation = createVector(diffx, diffy);
      this.vector.add(orientation);
      this.vector.setMag(this.width);
    }
  }

  draw() {
    push();
    translate(this.x + this.width / 2, this.y + this.height / 2);
    noStroke();
    // fill(255, 0, random(255), 50);
    // rect(-this.width / 2, -this.height / 2, this.width, this.height);
    rotate(this.vector.heading());
    stroke(0);
    line(0, 0, this.width, 0);
    pop();
  }
}
