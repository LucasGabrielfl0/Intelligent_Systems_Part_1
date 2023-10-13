class Hunter{
    constructor(i, j, cellWidth, cellHeight){
        this.i = i;
        this.j = j;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.pos = createVector(
            this.i * this.cellWidth + this.cellWidth / 2,
            this.j * this.cellHeight + this.cellHeight / 2
        );
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 1.5;
        this.maxForce = 0.3;
        this.r = 16;
        this.count=2;
    }

    
    stalk(scent){
        //let target = path[count]
        console.log("CRASHH");
        console.log(this.count);
        let targ1 = createVector(
            scent[scent.length-this.count].i * this.cellWidth + this.cellWidth / 2,
            scent[scent.length-this.count].j * this.cellHeight + this.cellHeight / 2
        );
        fill("red");
        strokeWeight(1);
        stroke("black");
        ellipse(
            this.pos.x,
            this.pos.y,
            this.cellWidth / 2,
            this.cellHeight / 2
        
        );



        let force = p5.Vector.sub(targ1, this.pos);
        let distance = force.mag();
            
        if(distance<this.cellHeight/2){
            //this.maxSpeed= 1.5/(scent[scent.length-this.count].g);
        }
        
        if (distance<1.97) { //if he got to the first point
            force.mult(0);
            if(this.count<scent.length){
                this.count=this.count+1;
                //console.log("count +1");
            }
            else{
                random_food_c = randomNumber(0, (cols-1));
                random_food_l = randomNumber(0, (rows-1));
                food = grid[random_food_c][random_food_l];
                

                random_agent_c = scent[0].i;
                random_agent_l = scent[0].j;
                birth = grid[random_agent_c][random_agent_l];
                
                //closedSet=[birth];
                this.count=2;
                goTime=0;
                path=[];
                //closedSet=[];
                openSet=[];
                openSet.push(birth);
                
                console.log("achei?");
                return true;
            }
            console.log("hm");
        }
        else{
            force.setMag(this.maxSpeed);      
        }
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);

    }
    

    applyForce(force) {
        this.acc.add(force);
      }
    
    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
      }
    
    DrawArmor(){
        fill("red");
        strokeWeight(1);
        stroke("black");
        ellipse(
            this.pos.x,
            this.pos.y,
            this.cellWidth / 2,
            this.cellHeight / 2
        );
    }
    run(){
        this.update();
        this.DrawArmor();
    }
}