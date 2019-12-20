const DIMENSION = {
    'width': 500,
    'height': 500,
};
const FOLDER = './jupe/';
const MAX = 12;
const DELAY = 4;

class StopMotion {
    constructor() {
        console.log('template ready');
        this.canvas = document.createElement('canvas');
        this.canvas.width = DIMENSION.width;
        this.canvas.height = DIMENSION.height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.counter = 0;
        this.frameCounter = 0;
        this.setup();
    }
    setup() {

        this.allImages = [];
        this.loadImage(1);
    }

    loadImage(chiffre) {

        let leadingZero = '';
        if (chiffre < 10) {
            leadingZero = '0' + chiffre;
        } else {
            leadingZero = chiffre;
        }
        const url = FOLDER + leadingZero + '.jpg';
        const image = new Image();
        image.src = url;
        this.allImages.push(image);

        if (this.allImages.length >= 12) {
            this.draw();
        } else {
            chiffre++;
            this.loadImage(chiffre);
        }



        console.log(url);
    }

    draw() {
        //this.ctx.clearRect(0, 0, this.w, this.h);
        if (this.frameCounter % DELAY == 0) {
            this.ctx.drawImage(this.allImages[this.counter], 0, 0, DIMENSION.width, DIMENSION.height);
            this.counter++;

            if (this.counter >= this.allImages.length) {
                this.counter = 0;

            }
            this.frameCounter = 0;

        }
        this.frameCounter++;

        requestAnimationFrame(this.draw.bind(this));
    }
};

window.onload = function () {
    new StopMotion();
}