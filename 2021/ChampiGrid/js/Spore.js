/**
 *  Simple classe de spore qui tombe avec une vitesse aléatoire, et un léger mouvement lattéral
 */
class Spore {
  constructor(_paper, point) {
    this.paper = _paper;
    this.point = point;
    this.path = new this.paper.Path.Circle(point, 10);
    this.path.strokeColor = "red";
    this.origin = this.path.position.x;
    this.angle = 0;
    this.speed = Math.random() * 10;
    this.speedY = 2 + Math.random() * 3;
    this.length = 5 + Math.random() * 10;
  }

  update() {
    this.angle += this.speed;
    this.path.position.y += this.speedY;
    this.path.position.x =
      this.origin + Math.sin((this.angle * Math.PI) / 180) * this.length;
  }
}
