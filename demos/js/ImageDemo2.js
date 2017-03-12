var ImageDemo2 = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    document.body.style.backgroundColor = "black";

    this.res = 30;

    this.valX = 500;
    this.valY = 150;

    this.imageLoaded = false;
    this.image = new Image();
    this.image.addEventListener('load', (function() {
        this.imageLoaded = true;
    }).bind(this), false);
    this.image.src = "img/xavier-veilhan-invert.png";

    this.ctx.fillStyle = "black";
}

ImageDemo2.prototype = {

    update: function() {

    },

    draw: function(data, dataWave) {
        if(this.imageLoaded) {
            this.ctx.save();

            this.ctx.translate(this.w / 2, this.h / 2);

            var inc = 0;
            for(var y = 0, l = data.length; y < l; y += this.res) {
                for(var x = 0, ll = dataWave.length; x < ll; x += this.res) {
                    this.ctx.drawImage(this.image,
                                       this.image.width / ll * x,
                                       this.image.height / l / 2 * y,
                                       this.image.width / ll * this.res,
                                       this.image.height / l / 2 * this.res,
                                       this.image.width / ll * x + (dataWave[x] / 255 - 0.5) * this.valX - this.image.width / 2,
                                       this.image.height / l / 2 * y + -(data[y] / 255 - 0.5) * this.valY - this.valY / 2 - this.image.height / 2,
                                       this.image.width / ll * this.res,
                                       this.image.height / l / 2 * this.res);
                    this.ctx.drawImage(this.image,
                                       this.image.width / ll * x,
                                       this.image.height / 2 + this.image.height / l / 2 * (l - y),
                                       this.image.width / ll * this.res,
                                       this.image.height / l / 2 * this.res,
                                       this.image.width / ll * x + (dataWave[x] / 255 - 0.5) * this.valX - this.image.width / 2,
                                       this.image.height / l / 2 * (l - y) + (data[y] / 255 - 0.5) * this.valY + this.valY / 2,
                                       this.image.width / ll * this.res,
                                       this.image.height / l / 2 * this.res);
                }
            }

            this.ctx.restore();
        }
    }

}
