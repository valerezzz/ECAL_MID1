class Duplicater {
  constructor(paper, element) {
    console.log(element);
    this.paper = paper;
    this.element = element;
    this.gravity = 0.5;
    this.vx = Math.random() * 10;
    this.vy = Math.random() * -15 - 5;
    this.stop = false;
    this.hasBeenAdded = false;
  }

  update() {
    if (!this.stop) {
      this.vy += this.gravity;
      this.element.position.x += this.vx;
      this.element.position.y += this.vy;
    }
  }
}
