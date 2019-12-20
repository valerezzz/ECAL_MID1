// DRAWING
let canvas = document.getElementById('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let image = document.getElementById('andy');
let offsetX;

function setup() {
  offsetX = window.innerWidth / 2 - (image.width * 2) / 2;

  draw();
}

function draw() {
  ctx.drawImage(image, 0, 0);
  let data = ctx.getImageData(0, 0, image.width, image.height).data;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let j = 0; j < image.height; j += 6) {
    for (let i = 0; i < image.width; i += 6) {
      let index = 4 * (j * image.width + i);
      let r = data[index];
      let g = data[index + 1];
      let b = data[index + 2];
      let a = data[index + 3];
      // https://en.wikipedia.org/wiki/Luma_(video)
      let grey = Math.round(r * 0.3 + g * 0.59 + b * 0.11);
      if (grey > 50) {
        let radius = Math.round((grey / 255) * 6) + Math.random() * 3;
        // ctx.fillStyle = "rgba("+r+","+g+","+b+",0.5)";
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.beginPath();
        // ctx.rect(i,j,2,2);
        ctx.arc(offsetX + i * 2, j * 2, radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      }
    }
  }


  requestAnimationFrame(draw);
}


setTimeout(setup, 1000);  // to make sure image is available
