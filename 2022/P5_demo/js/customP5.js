class P5 {
  constructor() {
    this.canvas;
    this.context;
    this.hasStroke = true;
    this.isFilled = true;
    this.ratio = window.devicePixelRatio || 1;

    window.onload = () => {
      console.log(window, draw, setup);
      setup();
      setInterval(draw, 1000 / 60);
    };
  }

  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.pixelRatio = document.body.appendChild(this.canvas);
    this.canvas.width = width * this.ratio;
    this.canvas.height = height * this.ratio;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.context = this.canvas.getContext("2d");
  }

  background(_r, _g = null, _b = null) {
    let r = _r || 0;
    let g = _g || r;
    let b = _b || g;
    let color = `rgb(${r},${g},${b})`;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ellipse(x, y, width, height) {
    this.context.fillStyle = "white";
    this.context.lineWidth = this.ratio;
    this.context.beginPath();
    this.context.ellipse(
      x * this.ratio,
      y * this.ratio,
      (width / 2) * this.ratio,
      (height / 2) * this.ratio,
      0,
      Math.PI * 2,
      false
    );
    if (this.isFilled) this.context.fill();
    if (this.hasStroke) this.context.stroke();
    this.context.closePath();
  }

  noStroke() {
    this.hasStroke = false;
  }

  noFill() {
    this.isFilled = false;
  }
}
