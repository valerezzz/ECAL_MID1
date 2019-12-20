class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.setup();
  }

  dist(a, b) {
    return (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  }

  setup() {
    this.initListeners();

    this.arranged = [];
    this.items = [];
    const locations = [];
    perlin.seed();
    for (let i = 0; i < 5000; i++) {
      const x = (i % 50);
      const y = Math.floor(i / 50);

      const v = perlin.get(x / 5, y / 5);
      // console.log(x, y, v);
      this.items.push(
          {x: (v * 50 + x * 20) / 1050, y: (v * 50 + y * 20) / 1050, id: i});
    }
    // let i = 0;
    // // for (let j = 0; j < 100; j++) {
    // perlin.seed();
    // for (let y = 0; y < 500; y += 5) {
    //   for (let x = 0; x < 500; x += 5) {
    //     // const v = perlin.get(x, y);
    //     const v = 1;
    //     this.items.push({x: v * x, y: v * y, id: i});
    //     i++;
    //   }
    // }
    // }

    console.log(this.items.length);

    // items.sort(function(a, b) {
    //   // sort by x, secondary by y
    //   return a.x == b.x ? a.y - b.y : a.x - b.x;
    // });


    this.final = [this.items[0]];
    this.items.splice(0, 1);
    // for (let item of items) {
    //   let d = 1000000000000;
    //   let next = null;
    //   for (let i = 0; i < items.length; i++) {
    //     const dist = this.dist(items[i], item);
    //     if (dist < d) {
    //       d = dist;
    //       next = {'item': items[i], 'id': i};
    //     }
    //   }
    //   final.push(next.item);
    //   items.splice(next.id, 1);
    // }
    // console.log(final.length);



    this.copy = JSON.parse(JSON.stringify(this.items));
    console.log(this.copy);

    for (let i = 0; i < this.items.length; i++) {
      // check if was already added
      if (typeof (this.items[i].wasAdded) == 'undefined') {
        this.arranged.push(this.items[i]);
        this.items[i].wasAdded = 'true';

        for (let j = i + 1; j < this.items.length; j++) {
          if (this.items[i].y > this.items[j].y &&
              typeof (this.items[j].wasAdded) == 'undefined') {
            this.arranged.push(this.items[j]);
            this.items[j].wasAdded = 'true';
          }
        }
      }
    }
    console.log(this.arranged);

    this.checkNext();

    // this.draw();
  }

  checkNext() {
    const origin = this.final[this.final.length - 1];
    // check distance
    let d = 1000000000000;
    let next = null;
    for (let i = 0; i < this.items.length; i++) {
      const dist = this.dist(this.items[i], origin);
      if (dist < d && this.items[i].id != origin.id) {
        d = dist;
        next = {'item': this.items[i], 'id': i};
      }
    }
    this.final.push(next.item);
    this.items.splice(next.id, 1);
    if (this.final.length < this.copy.length) {
      this.checkNext();
    } else {
      console.log('should draw', this.final);
      // this.draw();
      // save datas
      const jsonData = JSON.stringify(this.final);

      function download(content, fileName, contentType) {
        var a = document.createElement('a');
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }
      download(jsonData, 'points.json', 'text/plain');
    }
  }

  initListeners() {
    this.onMouseMoveHandler = this.mousemove.bind(this);
    this.onMouseClickHandler = this.mouseclick.bind(this);
    document.body.addEventListener('mousemove', this.onMouseMoveHandler);
    document.body.addEventListener('click', this.onMouseClickHandler);
  }

  mousemove(e) {
    // console.log(e.x);
    // const factorX = map(e.x, 0, window.innerWidth, 4, 20);
    // const factorY = map(e.y, 0, window.innerHeight, 10, 400);
  }
  mouseclick(e) {}
  draw() {
    /*
    before visible
    */
    this.ctx.clearRect(0, 0, this.w, this.h);
    /*
      code here
    */

    // this.ctx.save();
    // this.ctx.translate(100, 100);

    for (let i = 0; i < this.final.length; i++) {
      this.ctx.fillStyle = 'rgb(0,' + (255 - (i * 0.4)) + ',0)';
      this.ctx.beginPath();
      this.ctx.arc(
          this.final[i].x * window.innerWidth,
          this.final[i].y * window.innerHeight, 15, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.closePath();
    }
    for (let i = 0; i < this.final.length; i++) {
      this.ctx.fillStyle = 'rgb(255,0,0)';
      this.ctx.fillText(i, this.final[i].x, this.final[i].y + 50);
    }

    // this.ctx.save();
    // this.ctx.translate(500, 0);
    //
    // for (let i = 0; i < this.arranged.length; i++) {
    //   this.ctx.fillStyle = 'rgb(' + (255 - (i * 50)) + ',0,0)';
    //   this.ctx.beginPath();
    //   this.ctx.arc(
    //       this.arranged[i].x, this.arranged[i].y, 15, 0, Math.PI * 2, false);
    //   this.ctx.fill();
    //   this.ctx.closePath();
    //   this.ctx.fillText(i, this.arranged[i].x, this.arranged[i].y + 50);
    // }
    // this.ctx.restore();
    // this.ctx.restore();

    // requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function() {
  new App();
}
