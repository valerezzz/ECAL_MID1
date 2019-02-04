/*
  FORD CIRCLE IMAGE VISUALISATION
  VERY SIMPLE CODE
  NO LIBRARY NEEDED
  -> It generate a simple version of the interactive Ford Circles.
  -> It allows to load images
  -> It allows to zoom in a specific position with the mouse
  -> It allows to display text within the bubble, only if there is enough space
  inside the circle
*/

class App {
  constructor() {
    // CREATE A CANVAS TO DRAW OUR APP
    this.canvas = document.createElement('canvas');
    // GET THE DIMENSIONS
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    // GET THE CONTEXT
    this.ctx = this.canvas.getContext('2d');
    // SET FEW COLORS
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'rgb(255,0,0)';
    // SET A FONT SIZE (used within the circles)
    this.ctx.font = '18px Arial';
    // OBJECT THAT WILL STORE OUR MOUSE VARIABLES
    this.dimension = {'x': 1, 'width': 0};
    // ADD THE CANVAS TO THE PAGE
    document.body.appendChild(this.canvas);
    // GET THE IMAGES
    this.images = [
      document.getElementById('g1'), document.getElementById('g2'),
      document.getElementById('g3')
    ];
    // SET A BOTTOM FOR OUR FORD CIRCLES
    this.verticalPosition = this.h - 200;
    // SET THE MOUSE INTERACTION
    this.movehandler = this.onmove.bind(this);
    // LAUNCH THE SETUP
    this.setup();
  }
  setup() {
    // CREATE THE CIRCLES
    this.circles = this.getFordCircles(31);
    // INIT INTERACTION WITH THE MOUSE
    this.addListeners();
    // START THE APP
    this.draw();
  }
  onmove(e) {
    // STORE THE MOUSE VARIABLES
    this.dimension = {
      'x': e.x,
      'width': e.y.map(0, this.h, this.h / 4, this.w * 50)
    };
  }
  addListeners() {
    document.addEventListener('mousemove', this.movehandler);
  }
  /*
    THAT FUNCTION IS THE ONLY THING NEEDED TO GENERATE THE FORD CIRCLES
    BASED ON THE FAREY SEQUENCE
    https://en.wikipedia.org/wiki/Farey_sequence
  */
  getFordCircles(n) {
    // We know first two
    // terms are 0/1 and 1/n
    let x1 = 0;
    let y1 = 1;
    let x2 = 1;
    let y2 = n;
    // For next terms
    // to be evaluated
    let x;
    let y = 0;
    const fareySeq = [x1 + '/' + y1];
    const fordCircles = [{
      'r': (1 / (2 * Math.pow(y1, 2))),
      'x': (x1 / y1),
      'string': x1 + '/' + y1,
      'image': this.images[Math.floor(Math.random() * 3)]
    }];
    while (y != 1.0) {
      // Using recurrence relation to
      // find the next term
      x = Math.floor((y1 + n) / y2) * x2 - x1;
      y = Math.floor((y1 + n) / y2) * y2 - y1;
      // Store next term
      fordCircles.push({
        'r': (1 / Math.pow(y, 2)) / 2,
        'x': (x / y),
        'string': x + '/' + y,
        'image': this.images[Math.floor(Math.random() * 3)]
      });
      // Update x1, y1, x2 and
      // y2 for next iteration
      x1 = x2;
      x2 = x;
      y1 = y2;
      y2 = y;
    }
    return fordCircles;
  }
  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */
    // BECAUSE WE WANT OUR APPLICATION BE CENTERED
    let offset =
        (this.w / 2 - this.dimension.x) * (this.dimension.width / (this.w));
    this.ctx.save();
    this.ctx.translate(this.w / 2 + offset, 0);
    let count = 0;
    // DRAWING ALL THE CIRCLES
    for (let circle of this.circles) {
      this.ctx.save();
      this.ctx.beginPath();
      // WE HAVE TO MULTIPLY OUR POSITIONS BY A SCALE VALUE
      // THAT SCALE VALUE IS BASED ON MOUSE Y
      // AND THEN CENTERED
      let x = circle.x * this.dimension.width - this.dimension.width / 2;
      // VERTICAL POSITION IS CACULATED FROM THE CHOSEN BOTTOM
      let y = this.verticalPosition - (circle.r) * this.dimension.width;
      // EACH CIRCLE RADIUS IS PROPORTIONAL TO THE SCALE
      let r = circle.r * this.dimension.width;
      // DRAW THE CIRCLE
      this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
      // CLIPPING THE SHAPE TO MASK THE IMAGE
      this.ctx.clip();
      // DRAW THE IMAGE
      this.ctx.drawImage(circle.image, x - r, y - r, r * 2, r * 2);
      this.ctx.restore();
      // CHECK THE SIZE OF THE TEXT
      const metrics = this.ctx.measureText(circle.string);
      // IF THE SIZE IS BIGGER THAN THE RADIUS, DON'T DISPLAY THE TEXT
      if (metrics.width < circle.r * this.dimension.width) {
        this.ctx.fillText(circle.string, x - metrics.width / 2, y + 9);
      }
      this.ctx.stroke();
      this.ctx.closePath();
      count++;
    }
    this.ctx.restore();
    requestAnimationFrame(this.draw.bind(this));
  }
};
// GLOBAL FUNCTION TO MAP A NUMBER TO ANOTHER
Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

window.onload = function() {
  new App();
}
