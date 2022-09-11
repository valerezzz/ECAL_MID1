export default class Cell {
  constructor(x, y, size, index, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.index = index;
    // define if the cell is an obstacle
    this.isObstacle = Math.random() > 0.8 ? true : false;
    this.highlightColor = "rgba(255,0,0,0.2)";
    this.lineColor = "black";
    this.fillColor = "white";
    this.fontColor = "rgb(100,100,100)";
    this.obstacleColor = "rgba(0,0,0,0.3)";
    // this.neighborColor = "rgba(0,0,255,0.3)";
    this.ctx.font = "14px Sans-serif";
    this.isSet = false;
    this.isRed = false;
    this.txt = "";
    this.right = this.left = this.top = this.bottom = null;
  }

  setLetter(letter) {
    this.txt = letter;
    const mesure = this.ctx.measureText(this.txt);
    this.w = this.ctx.measureText(this.txt).width;
    this.h = Math.abs(
      parseFloat(mesure.actualBoundingBoxDescent) -
        parseFloat(mesure.actualBoundingBoxAscent)
    );
  }

  checkMouse(mouse) {
    if (
      mouse.x >= this.x &&
      mouse.x < this.x + this.size &&
      mouse.y >= this.y &&
      mouse.y < this.y + this.size
    ) {
      this.fillColor = this.highlightColor;
      this.isRed = true;
      return this.index;
    } else {
      this.isRed = false;
      this.fillColor = "white";
    }
    return null;
  }

  drawAsNeighbor() {
    this.isNeighbor = true;
  }

  setColor(color) {
    this.fillColor = color;
  }
  setSnakeBody(bool) {
    this.snakeBody = bool;
  }

  drawNeighbors() {
    if (this.right && !this.right.isSet) {
      this.right.setColor("rgba(0,0,255,0.3)");
      this.right.draw();
    }
    if (this.left && !this.left.isSet) {
      this.left.setColor("rgba(0,0,255,0.3)");
      this.left.draw();
    }
    if (this.top && !this.top.isSet) {
      this.top.setColor("rgba(0,0,255,0.3)");
      this.top.draw();
    }
    if (this.bottom && !this.bottom.isSet) {
      this.bottom.setColor("rgba(0,0,255,0.3)");
      this.bottom.draw();
    }
  }

  draw() {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.fillStyle = this.fillColor;
    if (this.isObstacle) this.ctx.fillStyle = this.obstacleColor;

    this.ctx.lineWidth = 0.1;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.size, this.size);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = this.fontColor;
    this.ctx.fillText(
      this.txt,
      this.size / 2 - this.w / 2,
      this.size / 2 + this.h / 2
    );
    this.ctx.restore();

    if (this.txt == "L" || this.txt == "O") {
      this.drawNeighbors();
    }
  }
}
