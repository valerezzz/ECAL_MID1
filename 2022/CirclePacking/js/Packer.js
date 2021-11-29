class Packer {
  constructor(radius, circleNumber, outer = false) {
    this.color = color("#0f628b");
    this.circleRadius = radius;
    this.circleNumber = circleNumber;
    this.outerCircleIsFixed = outer;
    //condition si on veut une dimension du cercle exterieur fix
    if (outer) {
      this.containerRadius = this.circleRadius;
    }
    this.getDimensions();
  }

  getDimensions() {
    /**
     * CALCUL DES DIMENSIONS DES CERCLES INTERIEURS OU DU CERCLE EXTERIEUR
     * dependemment du parametre
     */
    if (this.outerCircleIsFixed) {
      this.circleRadius = this.getCircleRadius(
        this.circleNumber,
        this.containerRadius
      );
    } else {
      this.containerRadius = this.getContainerRadius(
        this.circleNumber,
        this.circleRadius
      );
    }
  }

  updateCirclesNumber() {
    /**
     * on change le nombre de cercles ici
     * le minimum est 1
     * le maximum est 40
     * ces chiffres peuvent être modifiés
     */
    const amount = floor(map(mouseX, 0, width, 1, 40));
    this.circleNumber = amount;
    this.getDimensions();
  }

  /**
   * fonctions pour calculer les differents rayons de cercles
   */
  getContainerRadius(n, circleRadius) {
    return circleRadius / window.radii[n];
  }
  getCircleRadius(n, containerRadius) {
    return window.radii[n] * containerRadius;
  }

  calculateAllCircles() {
    this.draw(this.circleNumber, this.circleRadius, this.containerRadius);
  }
  /**
   *
   * LES 2 FONCTIONS SUIVANTES SONT UN PEU COMPLIQUEE
   * MAIS EN GROS CHARGENT EN MEMOIRE LES DIFFERENTES CONFIGURATION JUSQU'à 1500 CERCLES
   *
   */
  getArray(resultArray, containerRadius) {
    for (let i = 0; i < resultArray.length; i++) {
      resultArray[i][0] = containerRadius * resultArray[i][0] + containerRadius;
      resultArray[i][1] = containerRadius * resultArray[i][1] + containerRadius;
    }
    return resultArray;
  }
  getScaledPositions(n, containerRadius) {
    let url = `data/data-extra/${n}.txt`;
    return fetch(url)
      .then((data) => data.text())
      .then((txt) => {
        let resultArray = txt.split("\n");
        for (let i = 0; i < resultArray.length; i++) {
          resultArray[i] = resultArray[i].split(",");
          resultArray[i][0] = parseFloat(resultArray[i][0]);
          resultArray[i][1] = parseFloat(resultArray[i][1]);
        }
        let trucArray = this.getArray(resultArray, containerRadius);
        return trucArray;
      });
  }

  /**
   * fonction de dessin des cercles
   * c'est une fonction rendue "ASYNCHRONE" pour permettre le chargement des valeurs précalculées
   * le petit mot async est nécesaire pour dire à la fonction d'attendre que les valeurs soient ready
   *
   */
  async draw(n, circleRadius, containerRadius) {
    //on attends les valeurs avant de dessiner
    let resultArray = await this.getScaledPositions(n, containerRadius);

    // fonction de dessin standard
    background(255);
    stroke(this.color);
    noFill();
    push();
    translate(width / 2 - containerRadius, height / 2 - containerRadius);
    push();
    translate(containerRadius, containerRadius);
    circle(0, 0, containerRadius * 2);
    pop();
    fill(this.color);
    for (let i = 0; i < resultArray.length - 1; i++) {
      circle(resultArray[i][0], resultArray[i][1], circleRadius * 2);
    }
    pop();
    window.draw();
  }
}
