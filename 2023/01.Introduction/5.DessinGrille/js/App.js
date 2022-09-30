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
  // dessine une grille de 10x10 rectangles, remplissant tout l'espace
  // outline en noir

  mesOutils.strokeStyle = "grey";
  let w = 0;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      mesOutils.strokeRect(
        (i * monCanvas.width) / 10,
        (j * monCanvas.height) / 10,
        monCanvas.width / 10,
        monCanvas.height / 10
      );
      // dessiner un cercle dans chaque carré
      // remplissage en blanc
      // mesOutils.fillStyle = `rgba(255,${255 - w},${255 - w},1)`;
      mesOutils.fillStyle = `hsl( ${60 - w},50%,50%)`;
      mesOutils.beginPath();
      mesOutils.arc(
        (i * monCanvas.width) / 10 + monCanvas.width / 20,
        (j * monCanvas.height) / 10 + monCanvas.height / 20,
        monCanvas.height / 10 / 2,
        0,
        2 * Math.PI
      );
      mesOutils.stroke();
      mesOutils.fill();
      mesOutils.closePath();
      w += 360 / 100;
      console.log(`rgba(255,${255 - w},${255 - w},1)`);
    }
  }
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
