export default class StopMotion {
  constructor(folder, max) {
    this.folder = folder;
    this.max = max;
    this.allImages = [];
    this.ready = false;
    this.loadAllImages(max - 1);
    this.fps = 3;
    this.counter = 0;
  }

  get image() {
    return this.allImages[0];
  }

  loadAllImages(i) {
    const img = new Image();
    const leadingNumber = i < 10 ? "0" + i : i;
    // console.log(leadingNumber);
    const url = this.folder + "/" + "walker_00" + leadingNumber + ".jpg";
    // console.log(url);
    img.onload = () => {
      this.allImages.push(img);
      i--;
      if (i > 0) {
        this.loadAllImages(i);
      } else {
        console.log("finito", this.allImages);
        this.ready = true;
      }
    };
    img.src = url;
    // const url = `${this.folder}/walker_00${leadingNumber}.jpg`;
    // i++
    // this.loadAllImages(i);
  }

  drawFrame(ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    // ctx.scale(0.6, 0.6);
    ctx.drawImage(this.allImages[0], 0, 0);
    ctx.restore();
    if (this.counter % this.fps == 0) {
      const shift = this.allImages.shift();
      this.allImages.push(shift);
    }
    this.counter++;
  }

  // get image() {
  //   this.counter++;
  //   if (this.counter % this.fps == 0) {
  //     const shift = this.allImages.shift();
  //     this.allImages.push(shift);
  //   }
  //   return this.allImages[0];
  // }
}
