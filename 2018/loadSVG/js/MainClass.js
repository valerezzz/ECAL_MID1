'use strict';

class MainClass {
  constructor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // A l'intérieur d'une classe JS, toutes les fonctions Paperjs sont
    // accessibles à travers l'instance globale "paper"
    paper.setup(canvas);
    paper.project.importSVG('res/triangle1.svg', this.svgLoaded.bind(this));


    // les addEventListener sont déjà gérés par PAPERJS.
    // il suffit simplement de les linker avec nos propres fonction
    // personnalisées.
    // ici je leur ai donné les noms habituels:
    // this.draw, this.onMouseDown, this.onMouseUp, this.onMouseMove
    // plus d'infos ici : http://paperjs.org/reference/mouseevent/
    paper.view.onFrame = this.draw;
    paper.view.onMouseDown = this.onMouseDown;
    paper.view.onMouseUp = this.onMouseUp
    paper.view.onMouseMove = this.onMouseMove;
  }

  svgLoaded(item, svg) {
    console.log('SVG IS LOADED');
    item.scale(0.1, item.bounds.topLeft);
    item.translate(this.w / 2, this.h / 2);
    item.style = {fillColor: 'red', strokeColor: 'black'};
    var copy = item.clone();
    copy.rotate(180);
  }

  onMouseDown(e) {
    console.log('mouse down');
  }
  onMouseUp(e) {
    console.log('mouse up');
  }
  onMouseMove(e) {
    console.log('mouse move');
  }

  draw(e) {
    // console.log('draw');
  }
};

// initialisation de l'app
new MainClass();
