// constante globale
const pixelRatio = window.devicePixelRatio;
function start() {
  // constante locale
  const monCanvas = document.getElementById("ecal");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  const mesOutils = monCanvas.getContext("2d");
  const monText = `texte intégré au canvas`;
  // definition de la police
  mesOutils.font = `${20 * pixelRatio}px Arial`;
  // definition du texte
  mesOutils.fillText(monText, 60, 120);
}

// attente que tous les éléments soient chargés
// utilisation d'une fonction anonyme en callback
// --> pas de nom de fonction car pas besoin de la réutiliser
window.onload = () => {
  start();
};
