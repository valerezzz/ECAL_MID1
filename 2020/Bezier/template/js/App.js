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
    const a1 = {x: 50, y: 300};
    const a2 = {x: 750, y: 300};
    const c1 = {x: 400, y: 100};
    const c2 = {x: 400, y: 500};
    this.anchors = [a1, a2, c1, c2];

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
      if (dist <= this.radius ** 2) {
        anchor.isMoving = true;
      }
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
  }
  onMouseUp(e) {
    document.removeEventListener('mousemove', this.moveHandler);
    for (const anchor of this.anchors) {
      anchor.isMoving = false;
    }
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
    // draw CURVE
    this.ctx.beginPath();
    this.ctx.moveTo(this.anchors[0].x, this.anchors[0].y);
    for (let i = 0; i <= 1; i += (1 / 100)) {
      const {x, y} = this.bz.getPosition(i);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineTo(this.anchors[1].x, this.anchors[1].y);
    this.ctx.stroke();
    this.ctx.closePath();



    this.ctx.beginPath();
    this.ctx.moveTo(this.anchors[0].x, this.anchors[0].y);
    for (let i = 0; i <= 1; i += (1 / 100)) {
      const {x, y} = this.bz.getPosition(i);
      this.ctx.lineTo(
          x + Math.cos(Math.PI / (3 * 2)) * this.thickness.x,
          y + Math.sin(Math.PI / (3 * 2)) * this.thickness.y);
    }
    this.ctx.lineTo(this.anchors[1].x, this.anchors[1].y);
    //
    // this.ctx.stroke();
    // this.ctx.fill();
    // this.ctx.closePath();
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.anchors[1].x, this.anchors[1].y);
    for (let i = 1; i > 0; i -= (1 / 100)) {
      const {x, y} = this.bz.getPosition(i);
      this.ctx.lineTo(
          x + Math.cos(-Math.PI / (3 * 2) + Math.PI) * this.thickness.x,
          y - Math.sin(-Math.PI / (3 * 2) + Math.PI) * this.thickness.y);
    }
    this.ctx.lineTo(this.anchors[0].x, this.anchors[0].y);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();



    for (const anchor of this.anchors) {
      this.ctx.beginPath();
      this.ctx.arc(anchor.x, anchor.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.closePath();
    }


    // const shifted = this.pool.shift();
    // this.visibleCercles.push(shifted);
    // for (let i = this.visibleCercles.length - 1; i > 0; i--) {
    //   const cercle = this.visibleCercles[i];
    //   cercle.timer += 1 / 500;
    //   const {x, y} = this.bz.getPosition(cercle.timer);
    //   cercle.move(x, y);
    //   cercle.affichage();
    //   if (cercle.timer >= 1) {
    //     cercle.timer = 0;
    //     this.pool.push(cercle);
    //     this.visibleCercles.splice(-1, 1);
    //   }
    // }


    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function() {
  new App();
}
