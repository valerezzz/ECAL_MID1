class FordCircle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dimension = { width: height * 2 };
  }

  updateZoomLevel() {
    //zoom (au cas où)
    // uniquement zoom centré (pas hyper intéressant visuellement)
    // il faudrait décaler l'ensemble des cercles pour une vue plus dans le translate du sketch
    this.dimension = { width: map(mouseY, 0, height, height * 2, height * 10) };
  }

  draw() {
    stroke(255);
    noFill();
    let x = this.x * this.dimension.width - this.dimension.width / 2;
    let y = -this.r * this.dimension.width;
    let r = this.r * this.dimension.width;
    circle(x, y, r * 2);
  }
}
