import Cell from "./Cell";
/**
 * SNAKE TEXT
 * DRAG THE TEXT TAIL INTO A GRID
 */
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.myText = "LONG SNAKE";
    this.firstCell = 0;
    this.activeMouse = { x: -20, y: -20 };
    this.finalLetters = [];
    this.initGrid();
    this.addListeners();
  }

  addListeners() {
    this.handlers = {
      mousedown: this.onMouseDown.bind(this),
      mousemove: this.onMouseMove.bind(this),
      mouseup: this.onMouseUp.bind(this),
    };
    document.addEventListener("mousedown", this.handlers.mousedown);
    document.addEventListener("mouseup", this.handlers.mouseup);
    document.addEventListener("mousemove", this.handlers.mousemove);
  }
  onMouseDown(e) {
    this.startDrag = true;
  }
  onMouseMove(e) {
    this.activeMouse.x = e.x;
    this.activeMouse.y = e.y;
  }
  onMouseUp(e) {
    this.startDrag = false;
  }
  initGrid() {
    this.rows = 25;
    this.size = window.innerWidth / this.rows;
    this.lines = Math.ceil(window.innerHeight / this.size);
    this.cells = [];
    let index = 0;
    for (let j = 0; j < this.lines; j++) {
      for (let i = 0; i < this.rows; i++) {
        const x = i * this.size;
        const y = j * this.size;
        const cell = new Cell(x, y, this.size, index, this.ctx);
        this.cells.push(cell);
        index++;
      }
    }
    this.cells.forEach((item) => {
      this.getNeighbors(
        item,
        Math.floor(item.x / this.size),
        Math.floor(item.y / this.size)
      );
    });

    this.draw();
  }

  getNeighbors(cell, i, j) {
    if (i > 0 && !this.cells[j * this.rows + (i - 1)].isObstacle) {
      cell.left = this.cells[j * this.rows + (i - 1)];
    } else if (
      i == 0 &&
      this.cells[(j - 1) * this.rows] &&
      !this.cells[(j - 1) * this.rows].isObstacle
    ) {
      cell.left = this.cells[(j - 1) * this.rows];
    } else {
      cell.left = null;
    }

    if (i <= this.rows - 2 && !this.cells[j * this.rows + (i + 1)].isObstacle) {
      cell.right = this.cells[j * this.rows + (i + 1)];
    } else if (
      i == this.rows - 1 &&
      this.cells[(j + 1) * this.rows] &&
      !this.cells[(j + 1) * this.rows].isObstacle
    ) {
      cell.right = this.cells[(j + 1) * this.rows];
    } else {
      cell.right = null;
    }

    if (j > 0 && !this.cells[(j - 1) * this.rows + i].isObstacle) {
      cell.top = this.cells[(j - 1) * this.rows + i];
    } else {
      cell.top = null;
    }

    if (j < this.lines - 2 && !this.cells[(j + 1) * this.rows + i].isObstacle) {
      cell.bottom = this.cells[(j + 1) * this.rows + i];
    } else {
      cell.bottom = null;
    }
  }

  detectLastCell() {
    if (this.startDrag) {
      this.cells.forEach((item, index) => {
        item.isSet = false;
        item.setSnakeBody(false);
        item.isNeighbor = false;
        const lastIndex = item.checkMouse(this.activeMouse, this.startDrag);
        if (lastIndex) {
          this.lastCell = lastIndex;
          this.firstCell = lastIndex - (this.myText.length - 1);
        }
      });
    }
  }

  getPreviousOkCell(cell) {
    if (cell && cell.isObstacle) {
      return this.getPreviousOkCell(cell.top);
    } else if (cell) {
      return cell;
    } else {
      return null;
    }
  }

  getSnakeShapeReverse() {
    const letters = this.myText.split("");
    const allCells = [];
    let height = 0;
    let cell = null;
    //last
    if (this.cells[this.lastCell] && this.cells[this.lastCell].isObstacle) {
      cell = this.getPreviousOkCell(this.cells[this.lastCell].top);
    } else {
      cell = this.cells[this.lastCell];
    }

    if (cell) {
      cell.setLetter(letters[letters.length - 1]);
      allCells.push(cell);
      letters.pop();

      for (let i = letters.length - 1; i >= 0; i--) {
        if (cell.left) {
          cell.left.setLetter(letters[i]);
          allCells.push(cell.left);
          cell = cell.left;
          cell.isSet = true;
        } else if (cell.top) {
          cell.top.setLetter(letters[i]);
          allCells.push(cell.top);
          cell = cell.top;
          cell.isSet = true;
        } else if (cell.bottom && !cell.isSet) {
          cell.bottom.setLetter(letters[i]);
          allCells.push(cell.bottom);
          cell = cell.bottom;
          cell.isSet = true;
        } else if (cell.right && !cell.isSet) {
          cell.right.setLetter(letters[i]);
          allCells.push(cell.right);
          cell = cell.right;
          cell.isSet = true;
        }
        // if (cell.right) cell.setColor("red");
      }
      allCells.forEach((item) => item.setSnakeBody(true));
      // console.log(allCells.length);
    }
  }

  // CHECK FROM LEFT TO RIGHT

  // getNextOkCell(cell) {
  //   if (cell && cell.isObstacle) {
  //     return this.getNextOkCell(cell.bottom);
  //   } else if (cell) {
  //     return cell;
  //   } else {
  //     return null;
  //   }
  // }

  // getSnakeShape() {
  //   const letters = this.myText.split("");
  //   const allCells = [];
  //   let height = 0;
  //   let cell = null;
  //   // first
  //   if (this.cells[this.firstCell] && this.cells[this.firstCell].isObstacle) {
  //     cell = this.getNextOkCell(this.cells[this.firstCell].bottom);
  //   } else {
  //     cell = this.cells[this.firstCell];
  //   }

  //   if (cell) {
  //     cell.setLetter(letters[0]);
  //     allCells.push(cell);
  //     letters.shift();
  //     for (let i = 0; i < letters.length; i++) {
  //       if (cell.right) {
  //         cell.right.setLetter(letters[i]);
  //         allCells.push(cell.right);
  //         cell = cell.right;
  //       } else if (cell.bottom) {
  //         cell.bottom.setLetter(letters[i]);
  //         allCells.push(cell.bottom);
  //         cell = cell.bottom;
  //         height++;
  //       } else if (cell.top) {
  //         cell.top.setLetter(letters[i]);
  //         allCells.push(cell.top);
  //         cell = cell.top;
  //         height--;
  //       }
  //     }
  //     allCells.forEach((item) => item.setSnakeBody(true));
  //   }
  // }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.detectLastCell();
    this.getSnakeShapeReverse();
    this.cells.forEach((item) => {
      if (!item.snakeBody) item.setLetter("");
      item.draw();
    });
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = () => {
  new App();
};
