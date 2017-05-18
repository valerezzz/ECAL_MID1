var App = function() {
  console.log("app is running");
  this.canvas = document.getElementsByTagName("canvas")[0];
  // document.body.style.background = "black";
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w;
  this.canvas.height = this.h;
  this.ctx = this.canvas.getContext("2d");

  this.groundPool = [];
  this.objectPool = [];

  this.visibleGround = [];
  this.visibleObject = [];

  this.limit = 300;

  this.setup();
};

App.prototype = {

  setup : function() {

    // préparation des sols
    for (var i = 0; i < 10; i++) {
      var floor = new Shape(0, 0, {"w" : 200, "h" : 10}, this.ctx, "rect");
      this.groundPool.push(floor);
    }
    // préparation des objects
    for (var i = 0; i < 40; i++) {
      var floor = new Shape(0, 0, {"w" : 20, "h" : 20}, this.ctx, "circle");
      this.objectPool.push(floor);
    }

    // prepare un sol par defaut
    var defaultFloor = this.groundPool.shift();
    defaultFloor.y = this.h / 2;
    this.visibleGround.push(defaultFloor);

    var defaultFloor3 = this.groundPool.shift();
    defaultFloor3.x = defaultFloor3.size.w;
    defaultFloor3.y = this.h / 2;
    this.visibleGround.push(defaultFloor3);

    var defaultFloor2 = this.groundPool.shift();
    defaultFloor2.x = -defaultFloor2.size.w;
    defaultFloor2.y = this.h / 2;
    this.visibleGround.push(defaultFloor2);

    this.draw();

    setInterval(this.createNewObj.bind(this), 3000);
  },

  draw : function() {
    this.ctx.clearRect(0, 0, this.w, this.h);

    for (var i = this.visibleGround.length - 1; i >= 0; i--) {
      if (this.visibleGround[i].x > this.limit) {
        var sliced = this.visibleGround.splice(i, 1);
        this.groundPool.push(sliced[0]);
        var test = this.groundPool.shift();
        var index = this.visibleGround.length - 1;
        test.x = this.visibleGround[index].x - test.size.w;
        test.y = this.h / 2;
        this.visibleGround.push(test);
      } else {
        this.visibleGround[i].update();
        this.visibleGround[i].draw();
      }
    }

    // pour les object
    for (var i = this.visibleObject.length - 1; i >= 0; i--) {
      this.visibleObject[i].update();
      this.visibleObject[i].draw();
    }

    // draw limit
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.rect(this.limit, 0, 1, this.h);
    this.ctx.fill();
    this.ctx.closePath()

    requestAnimationFrame(this.draw.bind(this));
  },

  createNewObj : function() {
    console.log("CREATE NEW OBJ");
    var obj = this.objectPool.shift();
    obj.y = this.h / 2;
    this.visibleObject.push(obj);
  }

};

window.addEventListener("DOMContentLoaded", function(e) { new App(); });
