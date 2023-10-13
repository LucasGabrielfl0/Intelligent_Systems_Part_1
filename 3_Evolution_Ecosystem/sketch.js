// Based on The Nature of Code from The Coding Train / Daniel Shiffman
// p5.Js Link: https://editor.p5js.org/LucasGabrielfl0/sketches/n7OsR-DEE?authuser=0


let world;

function setup() {
  createCanvas(640, 360);
  // World starts with 20 creatures
  // and 20 pieces of food
  world = new World(10);
}

function draw() {
  background(175);
  world.run();
}

// We can add a creature manually if we so desire
function mousePressed() {
  world.born(mouseX, mouseY);
}

function mouseDragged() {
  world.born(mouseX, mouseY);
}