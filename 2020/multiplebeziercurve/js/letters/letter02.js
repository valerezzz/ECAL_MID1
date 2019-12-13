/*
  On peut mettre le code de chaque nouvelle lettre dans une class séparée.
  Comme ça c'est plus simple à gérer.
  ex : si une lettre a besoin de 2 lignes, on cré les points nécessaire dans
  la classe, les courbes correspondantes et le reste ne change pas.
*/

class letter01 {
  constructor(ctx) {
    // first line
    const line1 = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
    const courbe1 = new Courbe(line1);
    courbe1.ctx = ctx;


    // second line si nécessaire etc....
    // const line2 = [
    //   {x: 1050, y: 755}, {x: 969, y: 328}, {x: 1277, y: 675},
    //   {x: 1204, y: 332}
    // ];
    // const courbe2 = new Courbe(line2);
    // courbe2.ctx = ctx;



    // on met toutes les courbes pour la lettre1
    this.allCurves = [courbe1];
  }
  // pour récupérer les points de la courbe (pour ajustement)
  getPoints() {
    let id = 1;
    for (let curve of this.allCurves) {
      console.log('courbe' + id + ':', curve.allpoints);
      id++;
    }
  }

  // 4 necessary functions
  down(x, y) {
    for (let curve of this.allCurves) {
      curve.down(x, y);
    }
  }
  up(x, y) {
    for (let curve of this.allCurves) {
      curve.up(x, y);
    }
  }
  update(x, y) {
    for (let curve of this.allCurves) {
      curve.update(x, y);
    }
  }
  draw() {
    for (let curve of this.allCurves) {
      curve.draw();
    }
  };
}
