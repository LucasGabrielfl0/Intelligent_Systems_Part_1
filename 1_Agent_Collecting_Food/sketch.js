// Based on The Nature of Code from The Coding Train / Daniel Shiffman
// p5.Js Link: https://editor.p5js.org/LucasGabrielfl0/sketches/gd0ZLCG5E?authuser=0

start=0;
i=1.85;
Vel_Boca=0.01;
x=0.2;
let vehicle;
let target;
count =0;
xfood= Math.floor(Math.random(10,480));
yfood= Math.floor(Math.random(10,480));

function setup() {
  createCanvas(500, 500);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background("#151842");
  fill(255, 0, 0);
  noStroke();

  //apagar:
  target = createVector(xfood, yfood);



  vehicle.seek(target);
  vehicle.update();
  vehicle.show();
  circle(xfood,yfood, 30);
  fill("#108546")
  
  textSize(23);
  fill("#ffffff");
  text("Comidas Coletadas: "+count, 10, 25);
}
