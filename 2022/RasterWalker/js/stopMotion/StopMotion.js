export default class StopMotion {
  constructor(folder, max) {
    this.folder = folder;
    this.MAX = max;
    this.EXT = ".jpg";
    this.allImages = [];
    this.loadImage(0);
  }
  loadImage(i) {
    let img = new Image();
    img.onload = function (e) {
      this.allImages.push(img);
      if (this.allImages.length == this.MAX + 1) {
        this.ready = true;
        console.log("all images are loaded in memory", this.allImages);
      } else {
        i++;
        this.loadImage(i);
      }
    }.bind(this);
    let leadingZero = "";
    if (i < 10) {
      leadingZero = "0" + i;
    } else {
      leadingZero = i;
    }
    const url = this.folder + "walker_00" + leadingZero + this.EXT;
    img.src = url;
  }

  drawFrame(ctx) {
    ctx.drawImage(this.allImages[0], 0, 0);
    // swap
    const shift = this.allImages.shift();
    this.allImages.push(shift);
  }
}
