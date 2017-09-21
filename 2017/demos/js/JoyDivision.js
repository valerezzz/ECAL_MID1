var JoyDivision = function(ctx, w, h) {
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  this.image = document.getElementById("image");

  this.allPoints = [];

  this.ctx.filter = 'blur(10px)';
  this.ctx.drawImage(this.image, 0, 0);

  var counter = 0;
  for (var j = 0; j < this.image.height; j += 7) {
    this.allPoints.push([]);
    for (var i = 0; i < this.image.width; i += 3) {
      var p = this.ctx.getImageData(i, j, 1, 1).data;
      var grey = Math.round(p[0] * 0.3 + p[1] * 0.59 + p[2] * 0.11);

      this.allPoints[counter].push({"x" : i, "y" : j + grey / 5});
    }
    counter++;
  }

};

JoyDivision.prototype = {

  draw : function(data) {
    // this.ctx.save();
    this.ctx.filter = "none";
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "white";

    console.log(this.allPoints.length);
    for (var i = 58; i < this.allPoints.length - 60; i++) {
      var newPoint = null;
      var c = 0;
      this.ctx.beginPath();
      var basic = 0;
      for (var j = 0; j < this.allPoints[i].length; j++) {

        if (j == 0) {
          basic = this.allPoints[i][j].y;
          this.ctx.moveTo(this.allPoints[i][j].x, this.allPoints[i][j].y - 255);
        } else {
          // if (this.allPoints[i][j].y != newPoint) {
          this.ctx.lineTo(
              this.allPoints[i][j].x,
              ((this.allPoints[i][j].y != basic)
                   ? (this.allPoints[i][j].y - 255) - (data[c + 100] / 3)
                   : this.allPoints[i][j].y - 255));
          // newPoint = this.allPoints[i][j].y;
          //}
        }
        c++;
      }
      // end the square
      this.ctx.lineTo(this.allPoints[i][this.allPoints[i].length - 1].x,
                      this.h);
      this.ctx.lineTo(0, this.h);
      this.ctx.lineTo(this.allPoints[i][0].x, this.allPoints[i][0].y - 255);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
    }

  }
};
