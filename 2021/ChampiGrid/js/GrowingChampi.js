class GrowingChampi {
  constructor(paper, x, y) {
    this.paper = paper;
    // console.log(this.paper.view.context.canvas);
    this.origin = { x: x, y: y };
    this.x = x;
    this.y = y;
    this.canGrow = true;
    this.size = new this.paper.Size(0, 0);
    this.s = 0;
    this.maxDimension = Math.random() * 300 + 75;

    /**
     * Duplication
     */
    this.loadSVG();
  }

  loadSVG() {
    // ON CHARGE LE SVG
    this.paper.project.importSVG("./data/svg/mario_champi.svg", (svg) => {
      this.CHAMPI = svg;
      this.CHAMPI.clipped = false;
      this.interaction = svg.children.circle;
    });
  }

  launchDuplicationSpore() {
    const dup = this.interaction.clone();
    dup.fillColor = "white";
    dup.strokeColor = "black";
    const _dup = new this.paper.Group();
    _dup.addChild(dup);
    return new Duplicater(this.paper, _dup);
  }

  update() {
    if (this.CHAMPI) {
      this.CHAMPI.position.x = this.x;
      this.CHAMPI.position.y = this.y - this.CHAMPI.bounds.height / 2;
      if (this.canGrow) {
        this.s += 3;
        this.CHAMPI.bounds.width = this.s;
        this.CHAMPI.bounds.height = this.s;
        if (this.s >= this.maxDimension) {
          this.canGrow = false;
        }
      }
    }
  }

  /**
   *
   * @param {OBJECT} a point de coordonnée x,y
   * @param {OBJECT} b point de coordonnée x,y
   */
  distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
}
