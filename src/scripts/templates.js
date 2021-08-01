export function createTemplates(gameState){
  switch(gameState.currentPuzzle){
    case 0:
      return entityStr0(gameState);
    case 1: //second puzzle has needs the entity class
      return entityStr1(gameState);
    case 2:
      return entityStr2(gameState);
  }
}

const gameStr0 = function(gameState, answer = ''){
  return `function twoPlusTwo(two){
  // fill in below //
  return two + two ===${answer};
  //
}`
}

const gameStr1 = function(gameState, answer = ''){
  return `function answerToLife(){
  // fill in below //
  ${answer}
  //
}`
}

const entityStr2 = function(gameState, answer = ''){
return `class Entity{
  constructor(life = 100){
    this.life = life;
  }

  isDead(){
    // fill in below //
    ${answer}
    //
  }
}`
}

const entityStr3 = function(gameState, answer = ''){
return `class Entity{
  constructor(life = 100){
    this.life = life;
  }
  isDead(){
    ${gameState.puzzles[2].userSolution}
  }
  destroy(){
    this.life = 0;
  }
}

function destroyAll(entities){
  // fill in below
  ${answer}
  //
}`
}

const entityStr4 = function(gameState, answer = ''){
  return `class Entity {
    constructor(life = 100, position = [10, 10]){
      this.life = life;
      this.position = position;
      this.DIRECTIONS = { 
        left: [-1, 0],
        right: [1, 0],
        up: [0, 1],
        down: [0, -1]
      }
    }
    isDead(){
      ${gameState.puzzles[2].userSolution}
    }
    destroy(){
      this.life = 0;
    }
    move(direction){
      if(!this.DIRECTIONS[direction]) throw Error("Invalid Direction");
      let move = this.DIRECTIONS[direction];
      //Fill in here
        ${answer}
      //
    }
  }
  `
}

const entityStr5 = function(gameState, answer = ''){
  return `class Entity {
    constructor(life = 100, position = [10, 10]){
      this.life = life;
      this.position = position;
      this.DIRECTIONS = { 
        left: [-1, 0],
        right: [1, 0],
        up: [0, 1],
        down: [0, -1]
      }
    }
    isDead(){
      ${gameState.puzzles[2].userSolution}
    }
    destroy(){
      this.life = 0;
    }
    move(direction){
      if(!this.DIRECTIONS[direction]) throw Error("Invalid Direction");
      let move = this.DIRECTIONS[direction];
      ${gameState.puzzles[4].userSolution}
    }
    moveTo(position){
      //fill in below
      
      //
    }
  }`
}
const templates = [gameStr0, gameStr1, entityStr2, entityStr3, entityStr4, entityStr5]

export function createAnswers(gameState){
  const answers = [
    ` 5`,
    `return 42`,
    `return this.life === 0`, 
    `if(entities.length > 0){
        entities.pop().destroy()
        destroyAll(entities)
      }`,
    `this.position[0] += move[0];
    this.position[1] += move[1];`
  ];
  return templates[gameState.currentPuzzle](gameState, answers[gameState.currentPuzzle])
}