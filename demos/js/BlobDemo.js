var Test4 = function(canvas, w, h) {
  this.w = w;
  this.h = h;

  paper.setup(canvas);

  this.values = {
    paths: 50,
    minPoints: 5,
    maxPoints: 15,
    minRadius: 30,
    maxRadius: 100
  };

  this.paths = [];
  this.clonedPaths = [];
  this.createPaths();
}


Test4.prototype = {

  draw: function(data) {
    // paper.view.draw();
    for (var i = 0, l = this.paths.length; i < l; i++) {
      var interval = data.length / l;
      for (var j = 0, ll = this.paths[i].segments.length; j < ll; j++) {
        var frequence = Math.floor(interval * i + interval / ll * j);
        var offset = this.clonedPaths[i].getOffsetOf(this.clonedPaths[i].segments[j].point);
        var normal = this.clonedPaths[i].getNormalAt(offset);
        normal.x *= data[frequence] / 10;
        normal.y *= data[frequence] / 10;
        this.paths[i].segments[j].point.x = this.clonedPaths[i].segments[j].point.x + normal.x;
        this.paths[i].segments[j].point.y = this.clonedPaths[i].segments[j].point.y + normal.y;
      }
    }
  },

  createPaths: function() {
    var radiusDelta = this.values.maxRadius - this.values.minRadius;
    var pointsDelta = this.values.maxPoints - this.values.minPoints;
    for (var i = 0; i < this.values.paths; i++) {
      var radius = this.values.minRadius + Math.random() * radiusDelta;
      var points = this.values.minPoints + Math.floor(Math.random() * pointsDelta);
      var view = new paper.Point({
        x: paper.view.size.width * Math.random(),
        y: paper.view.size.height * Math.random()
      });
      var path = this.createBlob(view, radius, points);
      var lightness = (Math.random() - 0.5) * 0.4 + 0.4;
      var hue = Math.random() * 360;
      path.fillColor = {
        hue: hue,
        saturation: 1,
        lightness: lightness
      };
      this.paths.push(path);
      var clone = path.clone();
      clone.visible = false;
      this.clonedPaths.push(clone);
    }
  },

  createBlob: function(center, maxRadius, points) {
    var path = new paper.Path();
    path.closed = true;
    for (var i = 0; i < points; i++) {
      var delta = new paper.Point({
        length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
        angle: (360 / points) * i
      });
      var point = new paper.Point({
        x: center.x + delta.x,
        y: center.y + delta.y
      })
      path.add(point);
    }
    path.smooth();
    return path;
  }



}
