var MirrorDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    document.body.style.backgroundColor = "black";

    this.imageLoaded = false;
    this.image = new Image();
    this.image.addEventListener('load', (function() {
        this.imageLoaded = true;
    }).bind(this), false);
    this.image.src = "img/xavier3.jpg";

    this.ctx.fillStyle = "black";
}

MirrorDemo.prototype = {

    update: function() {

    },

    draw: function(data, dataWave) {
        if(this.imageLoaded) {
            this.ctx.save();

            this.ctx.translate(this.w / 2, this.h / 2);

            this.ctx.drawImage(this.image,
                               0,
                               0,
                               this.image.width,
                               this.image.height,
                               -this.image.width / 2,
                               -this.image.height / 2,
                               this.image.width,
                               this.image.height);

            this.ctx.scale(-1, 1);
            this.ctx.drawImage(this.image,
                               data[0] / 255 * 100 * 2,
                               0,
                               this.image.width / 2 - data[0] / 255 * 100,
                               this.image.height,
                               -this.image.width / 2,
                               -this.image.height / 2,
                               this.image.width / 2 - data[0] / 255 * 100,
                               this.image.height);

            this.ctx.restore();
        }
    }

}
