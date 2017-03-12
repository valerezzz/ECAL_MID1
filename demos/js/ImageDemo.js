var ImageDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    this.res = 2;

    this.imageLoaded = false;
    this.image = new Image();
    this.image.addEventListener('load', (function() {
        this.imageLoaded = true;
    }).bind(this), false);
    this.image.src = "img/xavier-veilhan.png";
}

ImageDemo.prototype = {

    update: function() {

    },

    draw: function(data, dataWave) {
        if(this.imageLoaded) {
            this.ctx.save();

            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.w, this.h);

            this.ctx.translate(this.w / 2, this.h / 2);

            var inc = 0;
            for(var i = 0, l = data.length - 200; i < l; i += this.res) {
                if(inc++ % 2 == 0) {
                    this.ctx.drawImage(this.image,                                          // image source
                                       this.image.width / l * i,                            // position X dans l'image source
                                       0,                                                   // position Y dans l'image source
                                       this.image.width / l * this.res,                     // largeur X dans l'image source
                                       this.image.height,                                   // hauteur Y dans l'image source
                                       this.image.width / l * i - this.image.width / 2,     // position X dans le canvas
                                       (data[i] / 255 - 0.5) * 100 + 50 - this.image.height / 2, // position Y (avec décalage) dans le canvas
                                       this.image.width / l * this.res,                     // largeur X dans l'image source
                                       this.image.height);                                  // largeur Y dans l'image source
                } else {
                    this.ctx.drawImage(this.image,
                                       this.image.width / l * i,
                                       0,
                                       this.image.width / l * this.res,
                                       this.image.height,
                                       this.image.width / l * i - this.image.width / 2,
                                       -(data[i] / 255 - 0.5) * 100 - 50 - this.image.height / 2,
                                       this.image.width / l * this.res,
                                       this.image.height);
                }
            }

            this.ctx.restore();
        }
    }

}
