class SuperShape {
  constructor(x, y, radius, m, n1, n2, n3, a, b) {
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.m = m; // m → amount of rotation semetrie spikes 1 spiral 2 teardrop more spikes
    this.n1 = n1; // n1 → larger amount smooths out form of inner spikes
    this.n2 = n2; // n2 → form from one side od the spikes
    this.n3 = n3; // n3 → form from one side od the spikes
    this.a = a; // a → size /bottom of the shape/ one half of the spikes in m
    this.b = b; // b → top of the shape or one half of the spikes
  }

  //function qui défini le goal à atteindre pour le morph
  setNewGoal(data) {
    this.goal = {
      m: data.m,
      n1: data.n1,
      n2: data.n2,
      n3: data.n3,
      a: data.a,
      b: data.b,
    };
  }

  // si un goal est défini, on morph les valeurs de la super shape vers ces valeurs
  updateGoalData() {
    if (this.goal) {
      this.a = lerp(this.a, this.goal.a, 0.1);
      this.b = lerp(this.b, this.goal.b, 0.1);
      this.m = lerp(this.m, this.goal.m, 0.1);
      this.n1 = lerp(this.n1, this.goal.n1, 0.1);
      this.n2 = lerp(this.n2, this.goal.n2, 0.1);
      this.n3 = lerp(this.n3, this.goal.n3, 0.1);
    }
  }

  draw() {
    //on update les valeur si il y a un nouveau goal à atteindre
    this.updateGoalData();

    // on dessine la supershape
    push();
    translate(this.x, this.y);
    beginShape();
    for (let theta = 0; theta < 360; theta += 0.01) {
      var rad = this.r(
        theta,
        this.a,
        this.b,
        this.m,
        this.n1,
        this.n2,
        this.n3
      );
      var x = rad * cos(theta) * this.radius;
      var y = rad * sin(theta) * this.radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  r(theta, a, b, m, n1, n2, n3) {
    return pow(
      pow(abs(cos((m * theta) / 4.0) / a), n2) +
        pow(abs(sin((m * theta) / 4.0) / b), n3),
      -1.0 / n1
    );
  }
}
