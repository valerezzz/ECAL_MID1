export default class Raster {
  constructor() {
    this.angle = 0;
  }

  drawRaster(ctx, image) {
    // detect top left
    const top = window.innerHeight / 2 - (image.height * 2) / 2;
    const left = window.innerWidth / 2 - (image.width * 2) / 2;

    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, image.width, image.height).data;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let j = 0; j < image.height; j += 5) {
      for (let i = 0; i < image.width; i += 5) {
        // analyse de chaque pixel
        const index = 4 * (j * image.width + i); //s * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillStyle = `rgb(255,150,0)`;
        //0-1
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        if (luminance < 0.9) {
          const radius = 4;
          ctx.beginPath();
          const x = left + i * 2; // + Math.cos(((this.angle + i * 3) * Math.PI) / 180) * 10;

          const y = top + j * 2; // + Math.sin(((this.angle + j * 2) * Math.PI) / 180) * 2;

          ctx.arc(x, y, radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    this.angle += 2;
  }
}
