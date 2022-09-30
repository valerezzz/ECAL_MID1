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
  // dessine un cercle au centre du canvas
  // outline en vert
  // remplissage en vert clair
  mesOutils.strokeStyle = "green";
  mesOutils.fillStyle = "lightgreen";
  mesOutils.beginPath();
  mesOutils.arc(
    monCanvas.width / 2,
    monCanvas.height / 2,
    100 * pixelRatio,
    0,
    2 * Math.PI
  );
  mesOutils.stroke();
  mesOutils.fill();
  mesOutils.closePath();
  // dessine un rectangle à gauche du cercle
  // outline en bleu
  // remplissage en bleu clair
  mesOutils.strokeStyle = "blue";
  mesOutils.fillStyle = "lightblue";
  mesOutils.beginPath();
  mesOutils.rect(
    monCanvas.width / 2 - 325 * pixelRatio,
    monCanvas.height / 2 - 100 * pixelRatio,
    200 * pixelRatio,
    200 * pixelRatio
  );
  mesOutils.stroke();
  mesOutils.fill();
  mesOutils.closePath();
  // dessine un triangle à droite du cercle
  // outline en rouge
  // remplissage en rouge clair
  mesOutils.strokeStyle = "red";
  mesOutils.fillStyle = "pink";
  mesOutils.beginPath();
  mesOutils.moveTo(
    monCanvas.width / 2 + 125 * pixelRatio,
    monCanvas.height / 2
  );
  mesOutils.lineTo(
    monCanvas.width / 2 + 325 * pixelRatio,
    monCanvas.height / 2 + 100 * pixelRatio
  );
  mesOutils.lineTo(
    monCanvas.width / 2 + 325 * pixelRatio,
    monCanvas.height / 2 - 100 * pixelRatio
  );
  mesOutils.closePath();
  mesOutils.stroke();
  mesOutils.fill();
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
