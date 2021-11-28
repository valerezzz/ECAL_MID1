/**
 * PHYLOTAXIS EXAMPLE
 */
const PHI = 137.5;
const MAX_POINT = 2000;

let inc = 0;
let c = 10;

let pulsation = 0;
const balls = [];

let synth;
let synth2;
let pingpong;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  background(0);

  /**
   * PREPARATION DES ELLIPSE
   */
  for (let i = 0; i < MAX_POINT; i++) {
    balls.push(new Ball(0, 0));
  }

  // SOUND LIB
  pingPong = new Tone.PingPongDelay("5n", 0.6).toDestination();
  synth = new Tone.PluckSynth().connect(pingPong);
  synth2 = new Tone.Synth().connect(pingPong);
}

function draw() {
  background(0);

  /**
   * PHYLOTAXIS ALGORITHM
   */
  // let angle = inc * PHI;
  // let radius = c * sqrt(inc);
  //
  // //POSITION DANS L'ESPACE
  // const x = cos((angle * PI) / 180) * radius + width / 2;
  // const y = sin((angle * PI) / 180) * radius + height / 2;
  //
  // fill(inc % 255, 50, 200);
  // ellipse(x, y, 10);
  // if (inc < MAX_POINT) inc++;
  balls.forEach((item, index) => {
    let angle = index * PHI * cos(pulsation * (PI / 180));
    let radius = c * sqrt(index);
    item.update(angle, radius);
    item.draw();
  });
  pulsation += 0.01;
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
  }

  update(angle, radius) {
    this.x = cos((angle * PI) / 180) * radius + width / 2;
    this.y = sin((angle * PI) / 180) * radius + height / 2;
    this.angle = angle;
    this.dist = radius;
    //-->check dist with mouse
    const _dist = dist(mouseX, mouseY, this.x, this.y);
    if (_dist < 7) {
      // synth.triggerAttackRelease(Math.max(0, (this.angle % 255) + 200), "8n");
      synth2.triggerAttackRelease(Math.max(0, (this.angle % 255) + 200), "8n");

      this.radius += 2;
    } else {
      this.radius = 10;
    }
  }

  draw() {
    fill(this.angle % 255, 50, 200);
    ellipse(this.x, this.y, this.radius / (1 / (this.dist * 0.005)));
  }
}
