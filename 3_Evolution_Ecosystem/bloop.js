// Based on The Nature of Code from The Coding Train / Daniel Shiffman
// p5.Js Link: https://editor.p5js.org/LucasGabrielfl0/sketches/n7OsR-DEE?authuser=0


// Creature class
Vis_Max=10; //raio de visao
// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 5, 50);
    //DNA will determine vision: the bigger he is, less he sees
    this.Vis=map(this.dna.genes[0],0, 1, this.r*Vis_Max,this.r/2); 
    this.vel= createVector(0,0);
    this.acc= createVector(0,0);
    this.alvo=createVector(0,0);  
    this.Hunting=0;
  }

  run() {
    if(this.Hunting==0) //se nao estiver cacando
    {
      this.update();  
    }

    this.upd();
    this.borders();
    this.display();
  
  }

  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodLocation = food[i];
      let d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }
  
//////////////////////////// CROSSOVER  
    repro(child) 
  {
      let childDNA = new DNA(child);
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Bloop(this.position, childDNA);    
  }

//////////////////////COMIDA MAIS PROXIMA
    seek(f) {
    let fcomida = f.getFood();
    let closest=this.Vis;
    let tempTarget=createVector(100,100);
      
    //hunt closest food
    for (let count = fcomida.length - 1; count >= 0; count--) 
    {
      let foodLocal = fcomida[count];
      let d = p5.Vector.dist(this.position, foodLocal);
      // If we are
      if(d<closest)
      {
        tempTarget=foodLocal;
        closest=d;
        textSize(23);
        fill("#ffffff");
        text("hunting food ", 10, 25);
        this.Hunting=1;
      }
    
    }
      //apos o fim do loop, pega o mais proximo e define como alvo

      this.alvo=tempTarget; 
      let forca = p5.Vector.sub(this.alvo, this.position);
      forca.setMag(this.maxspeed/2); //<<=onde ta dando erro
      if(closest >=this.Vis)
        {
          forca.mult(0);
          this.Hunting=0;
        }
      let steer = p5.Vector.sub(forca, this.vel);
      this.applyForce(steer);
  }
  
  
  applyForce(force) 
  {
    this.acc.add(force);
  }
  
  upd()
  {
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.acc.set(0, 0);
    
  } 
  // Method to update position
  update() {
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    // Death always looming
    this.health -= 0.2;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width+this.r;
    if (this.position.y < this.r) this.position.y = height+this.r;
    if (this.position.x > width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }

  // Method to display
  visionDisp()
  {
    //fenotipo da visao
    if(this.Hunting==1) //borda vermelha quando ta cacando
    {
      strokeWeight(3);
      stroke(175,44,44);
      noFill();      
      circle(this.position.x,this.position.y, this.Vis*2)
    }
    else //borda fica rosa quando esta perambulando 
    {
      strokeWeight(3);
      stroke(137,206,165);
      noFill();      
      circle(this.position.x,this.position.y, this.Vis*2)

    }    

  }
  
  display() {
    
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  // Death
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
