class Bloco {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.iswall = false;
      this.color = [
        [72, 79, 82],   // Obstaculo
        [76, 204, 43],  // Areia
        [158, 103, 0],  // Atoleiro
        [6, 143, 201]   // Agua
      ];
      this.vizinhos = [];
      this.previous = null;
    }
  
    addvizinhos(grid) {
      if (this.i < cols - 1) this.vizinhos.push(grid[this.i + 1][this.j]);
      if (this.i > 0) this.vizinhos.push(grid[this.i - 1][this.j]);
      if (this.j < rows - 1) this.vizinhos.push(grid[this.i][this.j + 1]);
      if (this.j > 0) this.vizinhos.push(grid[this.i][this.j - 1]);
    }
  
    show(col) {  // Desenhar apenas a borda do quadrado
      noFill();
      strokeWeight(6);
      stroke(col);
      rect(larg * this.i, alt * this.j, larg - 1, alt - 1);
    }

    showFill(col){ // Desenhar o quadrado inteiro
      if(this == food){ // comida? desenha a pizza
        this.showPizza();
      }else{
      fill(col);  // Se não, desenha o quadrado inteiro
      stroke(col);
      rect(larg * this.i, alt * this.j, larg - 1, alt - 1);
      }
    }

    showPizza() {
      let x = larg * this.i;
      let y = alt * this.j;
      let w = larg - 1;
      let h = alt - 1;
      let radius = min(w, h) / 2; // raio da pizza
  
      fill(255, 255, 255); // cor da do prato (branco)
      rect(x, y, w, h); // draw pizza base
  
      fill(255, 204, 0); // Cor do queijo
      stroke(150,75,0);  // Cor da borda do queijo
      ellipse(x + w / 2, y + h / 2, radius * 2); // draw tomato sauce
  
      let tomatoCount = 6; // numero de tomates
      stroke(255, 0, 0); // cor tomate
      fill(255,0,0);
      for (let i = 0; i < tomatoCount; i++) {
        let angle = (Math.PI * 2) * (i / tomatoCount);
        let tomatoX = x + w / 2 + radius / 2 * Math.cos(angle);
        let tomatoY = y + h / 2 + radius / 2 * Math.sin(angle);
        let tomatoSize = radius / 3; // tam. de cada tomate
        ellipse(tomatoX, tomatoY, tomatoSize); // desenha tomate
      }
    }
  
    Mapa(xoff) {
      let terrain = map(noise(xoff), 0, 1, 0, 4);
      terrain = floor(terrain);
      stroke("white");
      strokeWeight(1);
      fill(this.color[terrain]);
      rect(larg * this.i, alt * this.j, larg - 1, alt - 1);
      
      switch (terrain) {
        case 0:
          this.iswall = true;
          break;
        
        case 1:
          this.g=1;
          break;
        case 2:
          this.g=5;
          break;
        
        default:
          this.g=10;
          break;
        }
    }
  }
  
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  