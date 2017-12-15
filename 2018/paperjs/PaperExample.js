'use strict';
class PaperExample {
  constructor(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    paper.setup(canvas);
    let s = paper.project.importSVG(document.getElementById('svg'));

    this.line = s.children.line;
    this.line.visible = false;
    this.line.position = paper.view.center;

    this.line.children[0].fullySelected = false;
    this.line.children[0].fillColor.alpha = 0;
    this.line.children[0].flatten(0.5);
    // this.line.children[0].smooth();
    this.line.children[0].strokeColor = 'black';
    console.log(this.line.children[0].segments);

    this.path = new paper.Path({
      strokeColor: 'black',
      strokeWidth: 10,
      strokeCap: 'round',
    });
    this.counter = 0;
    this.draw();
  }

  setup() {}

  update() {}

  draw() {
    if (this.counter % 1 == 0) {
      if (this.line.children[0].segments.length > 0) {
        let shifted = this.line.children[0].segments.shift();
        this.path.add(shifted);
      }
    }
    this.counter++;
    paper.view.draw();
    requestAnimationFrame(this.draw.bind(this));
  }
}

new PaperExample(document.getElementById('canvas'));
