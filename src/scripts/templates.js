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

export function createAnswers(gameState){
  const answers = [
    ` 5`,
    `return 42`,
    `return this.life === 0`, 
    `if(entities.length > 0){
        entities.pop().destroy()
        destroyAll(entities)
      }`
  ];
  switch(gameState.currentPuzzle){
    case 0:
      return gameStr0(gameState, answers[0])
    case 1:
      return gameStr1(gameState, answers[1]);
    case 2: //second puzzle has needs the entity class
      return entityStr2(gameState, answers[2]);
    case 3:
      return entityStr3(gameState, answers[3]);
  }
}

const gameStr0 = function(gameState, answer = ''){
  return `function twoPlusTwo(two){
  // fill in below //
  return two + two ===${answer};
  // DON'T ERASE THE //
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
  return `class Entity{
  constructor(life = 100, position = [10, 10]){
    this.life = life;
    this.position = position
  }
  isDead(){
    ${gameState.puzzles[2].userSolution}
  }
  destroy(){
    this.life = 0;
  }

}
`
}