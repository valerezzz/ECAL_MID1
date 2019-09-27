VARIABLES
ex :  let nomVariable1 = 2 ;
      const nomVariable2 = 5 ;
      let resultat = 0;

      resultat = nomVariable1 + nomVariable2;


FUNCTIONS

function nomDeFunction () {}

function addition (param1,param2) {
  let res = param1 + param2;
  return res;
}

resultat = addition(4,5);


CONDITIONS

if(resultat > 7){
  console.log('attention plus grand que 7');
}else{
  console.log('ok');
}




BOUCLE

resultat = addition(0,21);
resultat = addition(1,21);
resultat = addition(2,21);
resultat = addition(3,21);
resultat = addition(4,21);
resultat = addition(5,21);
resultat = addition(6,21);
resultat = addition(7,21);
resultat = addition(8,21);
resultat = addition(9,21);
resultat = addition(10,21);

for (let i = 0; i<=10; i+=1 ) {
  let resultat = addition(i,2);
  console.log(resultat);
}



TABLEAU

const monTableau = new Array();
const monTableau = [];

monTableau.push(2);
const taille = monTableau.length; =>1
monTableau.push(67);
const taille = monTableau.length; =>2 // 2,67
monTableau.push(130);
console.log(monTableau)

[ 2 , 67 , 130 ]
[ 0   1    2   ]

let valeur = monTableau[0]

for(let i=0;i<monTableau.length;i+=1){
  let valeur = monTableau[i]
}

ATTENTION SI ON SUPPRIME UN ELEMENT
[ 2 , 130 ]
[ 0   1   ]




CANVAS
element HTML qui est récupéré par JavaScript pour
avoir des actions de dessin.

const context = canvas.getContext('2d');



CLASS

class balleDeTennis{
  function dessiner(){}
  function bouger(){}
  function gravite(){}
}

for(let i = 0;i<=10;i+=1){
  let ball = new balleDeTennis();
}



COMMENTAIRES DANS LE CODE

// for(let i = 0;i<=10;i+=1){
//   let ball = new balleDeTennis();
// }
