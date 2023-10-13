// Based on The Nature of Code from The Coding Train / Daniel Shiffman
// p5.Js Link: https://editor.p5js.org/LucasGabrielfl0/sketches/BmSHEskgW?authuser=0

start=0; //variavel usada
i=1.85;
Vel_Boca=0.01;
x=0.2;
a=1;
b=1;
Raio_Vis= 125; //Raio de visao
let vehicle;
let target;
count =0;
xfood= Math.floor(Math.random(10,480));
yfood= Math.floor(Math.random(10,480));
xRand= 0;
yRand= 0;

function setup() {
  createCanvas(500, 500);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background("black");
  fill(255, 0, 0);
  noStroke();

  target = createVector(xfood, yfood);
  dummy= createVector(xRand, yRand);

  
  vehicle.seek(target, dummy);
  vehicle.update();
  vehicle.show();
  circle(xfood,yfood, 30);
  fill("#108546")
  
  //contador
  textSize(23);
  fill("#ffffff");
  text("Comidas Coletadas: "+count, 10, 25);
}
