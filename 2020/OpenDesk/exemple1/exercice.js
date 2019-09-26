// const name = 'gael';
// console.log(name);

// [0,         1,        2       ]
// ['canvas1','canvas2','canvas3']

const touslescanvas = document.getElementsByTagName('canvas');


const canvasActif = touslescanvas[0];
const context = canvasActif.getContext('2d');


canvasActif.width = window.innerWidth;
canvasActif.height = window.innerHeight;

let y = 0;
const hauteurDuRect = window.innerHeight / 4;
let vitesse = 5;
function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = 'blue';
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  context.beginPath();
  context.strokeStyle = 'yellow';
  context.lineWidth = 50;
  context.fillStyle = 'red';
  context.rect(0, y, window.innerWidth, hauteurDuRect);
  context.fill();
  context.stroke();

  context.closePath();



  if (y + hauteurDuRect >= window.innerHeight) {
    y = window.innerHeight - hauteurDuRect - 1;
    vitesse = vitesse * -1;
  } else if (y < 0) {
    y = 0;
    vitesse = vitesse * -1;
  } else {
    y = y + vitesse;
  }

  requestAnimationFrame(draw);
}

draw();
