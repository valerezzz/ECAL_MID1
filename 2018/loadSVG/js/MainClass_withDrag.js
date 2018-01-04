'use strict';

let color = ['#EFB57B', '#F48F21', '#CE7720'];  // plus clair-> plus foncé
let x = 20 / 2;    // ecart en x de la grille /2 pour symétrie
let y = 11.6 / 2;  // ecart en y de la grille /2 pour symétrie
let pos = new paper.Point(x, y);



class MainClass {
  constructor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // Memoire de stockage de toutes les pièces
    // Il s'agit d'avoir un endroit ou l'on conserve les références des pièces
    // à déplacer
    // Pour l'exemple, j'ai créé ici 2 tableaux:
    // Un pour les pièces originales
    // L'autre pour les pièces symétriques (Copy)
    // Dans le mouseDrag, on déplacera ainsi chaque pièce selon un delta
    this.allPieces = [];
    this.allCopyPieces = [];

    // A l'intérieur d'une classe JS, toutes les fonctions Paperjs sont
    // accessibles à travers l'instance globale "paper"
    paper.setup(canvas);
    paper.project.importSVG('res/triangle1.svg', this.triangle1.bind(this));
    paper.project.importSVG('res/triangle2.svg', this.triangle2.bind(this));
    paper.project.importSVG('res/line1.svg', this.line1.bind(this));
    paper.project.importSVG('res/line2.svg', this.line2.bind(this));
    paper.project.importSVG('res/line3.svg', this.line3.bind(this));

    this.x = pos.x;
    this.y = pos.y;


    // les addEventListener sont déjà gérés par PAPERJS.
    // il suffit simplement de les linker avec nos propres fonction
    // personnalisées.
    // ici je leur ai donné les noms habituels:
    // this.draw, this.onMouseDown, this.onMouseUp, this.onMouseMove
    // plus d'infos ici : http://paperjs.org/reference/mouseevent/
    paper.view.onFrame = this.draw;
    paper.view.onMouseDown = this.onMouseDown.bind(this);
    paper.view.onMouseUp = this.onMouseUp.bind(this);
    paper.view.onMouseMove = this.onMouseMove.bind(this);
    paper.view.onMouseDrag = this.onMouseDrag.bind(this);
    this.mouseDown = false;
    this.mousePoint = paper.view.center;
    // this.point = paper.view.center;
    this.point = paper.view.center;
  }

  triangle1(item, svg) {
    paper.view.draw();
    console.log('SVG IS LOADED');
    item.scale(0.1, item.bounds.topLeft);

    this.w -= item.bounds.width;
    this.h -= item.bounds.height;

    item.style = {fillColor: color[1], strokeWidth: '0'};



    let copy = item.clone();
    copy.rotate(180);

    this.allPieces.push(item);
    this.allCopyPieces.push(copy);

    let item2 = item.clone();
    let copy2 = copy.clone();

    this.allPieces.push(item2);
    this.allCopyPieces.push(copy2);

    item2.style = {fillColor: color[2], strokeWidth: '0'};
    copy2.style = {fillColor: color[2], strokeWidth: '0'};

    let item3 = item.clone();
    let copy3 = copy.clone();

    this.allPieces.push(item3);
    this.allCopyPieces.push(copy3);

    item3.style = {fillColor: color[0], strokeWidth: '0'};
    copy3.style = {fillColor: color[0], strokeWidth: '0'};

    item.translate(this.w / 2 + this.x * 5, this.h / 2 + this.y * 13);
    copy.translate(this.w / 2 - this.x * 5, this.h / 2 - this.y * 13);
    item2.translate(this.w / 2 - this.x * 9, this.h / 2 - this.y * 21);
    copy2.translate(this.w / 2 + this.x * 9, this.h / 2 + this.y * 21);
    item3.rotate(60);
    copy3.rotate(60);
    item3.translate(this.w / 2 + this.x * 10, this.h / 2 - this.y * 18);
    copy3.translate(this.w / 2 - this.x * 10, this.h / 2 + this.y * 18);
  }

  triangle2(item, svg) {
    item.scale(0.1, item.bounds.topLeft);
    item.rotate(60);

    item.style = {fillColor: color[2], strokeWidth: '0'};

    let copy = item.clone();
    copy.rotate(180);

    item.translate(this.w / 2 - this.x * 8, this.h / 2 + this.y * 8);
    copy.translate(this.w / 2 + this.x * 8, this.h / 2 - this.y * 8);

    this.allPieces.push(item);
    this.allCopyPieces.push(copy);
  }

  line1(item, svg) {
    item.scale(0.1, item.bounds.topLeft);

    item.style = {fillColor: color[0], strokeWidth: '0'};
    let copy = item.clone();
    copy.rotate(180);

    item.translate(this.w / 2 - this.x * 5, this.h / 2 - this.y);
    copy.translate(this.w / 2 + this.x * 5, this.h / 2 + this.y);

    this.allPieces.push(item);
    this.allCopyPieces.push(copy);
  }

  line2(item, svg) {
    item.scale(0.1, item.bounds.topLeft);

    item.style = {fillColor: color[1], strokeWidth: '0'};
    let copy = item.clone();
    copy.rotate(180);

    item.translate(this.w / 2 - this.x * 5, this.h / 2 - this.y);
    copy.translate(this.w / 2 + this.x * 5, this.h / 2 + this.y);

    this.allPieces.push(item);
    this.allCopyPieces.push(copy);
  }

  line3(item, svg) {
    item.scale(0.1, item.bounds.topLeft);


    item.style = {fillColor: color[0], strokeWidth: '0'};

    let copy = item.clone();
    copy.rotate(180);

    this.allPieces.push(item);
    this.allCopyPieces.push(copy);

    let item2 = item.clone();
    let copy2 = copy.clone();

    item2.style = {fillColor: color[1], strokeWidth: '0'};
    copy2.style = {fillColor: color[1], strokeWidth: '0'};

    item2.rotate(60);
    copy2.rotate(60);
    item.translate(this.w / 2 + this.x * 9, this.h / 2 + this.y * 33);
    copy.translate(this.w / 2 - this.x * 9, this.h / 2 - this.y * 33);
    item2.translate(this.w / 2 - this.x * 16, this.h / 2 + this.y * 24);
    copy2.translate(this.w / 2 + this.x * 16, this.h / 2 - this.y * 24);

    this.allPieces.push(item2);
    this.allCopyPieces.push(copy2);
  }

  onMouseDown(e) {
    // this.mouseDown = true;
    // this.refMouse.x = e.point.x;
    // this.refMouse.y = e.point.y;
  }

  onMouseUp(e) {
    console.log('mouse up');
    // this.mouseDown = false;
    pos = (x, y);
  }

  onMouseMove(e) {
    console.log('mouse move');
  }

  onMouseDrag(e) {
    // Lors du Drag, on déplace toutes les pièces
    // suivant le delta de la souris (la difference de position à chaque
    // mouvement)
    for (let i = 0; i < this.allPieces.length; i++) {
      this.allPieces[i].position.x += e.delta.x;
      this.allPieces[i].position.y += e.delta.y;
    }
    for (let i = 0; i < this.allCopyPieces.length; i++) {
      this.allCopyPieces[i].position.x -= e.delta.x;
      this.allCopyPieces[i].position.y -= e.delta.y;
    }
    // pos = e.point;
  }

  draw(e) {
    // console.log('draw');
    //   if (this.mouseDown) {
    //     pos = e.point;
    //     console.log(mousePoint.x);
    // } else {
    //     pos = (x,y);
    // }
  }
};

// initialisation de l'app
new MainClass();
