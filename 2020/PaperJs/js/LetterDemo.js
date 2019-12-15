class LetterDemo {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    document.body.appendChild(this.canvas);
    paper.setup(this.canvas);
    var s = paper.project.importSVG(document.getElementById('svg'));
    s.visible = true;  // Turn off the effect of display:none;
    this.letter = s.children.letter;
    this.letter.position = paper.view.center;
    // method to subdivide the path in many segments....
    this.letter.children[0].flatten(0.05);
    this.copy = this.letter.children[0].clone();
    this.copy.visible = false;
    this.letter.children[0].fullySelected = true;
    this.mouse = {x: 0, y: 0};
    document.addEventListener('mousemove', this.onMove.bind(this));
    this.draw();
  }

  onMove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }

  draw() {
    for (var i = 0; i < this.letter.children[0].segments.length; i += 1) {
      this.letter.children[0].segments[i].point = [
        this.copy.segments[i].point.x +
            Math.cos(
                ((window.innerWidth / 2 - this.mouse.x) + i * 5) * Math.PI /
                180) *
                10,
        this.copy.segments[i].point.y +
            Math.sin(
                ((window.innerHeight / 2 - this.mouse.y) + i * 5) * Math.PI /
                180) *
                10,
      ];
    }
    // this.letter.position = paper.view.center;
    paper.view.draw();
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = () => {
  new LetterDemo();
}
