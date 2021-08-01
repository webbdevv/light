const gameStr0 = function(gameState, answer = ''){
  return `function twoPlusTwo(two){
  return two + two ===${answer};
}`
}

const gameStr1 = function(gameState, answer = ''){
  return `function answerToLife(){
  ${answer}
}`
}

const entityStr2 = function(gameState, answer = ''){
return `class Entity{
  constructor(life = 100){
    this.life = life;
  }

  isDead(){
    ${answer}
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
  ${answer}
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
      // Fill in below //
        ${answer}
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
      ${answer}
    }
  }`
}

const gameStr6 = function(gameState, answer = ''){
  return `class Entity{
    // previously written code
    moveTo(position){
      ${gameState.puzzles[5].userSolution}
    }
  }
  
  function babysFirstSteps(baby = 'you'){

  }
  `
}
const templates = [gameStr0, gameStr1, entityStr2, entityStr3, entityStr4, entityStr5, gameStr6]

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
    this.position[1] += move[1];`,
    `let movementVector = [this.position[0] - position[0], this.position[1] - position[1]];
      while(movementVector[0] !== 0){
        if(movementVector[0] < 0){
          this.move('down');
          movementVector[0]++
        } else {
          this.move('up')
          movementVector[0]--
        }
      }
      while(movementVector[1] !== 0){
        if(movementVector[1] < 0){
          this.move('right');
          movementVector[1]++ 
        } else {
          this.move('left');
          movementVector[1]--
        }
      }`,
  ];
  return templates[gameState.currentPuzzle](gameState)
  //add second argument of answers[gameState.currentPuzzle] for auto complete answers
}