let x = 0
let y = 0


let myColors =['#EC3E59','#FBE343', '#6CD070', '#1E4AAB', '#2890BD', '#FE463C', '#F97D38', '#26854D', '#FCB736', '#1E364E', '#12162F', '#A1BDD2', '#575C71']
let sizeSquare = [20, 30, 40, 50, 60]
let sizeCricle = [20, 30, 40, 50, 60]



function setup() {

  createCanvas(windowWidth, windowHeight)

  
}



function draw() {

  frameRate(random(5, 10));

  for(y = 0; y <= width; y += 80) {
    for(x = 0; x <= width; x += 80){
      push();
      fill(random(myColors));
      strokeWeight(0.3);
      rect(x, y, 80, 80);
      pop();
    }
  }

  push();
  rectMode(CENTER)
  noStroke()
  for(y = 0; y <= width; y += 80) {
    for(x = 0; x <= width; x += 80){

      fill(random(myColors));

      if(random(random(1) < 0.5)) {
        rect(x + 40, y + 40, random(sizeSquare));
      } else {
        circle(x + 40, y + 40, random(sizeCricle));
      }

    }
  }
  pop()


  

 
}