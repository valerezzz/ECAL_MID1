/*
Array
Dictionary
Loop + Nested loop
Condition with switch
ES6 notation (var / function / module)
Class
This / bind
// MATH
Circle  --> impro with circle.
Mouse over (no sound)
*/
// const angle = 90;
// const monTableau = [1, 2, ["un", "deux", "trois"], 4, 5];
// //index             0  1             2             3  4
// console.log(monTableau[2][1]);
// const a = monTableau[2][1];
// const b = monTableau[2];
// const c = monTableau[monTableau.length - 1];
// console.log(b);

// const monDico = {
//   chiffre1: 1,
//   Tom: { age: 20, taille: 2.6 },
//   jerry: { age: 20, taille: 1.7 },
//   simon: { age: 20, taille: 1.55 },
// };
// const d = monDico.Tom.taille;

// if (monDico.Tom.taille > monDico.jerry.taille) {
//   console.log("yeah");
// } else {
//   console.log("nul");
// }
// let score = 0;
// switch (monDico.Tom.taille) {
//   case 1.2:
//   case 1.3:
//   case 1.4:
//     console.log("super");
//     score = 1;
//     break;
//   case 1.5:
//     console.log("super, 1.5");
//     score = 6;
//     break;
//   case 1.6:
//     console.log("super, 1.5");
//     score = 0.2;
//     break;
//   case 1.7:
//     console.log("super, 1.5");
//     break;
//   case 1.8:
//     console.log("super, 1.5");
//     break;
//   case 1.9:
//     console.log("super, 1.5");
//     break;
// }

let angle;
let fact;
//boucle
function setup() {
  createCanvas(4000, 4000);
  noFill();
  angle = 0;
  fact = 0;
}

function draw() {
  background(255);
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      circle(50 * x + 50, 50 * y + 50, 50 * fact);
      fact = Math.sin(((angle + x * 3) * Math.PI) / 180);
    }
  }
  angle++;
}
