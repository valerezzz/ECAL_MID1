<b>VARIABLES</b><br/>

	let nomVariable1 = 2 ;
	const nomVariable2 = 5 ;
	let resultat = 0;
	resultat = nomVariable1 + nomVariable2;


<b>FUNCTIONS</b><br/>

	function nomDeFunction () {}

	function addition (param1,param2) {
  	 let res = param1 + param2;
   	 return res;
	}

	resultat = addition(4,5);


<b>CONDITIONS</b><br/>

	if(resultat > 7){
  	 console.log('attention plus grand que 7');
	}else{
  	 console.log('ok');
	}




<b>BOUCLE</b><br/>

	resultat = addition(0,2);
	resultat = addition(1,2);
	resultat = addition(2,2);
	resultat = addition(3,2);
	resultat = addition(4,2);
	resultat = addition(5,2);
	resultat = addition(6,2);
	resultat = addition(7,2);
	resultat = addition(8,2);
	resultat = addition(9,2);
	resultat = addition(10,2);

	for (let i = 0; i<=10; i+=1 ) {
  	 let resultat = addition(i,2);
  	 console.log(resultat);
	}



<b>TABLEAU</b><br/>

	const monTableau = new Array();
	const monTableau = [];

	monTableau.push(2);
	const taille = monTableau.length; =>1
	monTableau.push(67);
	const taille = monTableau.length; =>2 // 2,67
	monTableau.push(130);
	console.log(monTableau)

[ 2 , 67 , 130 ]<br/>
[ 0 |  1  |  2   ]

	let valeur = monTableau[0]

	for(let i=0;i<monTableau.length;i+=1){
  	 let valeur = monTableau[i]
	}

<b>ATTENTION SI ON SUPPRIME UN ELEMENT</b><br/>
[ 2 , 130 ]<br/>
[ 0 |  1   ]




<b>CANVAS</b><br/>
element HTML qui est récupéré par JavaScript pour
avoir des actions de dessin.

	const context = canvas.getContext('2d');



<b>CLASS</b>

	class balleDeTennis{
  	 function dessiner(){}
  	 function bouger(){}
  	 function gravite(){}
	}

	for(let i = 0;i<=10;i+=1){
  	 let ball = new balleDeTennis();
	}



<b>COMMENTAIRES DANS LE CODE</b><br/>

	// for(let i = 0;i<=10;i+=1){
	//   let ball = new balleDeTennis();
	// }
