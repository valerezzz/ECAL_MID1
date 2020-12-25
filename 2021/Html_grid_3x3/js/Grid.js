/**
 *
 * CLASSE DE GENERATION D'UNE GRILLE HTML
 * POUR VOIR LA DISTINCTION DE CHAQUE CASE, ON UTILISE ICI ARBRITRAIREMENT DES LETTRES
 * CHAQUE CASE HERITE D'UN COMPORTEMENT PAR DEFAULT : CLICK
 * PERMETTANT AINSI UNE OUVERTURE + FERMETURE DES CASES DE MANIERE SIMPLE
 * SI UN CANVAS NECESSITE LE CLICK COMME ELEMENT D'INTERACTION, IL FAUDRA CUSTOMISER CE COMPORTEMENT
 *
 *
 */

class Grid {
  constructor() {
    // DEFINITION DU NOMBRE DE COLONNES ET DE LIGNES DE LA GRILLE
    this.grid = { cols: 3, rows: 3 };
    // INITIALISATION D'UN TABLEAU POUR STOCKER LA REPRESENTATION JS DE CHAQUE CASE
    this.cases = [];
    // MESSAGE PAR DEFAULT DE CHAQUE CASE (9 POUR CET EXEMPLE)
    this.letter = ["A", "B", "C", "D", "", "F", "G", "H", "I"];
    // FUNCTION DE CREATION DE LA GRILLE
    this.initGrid();
    // FUNCTION D'AFFECTATION DU CLICK
    this.initListener();
  }

  initListener() {
    this.handlers = {
      click: this.onClick.bind(this),
      end: this.onEnd.bind(this),
      resize: this.onResize.bind(this),
    };
    // ON AJOUTE EGALEMENT UN LISTENER POUR VERIFIER QUE LE FULLSCREEN EST BIEN EN PLACE (OU REVENU CORRECTEMENT EN POSITION DE GRILLE)
    document.addEventListener("transitionend", this.handlers.end);
    document.addEventListener("click", this.handlers.click);
    // SI ON CHANGE LA TAILLE DE LA FENETRE, IL S'AGIRA DE REDIMENSIONNER/REPOSITIONNER LA GRILLE
    window.addEventListener("resize", this.handlers.resize);
  }

  onResize(e) {
    // FUNCTION POUR REDIMENSIONNEMENT/REPOSITIONNEMENT DE CHAQUE CASE AU CAS D'UN CHANGEMENT DE DIMENSION
    const nodes = document.body.getElementsByTagName("div");
    const h = window.innerHeight / this.grid.rows;
    const w = window.innerWidth / this.grid.cols;
    Array.from(nodes).forEach((el) => {
      el.setAttribute("data-w", w);
      el.setAttribute("data-h", h);
      const x = el.getAttribute("data-tx");
      const y = el.getAttribute("data-ty");
      el.style.transform =
        "translateX(" + x * w + "px) translateY(" + y * h + "px)";
      el.style.width = w + "px";
      el.style.height = h + "px";
    });
  }

  onEnd(e) {
    if (e.propertyName == "transform" || e.propertyName == "width") {
      const fullscreen = e.target.getAttribute("data-state");
      if (fullscreen != "true") {
        e.target.style.zIndex = 0;
        document.addEventListener("click", this.handlers.click);
      } else {
        document.removeEventListener("click", this.handlers.click);
      }
    }
  }

  onClick(e) {
    let target = e.target;
    if (e.target.className != "grid" || e.target.className == "close") {
      target = e.target.parentNode;
    }
    const closeButton = target.getElementsByClassName("close")[0];
    const x = target.getAttribute("data-tx");
    const y = target.getAttribute("data-ty");
    const w = target.getAttribute("data-w");
    const h = target.getAttribute("data-h");
    const fullscreen = target.getAttribute("data-state");
    if (fullscreen != "true") {
      target.style.zIndex = 10;
      target.setAttribute("data-state", true);
      target.style.transform = "translateX(0px) translateY(0px)";
      target.style.width = window.innerWidth;
      target.style.height = window.innerHeight;

      closeButton.classList.remove("hidden");
      // console.log("close button", closeButton);
    } else {
      target.setAttribute("data-state", false);
      target.style.transform =
        "translateX(" + x * w + "px) translateY(" + y * h + "px)";
      target.style.width = w + "px";
      target.style.height = h + "px";
      closeButton.classList.add("hidden");
      // document.addEventListener("click", this.handlers.click);
    }
  }

  initGrid() {
    // CREATION DE LA GRILLE SUIVANT LES DIMENSIONS DE L'ECRAN ET LE NOMBRE DE LIGNES ET DE COLONNES
    // A L'INTITIALISATION DE LA GRILLE, LES LETTRES SONT UTILISE COMME CONTENU DANS LES CALQUES, DERRIERE LE CANVAS
    // SI LE CANVAS COMPORTE UN FOND OPAQUE, LA LETTRE DE REFERENCE S'EN TROUVERA CACHEE
    const h = window.innerHeight / this.grid.rows;
    const w = window.innerWidth / this.grid.cols;
    let i = 0;
    for (let y = 0; y < this.grid.rows; y++) {
      for (let x = 0; x < this.grid.cols; x++) {
        const div = document.createElement("div");
        div.className = "grid";
        div.style.position = "absolute";
        div.style.width = w;
        div.style.height = h;
        div.style.transform =
          "translateX(" + x * w + "px) translateY(" + y * h + "px)";
        div.style.backgroundColor = "rgb(255,255,255)";
        div.setAttribute("data-tx", x);
        div.setAttribute("data-ty", y);
        div.setAttribute("data-w", w);
        div.setAttribute("data-h", h);
        div.setAttribute("data-state", false);
        const lettre = this.letter.shift();
        this.letter.push(lettre);
        div.textContent = lettre;
        document.body.appendChild(div);
        this.cases.push(div);

        // ajout de la case pour fermer
        const span = document.createElement("span");
        span.className = "material-icons close hidden";
        span.textContent = "close";
        div.appendChild(span);
        span.addEventListener("click", this.onClick.bind(this));
      }
    }
  }
}
