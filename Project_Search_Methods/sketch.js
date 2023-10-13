let rows = 15;
let cols = 15;
let grid = new Array(cols);

goTime=0;

let larg; // width
let alt; // height
let path = [];

let Second=0;

let random_agent_c;
let random_agent_l;

let random_food_c;
let random_food_l;

let birth;
let food;
let buscaLarguraButton;
let buscaProfundidadeButton;
let custoUniformeButton;
let gulosaButton;
let aStarButton;

let searchIsOver;

let foundFood;
let SearchMethod = "Start";  // Busca começa com A*

let openSet = []; // list of nodes to evaluate
let closedSet = []; // list of nodes already evaluated
  
  function setup() {
    createCanvas(680, 600);
  
    larg = width / cols;
    alt = height / rows;
  
    for (let c = 0; c < cols; c++) {
      grid[c] = new Array(rows);
    }
  
    for (let c = 0; c < cols; c++) {
      for (let l = 0; l < rows; l++) {
        grid[c][l] = new Bloco(c, l);
      }
    }
  
    for (let c = 0; c < cols; c++) {
      for (let l = 0; l < rows; l++) {
        grid[c][l].addvizinhos(grid);
      }
    searchIsOver = false;
    }
  // Create the buttons
   buscaLarguraButton = createButton("Busca por Largura (BFS)");
  buscaProfundidadeButton = createButton("Busca por Profundidade (DFS)");
  custoUniformeButton = createButton("Custo Uniforme");
  gulosaButton = createButton("Gulosa");
  aStarButton = createButton("A*");
  
  // Set the position of the buttons
  buscaLarguraButton.position(10, 30);
  buscaProfundidadeButton.position(10, 60);
  custoUniformeButton.position(10, 90);
  gulosaButton.position(10, 120);
  aStarButton.position(10, 150);
  
  // Set up event handlers for button clicks
  buscaLarguraButton.mousePressed(buscaLarguraClicked);
  buscaProfundidadeButton.mousePressed(buscaProfundidadeClicked);
  custoUniformeButton.mousePressed(custoUniformeClicked);
  gulosaButton.mousePressed(gulosaClicked);
  aStarButton.mousePressed(aStarClicked);
  
    random_agent_c = randomNumber(0, (cols-1))
    random_agent_l = randomNumber(0, (rows-1))
    
    hunter = new Hunter(random_agent_c, random_agent_l , larg, alt); //create hunter
    
    if(Second==0){
      birth = grid[random_agent_c][random_agent_l];
      Second=1;
    }
    random_food_c = randomNumber(0, (cols-1))
    random_food_l = randomNumber(0, (rows-1))
    
    food = grid[random_food_c][random_food_l];
    
    birth.iswall = false;
    food.iswall = false;
  
    openSet.push(birth);
  }
  
  function draw() {
    background(220);
    search();
    let xof = 0;
    for (let c = 0; c < cols; c++) {
      for (let l = 0; l < rows; l++) {
        xof += 0.5;
        grid[c][l].Mapa(xof);
      }
    }

    food.showFill(color(255, 204, 0)); //Pinta a comida de amarelo
  
    for (let ct = 0; ct < openSet.length; ct++) {
      openSet[ct].show(color(255, 0, 0));
    }
  
    for (let ct = 0; ct < closedSet.length; ct++) {
      closedSet[ct].show(color(237, 229, 71));
    }
  
    for (let ct = 0; ct < path.length; ct++) {
      path[ct].show(color(128, 35, 186));
    }
  
    hunter.DrawArmor();
    console.log(openSet);

    if((goTime==0) && searchIsOver){
      //resetGameState();
    }
  
  }
  // PARA PODER ESCONDER OS BOTÕES QUANDO TIVER BUSCANDO
  function hideButtons(){
    buscaLarguraButton.hide();
    buscaProfundidadeButton.hide();
    custoUniformeButton.hide();
    gulosaButton.hide();
    aStarButton.hide();
  }
  
  function showButtons() {
    buscaLarguraButton.style('display', 'block');
    buscaProfundidadeButton.style('display', 'block');
    custoUniformeButton.style('display', 'block');
    gulosaButton.style('display', 'block');
    aStarButton.style('display', 'block');
  }

  // ------------------------------------------------------

  function search() {
    searchIsOver = Buscas[SearchMethod].search(grid, birth, food, openSet, closedSet);
    // console.log(searchIsOver);
    if (searchIsOver) {  // nova condição para quando a busca terminar
        SearchMethod = "Start"; // coloque searchMethod de volta ao padrão
        // console.log(SearchMethod);
        showButtons(); 
        if(goTime==1){
          let scent = path;
          foundFood = hunter.stalk(scent, food);
          hunter.run();
          // if(foundFood){
          //   goTime = 0;
          // }else{
          //   goTime=1;
          // }
        }

    }
  }

  function removefromArray(arr, elim) {
    for (let ct = arr.length - 1; ct >= 0; ct--) {
      if (arr[ct] == elim) {
        arr.splice(ct, 1);
      }
    }
  }
  
function heuristic(a, b) {
    let d = dist(a.i, a.j, b.i, b.j);
    return d;
  }

function resetGameState() { // Bom para comparar os algoritmos de busca
    // Move o agente de volta ao local de nascimento
    //hunter.pos.x = birth.i * larg + larg/2;
    //hunter.pos.y = birth.j * alt + alt/2;

    // Limpa o caminho
 
    path = [];

    // random_agent_c = randomNumber(0, (cols-1))
    // random_agent_l = randomNumber(0, (rows-1))

    console.log("aeeeeeeeeeee");
    random_food_c = randomNumber(0, (cols-1))
    random_food_l = randomNumber(0, (rows-1))
    
    // food = grid[random_food_c][random_food_l];
    // Reseta os conjuntos abertos e fechados
    openSet = [];
    openSet.push(birth);
    closedSet = [];
    
    // adiciona o agente ao conjunto fechado

    searchIsOver = false;
}

function buscaLarguraClicked() {
  console.log("Busca por Largura clicked!");
  //resetGameState();
  SearchMethod = "BFS";
  hideButtons(); // Esconde os botões quando estiver buscando
}
function buscaProfundidadeClicked() {
  console.log("Busca por Profundidade clicked!");
  //resetGameState();
  SearchMethod = "DFS";
  hideButtons();
}

function custoUniformeClicked() {
  console.log("Custo Uniforme clicked!");
  //resetGameState();
  SearchMethod = "uniforme";
  hideButtons();
}

function gulosaClicked() {
  console.log("Gulosa clicked!");
  //resetGameState();
  SearchMethod = "gulosa";
  hideButtons();
}

function aStarClicked() {
  console.log("A* Clicked!");
  //resetGameState();
  SearchMethod = 'AStar';
  hideButtons();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}