class ImageShape {
  constructor(x, y, data) {
    // on charge toutes infos du JSON
    this.image = loadImage("./images/" + data.image);
    this.param = data.param;
    this.sound = loadSound("./sounds/" + data.sound);

    this.x = x;
    this.y = y;
    this.hasBeenChecked = false;
    this.speed = 1 + Math.random();
  }

  update() {
    this.x -= this.speed;
  }

  check(superShape, limit) {
    if (!this.hasBeenChecked && this.x < limit.x1) {
      this.hasBeenChecked = true;
      superShape.setNewGoal(this.param);
      this.sound.play();
    }
  }

  draw() {
    image(this.image, this.x, this.y);
  }
}
