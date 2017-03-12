var App = function() {
<<<<<<< HEAD
    console.log("app is running");
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w * window.devicePixelRatio;
    this.canvas.height = this.h * window.devicePixelRatio;
    this.ctx = this.canvas.getContext("2d");
    this.tool = null;
    this.isMic = false;
    this.setup();

=======
  console.log("app is running");
  this.canvas = document.getElementsByTagName("canvas")[0];
  // document.body.style.background = "black";
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w;
  this.canvas.height = this.h;
  this.ctx = this.canvas.getContext("2d");
  this.tool = null;
  this.isMic = false;
  this.setup();
  this.start();
>>>>>>> master
};

App.prototype = {

<<<<<<< HEAD
    setup : function() {
        document.addEventListener("keydown", this.onKeyDown.bind(this));

        // DEMOS
        // this.barDemo = new BarsDemo(this.ctx, this.w, this.h);
        // this.circleDemo = new CircleBars(this.ctx, this.w, this.h);
        // this.circleDemo.rotation = true;
        // this.letterDemo = new LetterDemo(this.canvas, this.w, this.h);
        // this.rasterDemo = new RasterDemo(this.canvas, this.w, this.h);
        // this.beatDemo = new BeatDemo(this.ctx, this.w, this.h);
        // this.verletDemo = new VerletDemo(this.canvas, this.w, this.h);
        // this.firstDemo = new FirstDemo(this.ctx, this.w, this.h);
        // this.lineDemo = new LineDemo(this.ctx, this.w, this.h);
        // this.imageDemo = new ImageDemo(this.ctx, this.w, this.h);
        // this.imageDemo2 = new ImageDemo2(this.ctx, this.w, this.h);
        // this.squareDemo = new SquareDemo(this.ctx, this.w, this.h);
        // this.mirrorDemo = new MirrorDemo(this.ctx, this.w, this.h);
        // this.handDemo = new HandDemo(this.ctx, this.w, this.h);
        // this.beardDemo = new BeardDemo(this.ctx, this.w, this.h);
        this.slitDemo = new SlitDemo(this.ctx, this.w, this.h);

        this.draw();
    },

    // start : function() { this.draw(); },
=======
  setup : function() {
    // this.SPACING = 2;
    // this.BAR_WIDTH = 1;
    // this.numBars = Math.round(this.w / this.SPACING);
    // this.multiplier = 4;
    addEventListener("keydown", this.onKeyDown.bind(this));

    // DEMOS
    // this.barDemo = new BarsDemo(this.ctx, this.w, this.h);
    // this.circleDemo = new CircleBars(this.ctx, this.w, this.h);
    // this.circleDemo.rotation = true;
    // this.letterDemo = new LetterDemo(this.canvas, this.w, this.h);
    // this.rasterDemo = new RasterDemo(this.canvas, this.w, this.h);
    // this.beatDemo = new BeatDemo(this.ctx, this.w, this.h);
    // this.verletDemo = new VerletDemo(this.canvas, this.w, this.h);
    this.joyDivision = new JoyDivision(this.ctx, this.w, this.h);
  },

  start : function() { this.draw(); },
>>>>>>> master

    draw : function() {
        // clean canvas
        this.ctx.save();
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.ctx.clearRect(0, 0, this.w, this.h); // ----> paperjs doesn't need
        // draw stuff
        if (this.tool) {
            this.tool.updateFrequency();
            this.tool.updateWave();
            // this.barDemo.draw(this.tool.data);
            // this.circleDemo.draw(this.tool.data);
<<<<<<< Updated upstream
=======

<<<<<<< HEAD
>>>>>>> Stashed changes
            // this.letterDemo.draw(this.tool.dataWave);
            // this.rasterDemo.draw(this.tool.data);
            // this.beatDemo.draw(this.tool.data, this.tool.dataWave);
            // this.verletDemo.draw(this.tool.data);
            // this.firstDemo.draw(this.tool.data, this.tool.dataWave);
            // this.lineDemo.draw(this.tool.data, this.tool.dataWave);
            // this.imageDemo.draw(this.tool.data, this.tool.dataWave);
            // this.imageDemo2.draw(this.tool.data, this.tool.dataWave);
            // this.squareDemo.draw(this.tool.data, this.tool.dataWave);
            // this.mirrorDemo.draw(this.tool.data, this.tool.dataWave);
            // this.handDemo.draw(this.tool.data, this.tool.dataWave);
            // this.beardDemo.draw(this.tool.data, this.tool.dataWave);
            this.slitDemo.draw(this.tool.data, this.tool.dataWave);

        }

        this.ctx.restore();
        // refresh
        requestAnimationFrame(this.draw.bind(this));
    },

    onKeyDown : function(e) {
        var track = "audio/okastus.mp3";
        switch (e.keyCode) {
            case 32: // spacebar
            if (this.tool == null) {
                this.tool = new AudioTool(track);
                this.tool.toggle();
            } else {
                this.tool.reset();
                if (this.isMic) {
                  this.tool.update(track);
                  this.tool.toggle();
                  this.isMic = false;
                } else {
                  this.tool.update(null);
                  this.isMic = true;
                }
            }
            break;
=======
      // this.letterDemo.draw(this.tool.dataWave);
      // this.rasterDemo.draw(this.tool.data);
      // this.beatDemo.draw(this.tool.data, this.tool.dataWave);
      // this.verletDemo.draw(this.tool.data);
      this.joyDivision.draw(this.tool.data);
    }
    // refresh
    requestAnimationFrame(this.draw.bind(this));
  },

  onKeyDown : function(e) {
    var track = "audio/click.mp3";
    switch (e.keyCode) {
    case 32: // spacebar
      if (this.tool == null) {
        this.tool = new AudioTool(track);
        this.tool.toggle();
      } else {
        this.tool.reset();
        if (this.isMic) {
          this.tool.update(track);
          this.tool.toggle();
          this.isMic = false;
        } else {
          this.tool.update(null);
          this.isMic = true;
>>>>>>> master
        }
    }

};

window.addEventListener("DOMContentLoaded", function(e) { new App(); });
