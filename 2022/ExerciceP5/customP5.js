let canvas;
let context;
let hasStroke = true;
let isFilled = true;

function createCanvas(width, height) {
  canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext("2d");
}

function background(_r, _g, _b) {
  let r = _r;
  let g = _g || r;
  let b = _b || r;
  context.fillStyle = `rgb(${r},${g},${b})`;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function ellipse(x, y, width, height) {
  context.fillStyle = `white`;
  context.strokeStyle = `black`;
  context.beginPath();
  context.ellipse(x, y, width / 2, height / 2, 0, Math.PI * 2, false);
  if (isFilled == true) {
    context.fill();
  }
  if (hasStroke == true) {
    context.stroke();
  }

  context.closePath();
}

function noStroke() {
  hasStroke = false;
}

function noFill() {
  isFilled = false;
}

window.onload = function () {
  setup();
  setInterval(draw, 1000 / 60);
  // draw();
};
