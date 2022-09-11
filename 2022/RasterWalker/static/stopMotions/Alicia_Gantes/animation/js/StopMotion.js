export default class StopMotion {
    constructor(folder, max) {
        this.folder = folder;
        this.max = max;
        console.log("stop motion")

        this.ready = false;
        this.allImages = [];
        this.loadAllIamges(0); // 0 //nom de la dernière image
        this.speed = 4;
        this.counter = 0;
    } // constructor
    // ---------------------------------------------------------------
    loadAllIamges(i) {
        const img = new Image();
        // pour que ca commence a 0 au lieu de 1 et que sa trouve l'image
        // if (i < 10) { leadingNumber = "0" + i;
        // } else { leadingNumber = i;}

        const leadingNumber = (i < 10) ? "0" + i : i;
        // ? if     // : else
        const url = this.folder + "/" + "run_" + leadingNumber + ".jpg";
        //const url = `${this.folder}/walker_00${leadingNumber}.jpg`
        // ---------------------------------------------------------------
        img.onload = () => {
            this.allImages.push(img);
            i++
            //i--;
            //if (i > 0) {
            console.log(i)
            if (i < this.max) {
                this.loadAllIamges(i);
            } else {
                console.log("finito", this.allImages);
                this.ready = true;
            }
        }; // onload img
        // ---------------------------------------------------------------
        // Toutes les images sont stokées dans allImages
        img.src = url;
        console.log(i)
    } // loadAllIamges
    // ---------------------------------------------------------------
    drawFrame(ctx) {
        console.log("draw")
        ctx.drawImage(this.allImages[0], 0, 0);
        if (this.counter % this.speed == 0) {
            // creer une boucle infini
            const shift = this.allImages.shift();
            this.allImages.push(shift);
        }
        this.counter++
    } // drawFrame
    // ---------------------------------------------------------------
} // class StopMotion