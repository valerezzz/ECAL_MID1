// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;

let mouvementX = 1;
let mouvementY = 0;
let orientationX = 1;
let orientationY = 1;

function start() {
  // constante locale
  monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  // lancement de la fonction de dessin
  animation();
}

function animation() {
  dessine();
  requestAnimationFrame(animation);
}

function dessine() {
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  mesOutils.strokeStyle = "black";
  // on défini l'espacement en chaque petit cercle récursif
  let espacement = 8;
  // on établit une variable pour le l'évolution de la couleur hsl
  let w = 0;
  // on compte le nombre de cercle dans la grille
  let cercle = 0;
  // on crée une grille "à l'envers" (en commencant par le bas)
  for (let j = 8; j >= 1; j--) {
    for (let i = 8; i >= 1; i--) {
      cercle++;
      // on défini les condition du mouvement en X
      // en quand l'orientation en X doit changer
      if (mouvementX >= 1 && orientationX == 1) {
        orientationX = -1;
      }
      if (mouvementX <= -1 && orientationX == -1) {
        orientationX = 1;
      }
      if (orientationX > 0) {
        mouvementX += 0.0001;
      } else {
        mouvementX -= 0.0001;
      }
      // on défini les condition du mouvement en Y
      // en quand l'orientation en Y doit changer
      if (mouvementY >= 1 && orientationY == 1) {
        orientationY = -1;
      }
      if (mouvementY <= -1 && orientationY == -1) {
        orientationY = 1;
      }
      if (orientationY > 0) {
        mouvementY += 0.0001;
      } else {
        mouvementY -= 0.0001;
      }
      // on défini l'amplitude du déplacement
      let deplacement = 10;
      // on défini la conditon de l'inversion du déplacement
      if (cercle % 3 == 0) {
        deplacement = -10;
      }
      for (let k = 0; k < 10; k++) {
        mesOutils.fillStyle = `hsl( ${60 - w},${20 + espacement * 2 * k}%,50%)`;
        mesOutils.beginPath();
        mesOutils.arc(
          (i * monCanvas.width) / 10 +
            monCanvas.width / 20 +
            mouvementX * k * deplacement,
          (j * monCanvas.height) / 10 +
            monCanvas.height / 20 +
            espacement * k +
            mouvementY * k * 5,
          monCanvas.height / 10 / 2 - espacement * k,
          0,
          2 * Math.PI
        );

        mesOutils.stroke();
        mesOutils.fill();
        mesOutils.closePath();
      }
      w += 360 / 100;
    }
  }
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
