/**
 *  GRILLE DE PRESENTATION de 3 X 3
 *  IMPLICANT 3 TYPE DE CANVAS DIFFERENTS:
 *  1. CANVAS VANILLA (PUR JS)
 *  2. CANVAS P5
 *  3. CANVAS PAPERJS (LIBRAIRIE "VECTORIELLE")
 *
 *  CHAQUE CANVAS EST INDEPENDANT, ET LE CODE POUR CHACUN EST ENCAPSULE DANS UNE CLASS
 *
 *  UNE CLASSE MAITRESSE CONTROLE LA STRUCTURE GLOBALE:
 *  1. GRID.JS
 */

class App {
  constructor() {
    // on initialise la grille de 3 x 3
    this.grid = new Grid();

    // on recupère le calque HTML  pour la case 1
    const layer1 = this.grid.cases[0];
    // on cré un canvas Vanilla qu'on associe au calque 1
    this.canvas_1 = new CanvasVanilla(layer1);

    // on recupère le calque HTML  pour la case 2
    const layer2 = this.grid.cases[1];
    // on cré un canvas P5 qu'on associe au calque 2
    this.canvas_2 = new CanvasP5(layer2);

    // on recupère le calque HTML  pour la case 3
    const layer3 = this.grid.cases[2];
    // on cré un canvas Paper qu'on associe au calque3
    this.canvas_3 = new CanvasPaper(layer3);

    // on récupère le calque HTML pour la case 4
    const layer4 = this.grid.cases[3];
    this.canvas_4 = new Feather(layer4);

    // on récupère le calque HTML pour la case 5
    const layer5 = this.grid.cases[4];
    this.canvas_5 = new Key(layer5);

    // on récupère le calque HTML pour la case 5
    const layer6 = this.grid.cases[5];
    this.canvas_6 = new Signature(layer6);

    /**
     *  on pourra ainsi créer 9 canvas de type variable de la même manière, avec à chaque fois un nom different.
     *
     */

    //on lance un setup (ou il ne se passe pas grand chose)
    this.setup();
  }

  setup() {
    // on lance le draw
    this.draw();
  }

  draw() {
    this.canvas_1.update();
    this.canvas_1.draw();

    this.canvas_2.update();
    this.canvas_2.draw();

    this.canvas_3.update();
    this.canvas_3.draw();

    this.canvas_4.update();
    this.canvas_4.draw();

    this.canvas_5.update();
    this.canvas_5.draw();

    this.canvas_6.update();
    this.canvas_6.draw();

    // pour tout nouveau canvas créé, qu'il soit vanilla, p5 ou paper, il s'agira systématiquement d'activer ces 2 fonctions, update et draw.
    /**
     *  ex:
     *  this.canvas_4.update();
     *  this.canvas_4.draw();
     *
     */

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
