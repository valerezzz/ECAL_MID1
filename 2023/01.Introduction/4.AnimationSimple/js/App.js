// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let positionX = 0;
let isAnimated = false;
function start() {
  // constante locale
  monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  //on ajuste la positionX au centre du canvas
  positionX = monCanvas.width / 2;

  // on ajoute un écouteur d'événement "click"
  //  sur le document
  document.addEventListener("click", function (event) {
    console.log(event);
    // if (event.key == "Enter") {
    if (isAnimated == true) {
      isAnimated = false;
    } else {
      isAnimated = true;
    }
    // isAnimated = !isAnimated;
    // }
  });

  // lancement de la fonction de dessin
  animate();
}

// creation d'un fonction d'animation
// cette fonction sera appelée à chaque frame
function animate() {
  // on efface le canvas
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);
  // on incremente la position X
  if (isAnimated == true) {
    positionX += 1;
  }
  // on dessine
  dessine();
  //si la position X est plus grande que la largeur du canvas
  //on la remet à 0
  if (positionX > monCanvas.width) {
    positionX = 0;
  }

  // on demande à rappeler la fonction animate
  // à la prochaine frame
  requestAnimationFrame(animate);
}

function dessine() {
  // dessine un cercle au centre du canvas
  // outline en vert
  // remplissage en vert clair
  mesOutils.strokeStyle = "green";
  mesOutils.fillStyle = "lightgreen";
  mesOutils.beginPath();
  mesOutils.arc(
    positionX,
    monCanvas.height / 2,
    100 * pixelRatio,
    0,
    2 * Math.PI
  );
  mesOutils.stroke();
  mesOutils.fill();
  mesOutils.closePath();
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
