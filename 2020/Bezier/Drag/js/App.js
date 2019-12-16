class App {
  constructor() {
    console.log('template ready');
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'rgb(255,255,255)';
    document.body.appendChild(this.canvas);

    this.radius = 10;
    const a1 = {x: 50, y: 300, fix: true};
    const a2 = {x: 750, y: 300, fix: false};
    const c1 = {x: 400, y: 100};
    const c2 = {x: 400, y: 500};
    this.anchors = [a1, a2, c1, c2];

    this.slider = new Cercle(this.ctx);
    this.slider.color = 'blue';
    this.slider.x = a1.x;
    this.slider.y = a1.y;
    this.slider.t = 0;
    this.slider.rayon = 10;

    this.pool = [];
    for (let i = 0; i < 550; i++) {
      this.pool.push(new Cercle(this.ctx));
    }
    this.visibleCercles = [];
    this.thickness = {x: 100, y: 20};
    // this.timer = 0;

    this.init();
    this.setup();
  }

  init() {
    this.downHandler = this.onMouseDown.bind(this);
    this.moveHandler = this.onMouseMove.bind(this);
    this.upHandler = this.onMouseUp.bind(this);
    document.addEventListener('mousedown', this.downHandler);
    document.addEventListener('mouseup', this.upHandler);
  }

  onMouseDown(e) {
    for (const anchor of this.anchors) {
      const dist = (e.x - anchor.x) ** 2 + (e.y - anchor.y) ** 2;
      if (dist <= this.radius ** 2 && !anchor.fix) {
        anchor.isMoving = true;
      }
    }
    // check slider too
    const dist2 = (e.x - this.slider.x) ** 2 + (e.y - this.slider.y) ** 2;
    if (dist2 <= this.slider.rayon ** 2) {
      this.slider.isMoving = true;
    }
    document.addEventListener('mousemove', this.moveHandler);
  }
  onMouseMove(e) {
    for (const anchor of this.anchors) {
      if (anchor.isMoving) {
        anchor.x = e.x;
        anchor.y = e.y;
      }
    }
    this.bz.update(this.anchors);

    this.positionSlider();
    // move the slider along the line....
    if (this.slider.isMoving) {
      this.slider.x = e.x;
      this.slider.y = e.y;
      this.positionSlider();
    }
  }

  positionSlider() {
    const t = this.getBezierLengthAt(this.slider.x, this.slider.y);
    const {x, y} = this.bz.getPosition(t);
    this.slider.x = x;
    this.slider.y = y;
    this.slider.t = t;
  }

  getBezierLengthAt(_x, _y) {
    let length = 0;
    let final_t = 0;
    let max = 10000000;
    let {prevx, prevy} = this.bz.getPosition(0);
    for (let i = 0; i <= 1; i += (1 / 500)) {
      const {x, y} = this.bz.getPosition(i);
      const dist = Math.sqrt((x - prevx) ** 2 + (y - prevy) ** 2);
      if (dist) {
        length += dist;
        const min = Math.sqrt((_x - x) ** 2 + (_y - y) ** 2);
        if (min < max) {
          max = min;
          final_t = i;
        }
      }
      prevx = x;
      prevy = y;
    }
    return final_t;
  }

  onMouseUp(e) {
    document.removeEventListener('mousemove', this.moveHandler);
    for (const anchor of this.anchors) {
      anchor.isMoving = false;
    }
    this.slider.isMoving = false;
  }

  setup() {
    this.bz = new BezierCurve(this.anchors);
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
    this.ctx.lineWidth = 5;
    // draw CURVE
    this.ctx.beginPath();
    this.ctx.moveTo(this.anchors[0].x, this.anchors[0].y);
    for (let i = 0; i <= 1; i += (1 / 500)) {
      const {x, y} = this.bz.getPosition(i);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineTo(this.anchors[1].x, this.anchors[1].y);
    this.ctx.stroke();
    this.ctx.closePath();

    // Draw the second line on top of the first one
    // bu limitated to the slider
    this.ctx.strokeStyle = 'rgba(0,0,255,1)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.anchors[0].x, this.anchors[0].y);
    for (let i = 0; i <= this.slider.t; i += (1 / 500)) {
      const {x, y} = this.bz.getPosition(i);
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    this.ctx.closePath();


    for (const anchor of this.anchors) {
      this.ctx.beginPath();
      this.ctx.arc(anchor.x, anchor.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.closePath();
    }
    this.slider.affichage();
    requestAnimationFrame(this.draw.bind(this));
  }
  map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
};

window.onload = function() {
  new App();
}
