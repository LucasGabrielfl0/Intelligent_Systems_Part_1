// Base on The Nature of Code from The Coding Train / Daniel Shiffman
// P5JS link: https://editor.p5js.org/LucasGabrielfl0/sketches/BmSHEskgW?authuser=0

hunting=1;
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.3;
    this.r = 16;
  }
  
  seek(target, dummy) {
    let force = p5.Vector.sub(target, this.pos);
    let distance = force.mag();
    

    if(distance<Raio_Vis){
    
      if (start==0) {
        force.mult(0);
        yfood= Math.floor(random(10,490));
        xfood= Math.floor(random(10,490));
        start=start+1;
      }
    
      if (distance<1.87) 
      {
        force.mult(0);
        yfood= Math.floor(random(10,490));
        xfood= Math.floor(random(10,490));
        count=count+1;
      }
    
      else{
      force.setMag(this.maxSpeed);      
      }
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    hunting=1;
    a=0;
    b=0;
    }
    
    //EXPLORE
    else{
    hunting=0;
    let force = p5.Vector.sub(dummy, this.pos);
    let distance = force.mag();

      
      if (start==0) {
        force.mult(0);
        //alvo aleatorio
        xRand= Math.floor(random(10,490));
        yRand= Math.floor(random(10,490));
        
        yfood= Math.floor(random(10,490));
        xfood= Math.floor(random(10,490));
        start=start+1;
        
      }
    
      if (distance<1.87) 
      {
        force.mult(0);
        //alvo aleatorio
        xRand= Math.floor(random(10,490));
        yRand= Math.floor(random(10,490));
      }
    
      else{
      force.setMag(this.maxSpeed);      
      }
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    }
  
  }
  
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.edges();
  }
  
  
  
  show() {
    
    //comida
    stroke(0);
    strokeWeight(2);
    fill("#03c6fc");
    push();

    //alvo aleatorio
    //fill("red");
    //stroke(0);
    //circle(xRand, yRand, 40);
    
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());


    
    //campo de visao
    fill("#151842");
    stroke(0);
    circle(-this.r,0, Raio_Vis*2);
    
    //corpo do pacman
    fill("yellow")
    circle(-this.r, 0, 65)
    stroke(0);
    
    //olhos
    fill(0);
    circle(-this.r-10, -15, 10)

    if(hunting==1){
         //abre e fecha boca
    if(i>=2 || i<=1.8 )
      {
      Vel_Boca=Vel_Boca* (-1)
      }
    fill(0);
    stroke(0);
    arc(-this.r,0,65,65, (i+=Vel_Boca)*PI, (x-=Vel_Boca)*PI);
     
    }
    pop();
    

    
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
