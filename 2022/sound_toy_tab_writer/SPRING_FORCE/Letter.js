class Letter {
  constructor(x, y, value) {
    this.anchor = new ForcePoint(x, y);
    /**
     * CONSTRUCTION DE CHAQUE LETTRE
     * A partir de l'ANCRE
     *
     * Pour l'exemple, uniquement le A est codé, il suffit de suivre la même logique pour les autres lettres
     */
    this.ELASTIC_POINTS = [];
    switch (value) {
      case "A":
        let p1 = new ForcePoint(
          this.anchor.position.x - 100,
          this.anchor.position.y + 100
        );
        this.anchor.add(p1);
        let p2 = new ForcePoint(
          this.anchor.position.x + 100,
          this.anchor.position.y + 100
        );
        this.anchor.add(p2);
        let p3 = new ForcePoint(
          this.anchor.position.x - 200,
          this.anchor.position.y + 200
        );
        p1.add(p3);
        let p4 = new ForcePoint(
          this.anchor.position.x + 200,
          this.anchor.position.y + 200
        );
        p2.add(p4);
        this.ELASTIC_POINTS.push(p1);
        this.ELASTIC_POINTS.push(p2);
        this.ELASTIC_POINTS.push(p3);
        this.ELASTIC_POINTS.push(p4);
        p1.add(p2, false);
        break;
    }
  }

  draw() {
    /*ANCRE*/
    this.anchor.updateForce();
    this.anchor.draw();
    //tous les points élastiques
    this.ELASTIC_POINTS.forEach((item) => {
      item.updateForce();
      item.draw();
    });
  }
}
