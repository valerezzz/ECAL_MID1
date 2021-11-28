class Letter {
  constructor(x, y, value) {
    this.size = 200;
    this.x = x;
    this.y = y;
    this.walls = [];
    switch (value) {
      case "A":
        /**
         * creation de la lettre A avec 3 boundary (murs)
         */
        this.walls.push(
          new Boundary(
            this.x + this.size / 2,
            this.y + 20,
            this.x + 20,
            this.y + this.size - 20
          )
        );
        this.walls.push(
          new Boundary(
            this.x + this.size / 2,
            this.y + 20,
            this.x + this.size - 20,
            this.y + this.size - 20
          )
        );
        this.walls.push(
          new Boundary(
            this.x + 30,
            this.y + this.size / 2,
            this.x + this.size - 30,
            this.y + this.size / 2
          )
        );
        break;
      case "b":
        /**
         * creation de la lettre B avec x boundary .....
         */
        break;
    }
  }

  draw() {
    this.walls.forEach((item) => {
      item.show();
    });
  }
}
