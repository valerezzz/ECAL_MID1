var App = function() {
  console.log("app is running");
  this.canvas = document.getElementsByTagName("canvas")[0];
  // document.body.style.background = "black";
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.canvas.width = this.w;
  this.canvas.height = this.h;
  this.ctx = this.canvas.getContext("2d");
};

App.prototype = {

  setup : function() {},

  draw : function() {}

}

                window.addEventListener("DOMContentLoaded",
                                        function(e) { new App(); });
