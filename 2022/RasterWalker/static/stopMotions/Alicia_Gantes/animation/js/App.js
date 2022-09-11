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
import StopMotion from "./StopMotion";

export default class App extends Playground {
  constructor() {
    super();
    this.SM = new StopMotion("run_clean", 31);
    this.draw();
  }

  draw() {
    if (this.SM.ready == true) {
      this.SM.drawFrame(this.ctx); // ctx dans playground
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}