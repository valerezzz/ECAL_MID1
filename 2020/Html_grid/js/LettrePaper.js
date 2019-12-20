class LettrePaper {
  constructor(parent) {

    //!\ NO TOUCHY BELOW /!\/

    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);

    this.paper = new paper.PaperScope();

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: absolute;';
    this.parent.appendChild(canvas);
    this.paper.setup(canvas);
    this.paper.view.autoUpdate = false;

    //!\ NO TOUCHY ABOVE /!\/





    this.LETTER = new paper.Path();
    this.addSegments(this.LETTER, "./data/svg/letter_1.svg"); // Load external svg path

    this.LETTER.strokeColor = 'black';
    this.LETTER.strokeWidth = 50;
    this.LETTER.strokeJoin = 'miter';
    this.LETTER.applyMatrix = false;

    this.debugMode = true;

    this.dash = {
      start: 0,
      end: 0.5,
      offset: 0
    }

  }

  draw() {

    let scale = 8 * 0.0001;
    let speed = 4 * 0.001;

    const totalLength = this.LETTER.length;
    const shownLength = totalLength * (this.dash.end - this.dash.start);

    // Show handles and points
    this.LETTER.fullySelected = this.debugMode;

    //  - - - - -
    this.LETTER.dashArray = [shownLength, totalLength - shownLength]; //set the dashes of the path - - - -

    // <— - - - - —>
    this.dash.offset = (this.dash.offset + speed)%1; // increment offset
    this.LETTER.dashOffset = -totalLength * (this.dash.start + this.dash.offset); // apply offset

    // Keep position at center of window

    this.LETTER.position = new this.paper.Point(this.w/2, this.h/2); // to center of canvas
    this.LETTER.scaling = new this.paper.Size(this.w*scale, this.w*scale);

    //!\ NO TOUCHY BELOW /!\/
    this.paper.view.draw(); // Render
    //!\ NO TOUCHY ABOVE /!\/
  }

  update() {

    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    this.paper.view.viewSize = new paper.Size(this.w, this.h);

    // p5 resize canvas

    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  addSegments(path, svgFile) {
    path.importSVG(svgFile, function(svg) { path.segments = svg.lastChild.segments });
  }
}