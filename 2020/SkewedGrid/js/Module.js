class Module {
  constructor(rect, type, ctx) {
    // NECESSARY CALCUTATIONS FOR PROPER COORDINATE AFTER SKEWING
    // DON'T TOUCH THIS
    this.matrix = [1, 0, 0, 1, 0, 0];
    // everything else
    this.ctx = ctx;
    this.size = rect.width;
    this.x = rect.x;
    this.y = rect.y;
    this.thickness = 10;
    this.active = true;
    this.canChange = true;
    // this define the thick line to show on the Module
    // this can be the top , the bottom , the left  or the right
    this.path = new Path2D();
    switch (type) {
      // top
      case 1:
        this.path.rect(rect.x, rect.y, rect.width, this.thickness);
        break;
        // bottom
      case 2:
        this.path.rect(
            rect.x, rect.y + rect.height, rect.width, this.thickness);
        break;
        // left
      case 3:
        this.path.rect(rect.x, rect.y, this.thickness, rect.height);
        break;
        // right
      case 4:
        this.path.rect(
            rect.x + rect.width, rect.y, this.thickness, rect.height);
        break;
    }
  }
  // function to detect if the user mouse touches the path
  over(x, y) {
    if (this.isPointInTransformedRect(x, y) && this.canChange) {
      this.canChange = false;
      this.active = !this.active;
    } else if (!this.isPointInTransformedRect(x, y)) {
      this.canChange = true;
    }
  }
  // draw the outlines of the module (that will make the grid)
  // draw the module only if it's active

  // probably, we will need 6 Path by module to make sur we can draw any needed
  // line
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.stroke();
    this.ctx.closePath();
    if (this.active) {
      this.ctx.beginPath();
      this.ctx.fill(this.path);
      this.ctx.closePath();
    }
  }


  /*
    !!DON'T TOUCH THESE FUNCTIONS!!
    THESE ARE UTIL FUNCTIONS TO CALCULATE REAL POSITION OF ELEMENTS
    AFTER DEFORMATION.
    EX : IF WE DISTORT A GRID WITH A TRANSFORM, ALL X,Y CORDINATE ARE CHANGED.
    WE NEED MATRICES TO CALCULATE "REAL COORDINATE"

  */
  skew(radianX, radianY) {
    const mat = [1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0];
    this.multiply(mat);
  }
  multiply(mat) {
    const m0 = this.matrix[0] * mat[0] + this.matrix[2] * mat[1];
    const m1 = this.matrix[1] * mat[0] + this.matrix[3] * mat[1];
    const m2 = this.matrix[0] * mat[2] + this.matrix[2] * mat[3];
    const m3 = this.matrix[1] * mat[2] + this.matrix[3] * mat[3];
    const m4 =
        this.matrix[0] * mat[4] + this.matrix[2] * mat[5] + this.matrix[4];
    const m5 =
        this.matrix[1] * mat[4] + this.matrix[3] * mat[5] + this.matrix[5];
    this.matrix = [m0, m1, m2, m3, m4, m5];
  }
  isPointInTransformedRect(_x, _y) {
    const p = this.getScreenPoint(_x, _y);
    const x = p.x;
    const y = p.y;
    return this.ctx.isPointInPath(this.path, x, y);
  }
  getScreenPoint(transformedX, transformedY) {
    return (this.screenPoint(transformedX, transformedY));
  }
  screenPoint(transformedX, transformedY) {
    const d =
        1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
    const im = [
      this.matrix[3] * d, -this.matrix[1] * d, -this.matrix[2] * d,
      this.matrix[0] * d,
      d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]),
      d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5])
    ];
    return ({
      x: transformedX * im[0] + transformedY * im[2] + im[4],
      y: transformedX * im[1] + transformedY * im[3] + im[5]
    });
  }
}
