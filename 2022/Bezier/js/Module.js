class Module {
  constructor(left, top, width, height) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.p0 = createVector(left + width / 2, top);
    this.p1 = createVector(left + width / 2, top + height / 2);
    this.p2 = createVector(left + width / 2, top + height);
  }

  update(x, y) {
    if (y > this.top && y < this.top + this.height && this.active) {
      this.p1.x = x;
      this.p1.y = y;
    }
  }

  activate(x, y) {
    if (y > this.top && y < this.top + this.height) {
      this.active = true;
    }
  }
  deactivate() {
    this.active = false;
  }

  draw() {
    noStroke();
    fill(116, 202, 255);
    rect(this.left, this.top, this.width, this.height);

    stroke(255);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let t = 0; t <= 1; t += 0.1) {
      let x1 = lerp(this.p0.x, this.p1.x, t);
      let y1 = lerp(this.p0.y, this.p1.y, t);
      let x2 = lerp(this.p1.x, this.p2.x, t);
      let y2 = lerp(this.p1.y, this.p2.y, t);
      let x = lerp(x1, x2, t);
      let y = lerp(y1, y2, t);
      vertex(x, y);
    }
    endShape();
  }
}
