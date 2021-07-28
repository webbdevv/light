export default 
class Entity{
  constructor(life = 100){
    this.life = life;
  }
  isDead(){
    return this.life === 0;
  }
  destroy(){
    this.life = 0;
  }
}
// this.vector = vector;

export function createTemplates(gameState){
  debugger
  switch(gameState.currentPuzzle){
    case 1: //second puzzle has needs the entity class
      return entityStr1(gameState);
    case 2:
      return entityStr2(gameState);
  }
}
const entityStr1 = function(){
return `class Entity{
  constructor(life = 100){
    this.life = life;
  }

  isDead(){
    //fill in below

  }
}`
}

const entityStr2 = function(gameState){
return `
class Entity{
  constructor(life = 100){
    this.life = life;
  }
  isDead(){
    ${gameState.puzzles[1].userSolution}
  }
  destroy(){
    this.life = 0;
  }
}

function destroyAll(){
  //fill in below

}`
}