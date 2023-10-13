// Based on The Nature of Code from The Coding Train / Daniel Shiffman
// p5.Js Link: https://editor.p5js.org/LucasGabrielfl0/sketches/n7OsR-DEE?authuser=0

// Constructor
class World {
    constructor(num) {
      // Start with initial food and creatures
      this.food = new Food(num);
      this.bloops = []; // An array for all creatures
      for (let i = 0; i < num; i++) {
        let l = createVector(random(width), random(height));
        let dna = new DNA();
        this.bloops.push(new Bloop(l, dna));
      }
    }
  
    // Make a new creature
    born(x, y) {
      let l = createVector(x, y);
      let dna = new DNA();
      this.bloops.push(new Bloop(l, dna));
    }
  
    // Run the world
    run() {
      // Deal with food
      //this.food.run(); //display de comida
  
      // Cycle through the ArrayList backwards b/c we are deleting
      for (let i = this.bloops.length - 1; i >= 0; i--) 
      {
        // All bloops run and eat
        let b = this.bloops[i];
        b.visionDisp();
        b.run();
        b.seek(this.food);
        b.eat(this.food);
        // If it's dead, kill it and make food
        if (b.dead()) {
          this.bloops.splice(i, 1);
          this.food.add(b.position);
        }
        ////////////////////////////////
        for (let j = i-1; j >=0; j--) 
        {
          let bloA = b.position; //vetor de localizacao do bloop A
          let bB = this.bloops[j];
          let bloB=bB.position
          
          let distancia = p5.Vector.dist(bloA, bloB);
          // if bloop is in range=  crossover!
          if (distancia <= b.r/2 ||distancia<=bB.r/2) 
          {
            //crossover
            textSize(23);
            fill("#d6694d");
            text("bloops proximos: chance de crossover", 20, 45);
            ///////////////////////////
            if (random(1) < 0.004) 
            {
              let babybloop =[];
              let midpoint=5;
              for(let ct=0;ct<b.dna.genes.length;ct++)
              {
                if(ct>midpoint)
                {
                  babybloop[ct] = b.dna.genes[ct];
                }
                else
                {
                  babybloop[ct] = bB.dna.genes[ct];  
                }
              }
              //
              let kiddo = b.repro(babybloop);
              this.bloops.push(kiddo);
              
              textSize(23);
              fill("#186625");
              text("crossover realizado", 60, 65);
            } 
  /////////////////////////////////
            
            
          }
        }    
      
      }
      this.food.run(); //display de comida
    }
  }