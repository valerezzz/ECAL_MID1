import ParticleSystem from "./ParticleSystem2";

export default class Raster {
  constructor() {
    this.resolution = 3;
    this.angle = 0;
    this.scale = 2;
    this.PS = new ParticleSystem();
  }

  drawRaster(ctx, image) {
    const left = window.innerWidth / 2 - (image.width / 2) * this.scale - 200;
    const top = window.innerHeight / 2 - (image.height / 2) * this.scale;

    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, image.width, image.height).data;
    // effacer ici
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let y = 0; y < image.height; y += this.resolution) {
      for (let x = 0; x < image.width; x += this.resolution) {
        const index = (y * image.width + x) * 4;
        const rouge = data[index];
        const vert = data[index + 1];
        const bleu = data[index + 2];
        //backtick
        ctx.fillStyle = "white"; //`rgb(${rouge},${vert},${bleu})`;

        const luminance =
          (0.2126 * rouge + 0.7152 * vert + 0.0722 * bleu) / 255;
        if (luminance < 0.2) {
          const posx = x * this.scale + left;
          const posy = y * this.scale + top;
          this.PS.addParticle(posx, posy);
          // ctx.beginPath();
          // ctx.arc(
          //   posx,
          //   posy,
          //   // x * this.scale +
          //   //   Math.sin((this.angle + x * 6) * (Math.PI / 180)) * 20 +
          //   //   left,
          //   // y * this.scale +
          //   //   Math.sin((this.angle + x) * (Math.PI / 180)) * 20 +
          //   //   top,
          //   (this.resolution / 2) * this.scale,
          //   0,
          //   Math.PI * 2,
          //   false
          // );
          // ctx.fill();
          // ctx.closePath();
        }
      }
    }
    this.PS.update();
    this.angle += 1;
  }
}
