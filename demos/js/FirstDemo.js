var FirstDemo = function(ctx, w, h) {
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  this.radius = 200;

  setInterval(this.changeData.bind(this), 5000);
  this.isDATA = true;
};

FirstDemo.prototype = {

  draw : function(data, dataWave) {

    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    var centreX = this.w / 2;
    var centreY = this.h / 2;
    var angle = 360 / 360;
    var counter = 0;
    for (var i = 0; i < 360; i += angle) {

      var v = (this.isDATA) ? data[counter] * 3 : dataWave[counter] * 3;

      this.radius = v;
      var x = centreX + Math.cos(i * Math.PI / 180) * this.radius;
      var y = centreY + Math.sin(i * Math.PI / 180) * this.radius;
      if (i == 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      counter++;
    }
    this.ctx.closePath();
    this.ctx.fill();

  },

  changeData : function() {
    console.log("changeDATA");
    this.isDATA = !this.isDATA;
  }

};
