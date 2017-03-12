var BarsDemo = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;
  this.SPACING = 2;
  this.BAR_WIDTH = 1;
  this.numBars = Math.round(this.w / this.SPACING);
  this.multiplier = 4;
};

BarsDemo.prototype = {

  draw : function(data) {
    var dataOffset = 50;
    var dataLength = data.length - dataOffset * 2;
    for (var i = 0, l = this.numBars; i < l; ++i) {
      var magnitude = data[Math.floor(i / l * data.length) + dataOffset] * this.multiplier;
      this.ctx.fillStyle =
          "hsl( " + Math.round((i * 360) / this.numBars) + ", 100%, 50%)";
      this.ctx.fillRect(i * this.SPACING, this.h, this.BAR_WIDTH, -magnitude);
    }
  }

};
