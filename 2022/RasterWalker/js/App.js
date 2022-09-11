/**
CREATIVE CODING
---
Kill server : CTRL + C
Start server : npm run start
Start secure server : npm run start-https
Final build : npm run build
---
To generate new certificate for https connection with external device run :
#sh
mkcert 0.0.0.0 localhost 127.0.0.1 yourLocalIP ::1
mv 0.0.0.0+4-key.pem certificate.key
mv 0.0.0.0+4.pem certificate.cert
**/

import Playground from "@onemorestudio/playgroundjs";
import Raster from "./Raster2";
import StopMotion from "./StopMotion";

export default class App extends Playground {
  constructor() {
    super();
    this.SM = new StopMotion("images2", 17);
    this.RST = new Raster();

    document.getElementsByTagName("canvas")[0].style.display = "none";
    document.addEventListener("mousemove", this.onMove.bind(this));
    document.addEventListener("mousedown", this.onPress.bind(this));
    document.addEventListener("mouseup", this.onRelease.bind(this));

    // // image
    // this.img = new Image();
    // this.imageIsReady = false;
    // this.img.onload = () => {
    //   this.imageIsReady = true;
    // };
    // this.img.src = "singleImage/andy.jpg";
    // // this.RST = new Raster();
    this.draw();
  }

  onMove(e) {
    this.RST.PS.move(e.pageX, e.pageY);
  }

  onPress(e) {
    this.RST.PS.press(e.pageX, e.pageY);
  }
  onRelease(e) {
    this.RST.PS.release(e.pageX, e.pageY);
  }

  draw() {
    if (this.SM.ready == true) {
      this.SM.drawFrame(this.ctx);
    }
    const imageStopMotion = this.SM.image;
    if (imageStopMotion) {
      this.RST.drawRaster(this.ctx, imageStopMotion);
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}
