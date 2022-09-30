// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
function start() {
  // constante locale
  monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  // lancement de la fonction de dessin
  dessine();
}

function dessine() {
  mesOutils.strokeStyle = "black";
  let w = 0;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      let valeurRandom = Math.random();
      let espacement = 8;
      for (let k = 0; k < 10; k++) {
        mesOutils.fillStyle = `hsl( ${60 - w},${50 + espacement * k}%,50%)`;
        mesOutils.beginPath();
        if (valeurRandom > 0.75) {
          mesOutils.arc(
            (i * monCanvas.width) / 10 + monCanvas.width / 20,
            (j * monCanvas.height) / 10 +
              monCanvas.height / 20 -
              espacement * k,
            monCanvas.height / 10 / 2 - espacement * k,
            0,
            2 * Math.PI
          );
        } else if (valeurRandom > 0.5) {
          mesOutils.arc(
            (i * monCanvas.width) / 10 + monCanvas.width / 20 - espacement * k,
            (j * monCanvas.height) / 10 + monCanvas.height / 20,
            monCanvas.height / 10 / 2 - espacement * k,
            0,
            2 * Math.PI
          );
        } else if (valeurRandom > 0.25) {
          mesOutils.arc(
            (i * monCanvas.width) / 10 + monCanvas.width / 20 + espacement * k,
            (j * monCanvas.height) / 10 + monCanvas.height / 20,
            monCanvas.height / 10 / 2 - espacement * k,
            0,
            2 * Math.PI
          );
        } else {
          mesOutils.arc(
            (i * monCanvas.width) / 10 + monCanvas.width / 20,
            (j * monCanvas.height) / 10 +
              monCanvas.height / 20 +
              espacement * k,
            monCanvas.height / 10 / 2 - espacement * k,
            0,
            2 * Math.PI
          );
        }

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
