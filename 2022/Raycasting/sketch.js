// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

let allLetters = [];
let allWalls = [];
let xPosition = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // for (let i = 0; i < 5; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  particle = new Particle();
}

function draw() {
  background(0);
  // for (let wall of walls) {
  //   wall.show();
  // }
  allWalls = Array.from(walls);
  allLetters.forEach((letter) => {
    letter.draw();
    letter.walls.forEach((wall) => {
      allWalls.push(wall);
    });
  });

  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  particle.look(allWalls);

  xoff += 0.01;
  yoff += 0.01;
}

function keyPressed() {
  switch (key) {
    case "a":
      allLetters.push(new Letter(xPosition, height / 2 - 150, "A"));
      xPosition += 200;
      break;
    case "Backspace":
      allLetters.pop();
      xPosition -= 200;
      break;
  }
}
