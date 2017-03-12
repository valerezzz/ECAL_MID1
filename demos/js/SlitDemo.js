var SlitDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    document.body.style.backgroundColor = "black";

    this.horizontal = false;

    this.totalV = 0;
    this.max    = 0;

    this.slits    = [];
    this.shuffled = [];
    this.res      = 1024;
    this.image = new Image();
    this.image.onload = (function() {
        this.imageLoaded = true;
        if(this.horizontal && this.res > this.image.height) this.res = this.image.height;
        if(!this.horizontal && this.res > this.image.width) this.res = this.image.width;

        for(var i = 0; i < this.res; i++) {
            if(this.horizontal) {
                this.slits.push(new Slit(this.image.height / this.res * i,
                                         this.image.height / this.res,
                                         this.w > this.image.width ? this.image.width : this.w,
                                         true));
            } else {
                this.slits.push(new Slit(this.image.width / this.res * i,
                                         this.image.width / this.res,
                                         this.h > this.image.height ? this.image.height : this.h,
                                         false));
            }
            this.shuffled.push(this.slits[i]);
        }
        // this.shuffled.shuffle();
    }).bind(this);
    this.image.src = "img/xavier2.jpg";

    this.framecount = 0;
}

SlitDemo.prototype = {

    draw: function(data, dataWave) {
        if(this.imageLoaded && this.framecount % 1 == 0) {
            var dataOffset = 50;
            var dataLength = data.length - dataOffset * 2;
            var total = 0;
            this.max  = 0;
            for(var i = 0, l = this.shuffled.length; i < l; i++) {
                var index = Math.floor(i / l * dataLength) + dataOffset;
                if(l < dataLength) {
                    var med = 0;
                    for(var j = index; j < index + Math.floor(dataLength / l); j++) {
                        med += data[j];
                    }
                    med /= Math.floor(dataLength / l);
                } else {
                    med = data[index];
                }
                // if(med > this.max) this.max = med;
                total += med;
                this.max = total;
            }
            var val = 0, v = 0, toExclude = [], toExcludeFromTotal = 0, toExcludeFromVal = 0;
            if(!isNaN(total) && total != 0) {
                this.totalV = 0
                for(var i = 0, l = this.shuffled.length; i < l; i++) {
                    var index = Math.floor(i / l * dataLength) + dataOffset;
                    if(l < dataLength) {
                        var med = 0;
                        for(var j = index; j < index + Math.floor(dataLength / l); j++) {
                            med += data[j];
                        }
                        med /= Math.floor(dataLength / l);
                    } else {
                        med = data[index];
                    }
                    if(this.horizontal) {
                        v = med / this.max * this.image.height;
                    } else {
                        v = med / this.max * this.image.width;
                    }
                    if(v < 1) {
                        toExclude.push(index);
                        // toExcludeFromTotal += data[index];
                        // toExcludeFromVal++;
                    }
                }
                for(var i = 0, l = this.shuffled.length; i < l; i++) {
                    var index = Math.floor(i / l * dataLength) + dataOffset;
                    if(l < dataLength) {
                        var med = 0;
                        for(var j = index; j < index + Math.floor(dataLength / l); j++) {
                            med += data[j];
                        }
                        med /= Math.floor(dataLength / l);
                    } else {
                        med = data[index];
                    }
                    if(toExclude.indexOf(index) != -1) {
                        v = 1;
                    } else {
                        if(this.horizontal) {
                            v = med / (this.max - toExcludeFromTotal) * (this.image.height - toExcludeFromVal);
                            if(v > this.image.height / l * 10) v = this.image.height / l * 10;
                        } else {
                            v = med / (this.max - toExcludeFromTotal) * (this.image.width - toExcludeFromVal);
                            if(v > this.image.width / l * 10) v = this.image.width / l * 10;
                        }
                    }
                    this.shuffled[i].update(v);
                    // if(i < l / 2) {
                        if(this.horizontal) {
                            this.totalV += this.shuffled[i].h;
                        } else {
                            this.totalV += this.shuffled[i].w;
                        }
                    // }
                }
            }

            // this.totalV *= 2;

            this.ctx.save();

            if(this.horizontal) {
                if(this.totalV == 0) this.totalV = this.image.height;
                this.ctx.translate(this.w / 2 - this.slits[0].w / 2, this.h / 2 - this.totalV / 2);
            } else {
                if(this.totalV == 0) this.totalV = this.image.width;
                this.ctx.translate(this.w / 2 - this.totalV / 2, this.h / 2 - this.slits[0].h / 2);
            }

            var v = 0;
            for(var i = 0, l = this.slits.length; i < l; i++) {
                if(this.horizontal) {
                    this.ctx.drawImage(this.image,
                                       0,
                                       Math.floor(this.image.height / l * i),
                                       this.image.width,
                                       Math.floor(this.image.height / l),
                                       this.slits[i].x,
                                       v,
                                       this.slits[i].w,
                                       this.slits[i].h + 1);
                    v += this.slits[i].h;
                } else {
                    this.ctx.drawImage(this.image,
                                       Math.floor(this.image.width / l * i),
                                       0,
                                       Math.floor(this.image.width / l),
                                       this.image.height,
                                       v,
                                       this.slits[i].y,
                                       this.slits[i].w + 1,
                                       this.slits[i].h);
                    v += this.slits[i].w;
                }
            }

            this.ctx.restore();
        }

        this.framecount++;
    }

}

var Slit = function(val1, val2, val3, horizontal) {
    if(horizontal) {
        this.x    = 0;
        this.y    = val1;
        this.w    = val3;
        this.h    = val2;
    } else {
        this.x    = val1;
        this.y    = 0;
        this.w    = val2;
        this.h    = val3;
    }
    this.horizontal = horizontal;
}

Slit.prototype = {

    update: function(val) {
        if(!isNaN(val)) {
            if(this.horizontal) {
                this.h = val;
            } else {
                this.w = val;
            }
        }
    }

}

Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
}
