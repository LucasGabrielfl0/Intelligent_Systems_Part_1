let current = null;

const DFS = {
  search: function (grid, birth, food, openSet, closedSet, searchIsOver) {
    console.log("DFS");

    if (openSet.length > 0) {
      hideButtons(); // esconde os botões quando estiver buscando

      // Using DFS, we select the last node in the openSet
      let current = openSet.pop();

      if (current == food) {
        console.log("UEPAAAAAAAAA");
        path = [];
        let temp = current;
        path.push(temp);

        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        console.log("FINISHED");
        goTime=1;
        searchIsOver = true;
        return searchIsOver;
      }

      closedSet.push(current);

      let vizinhos = current.vizinhos;
      for (let ct = 0; ct < vizinhos.length; ct++) {
        let vizinho1 = vizinhos[ct];

        if (!closedSet.includes(vizinho1) && !vizinho1.iswall) {
          // We don't need to update g, h, or f for DFS
          openSet.push(vizinho1);
          vizinho1.previous = current;
        }
      }
    } else {
      showButtons();
      // no nodes to visit
    }
  }
}

const BFS = {
  search: function (grid, birth, food, openSet, closedSet) {
    console.log("BFS");

    if (openSet.length > 0) {
      hideButtons(); // esconde os botões quando estiver buscando

      // Using BFS, we select the first node in the openSet
      let current = openSet.shift();

      if (current == food) {
        path = [];
        let temp = current;
        path.push(temp);

        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        console.log("FINISHED");
        goTime=1;
        return true; // Return that search is over
      }

      closedSet.push(current);

      let vizinhos = current.vizinhos;
      for (let ct = 0; ct < vizinhos.length; ct++) {
        let vizinho1 = vizinhos[ct];

        if (!closedSet.includes(vizinho1) && !vizinho1.iswall && !openSet.includes(vizinho1)) {
          // We don't need to update g, h, or f for BFS
          openSet.push(vizinho1);
          vizinho1.previous = current;
        }
      }
    } else {
      showButtons();
      // no nodes to visit
    }

    return false; // Return that search is not over
  }
};


const uniforme = {
  search: function(grid, birth, food, openSet, closedSet) {
      console.log("UCS");
      hideButtons();
      if (openSet.length > 0) {
          
          // With UCS (in this specific case), we select the first node in the openSet (like BFS)
          let current = openSet.shift();

          if (current == food) {
              path = [];
              let temp = current;
              path.push(temp);

              while (temp.previous) {
                  path.push(temp.previous);
                  temp = temp.previous;
              }
              console.log("FINISHED");
              goTime=1;
              return true;
          }

          closedSet.push(current);

          let vizinhos = current.vizinhos;
          for (let ct = 0; ct < vizinhos.length; ct++) {
              let vizinho1 = vizinhos[ct];

              // Only process this neighbor if it has not been processed yet
              if (!closedSet.includes(vizinho1) && !vizinho1.iswall && !openSet.includes(vizinho1)) {
                  openSet.push(vizinho1);
                  vizinho1.previous = current;
              }
          }
      } else {
          // no nodes to visit
      }
  }
}

const gulosa = { // BUSCA GULOSA
  search: function (grid, birth, food, openSet, closedSet, searchIsOver) {
    console.log("Greedy BFS");

    if (openSet.length > 0) {

      // With Greedy BFS, we select the node with the lowest 'h' value in the openSet
      let lowestCostIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].h < openSet[lowestCostIndex].h) {
          lowestCostIndex = i;
        }
      }
      let current = openSet[lowestCostIndex];

      if (current === food) {
        path = [];
        let temp = current;
        path.push(temp);

        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        console.log("FINISHED");
        goTime=1;
        searchIsOver = true;
        return searchIsOver;
      }

      removefromArray(openSet, current);
      closedSet.push(current);

      let vizinhos = current.vizinhos;
      for (let i = 0; i < vizinhos.length; i++) {
        let vizinho = vizinhos[i];

        if (!closedSet.includes(vizinho) && !vizinho.iswall) {
          let tempG = current.g + 1;

          if (openSet.includes(vizinho)) {
            if (tempG < vizinho.g) {
              vizinho.g = tempG;
              vizinho.h = heuristic(vizinho, food);  // Update h score
              vizinho.f = vizinho.h;  // The only difference from A*
              vizinho.previous = current;
            }
          } else {
            vizinho.g = tempG;
            vizinho.h = heuristic(vizinho, food); // Update h score
            vizinho.f = vizinho.h;  // The only difference from A*
            openSet.push(vizinho);
            vizinho.previous = current;
          }
        }
      }
    } else {
      showButtons();
      // no solution
    }
  }
}

const AStar = {  // BUSCA A*

  search: function (grid, birth, food, openSet, closedSet, searchIsOver) {
    hideButtons();
    if (openSet.length > 0) {
      let maxF = 0;
      for (let ct = 0; ct < openSet.length; ct++) {
        if (openSet[ct].f < openSet[maxF].f) {
          maxF = ct;
        }
      }
      console.log("chegou aqui1");
      this.current = openSet[maxF];

      if (this.current == food) {
        path = [];
        let temp = this.current;
        path.push(temp);

        console.log("chegou aqui2");
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        console.log("FINISHED");
        goTime=1;
        searchIsOver = true;
        return searchIsOver;
      }
    }
    console.log("chegou aqui3");
    
    removefromArray(openSet, this.current);
    closedSet.push(this.current);
    console.log("chegou aqui4");
    let vizinhos = this.current.vizinhos;
    for (let ct = 0; ct < vizinhos.length; ct++) {
      let vizinho1 = vizinhos[ct];
      console.log("chegou aqui5");
      if (!closedSet.includes(vizinho1) && !vizinho1.iswall) {
        let maxG = this.current.g + 1;
        if (openSet.includes(vizinho1)) {
          if (maxG < vizinho1.g) {
            vizinho1.g = maxG;
          }
        } else {
          vizinho1.g = maxG;
          openSet.push(vizinho1);
        }
        console.log("chegou aqui6");
        vizinho1.h = heuristic(vizinho1, food);
        vizinho1.f = vizinho1.g + vizinho1.h;
        vizinho1.previous = this.current;
      }//else{
      // vizinho1.iswall = true;
      //}
    }
    return false;
    // no nodes to visit
  }
}

const Start = {
  search: function () {
    showButtons();
    return true;
  }
}

let Buscas = {
  BFS: BFS,
  DFS: DFS,
  uniforme: uniforme,
  gulosa: gulosa,
  AStar: AStar,
  Start: Start
};