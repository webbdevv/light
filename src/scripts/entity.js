export default class Entity {
  constructor(life = 100, position = [0, 0], board){
    this.life = life;
    this.position = position;
    this.DIRECTIONS = { 
      left: [0, -1],
      right: [0, 1],
      up: [-1, 0],
      down: [1, 0]
    }
    this.board = board;
    this.moveTo = this.moveTo.bind(this);
  }
  isDead(){
    return this.life === 0;
  }
  destroy(){
    this.life = 0;
  }
  move(direction){
    if(!this.DIRECTIONS[direction]) throw Error("Invalid Direction");
    let move = this.DIRECTIONS[direction];
    let [posY, posX] = this.position
    if(this.board && this.board.grid[posY + move[0]][posX + move[1]] instanceof Wall){
      document.getElementById('text-body').innerHTML = 'Cannot move through a wall'
      throw Error(`Cannot move through a wall at position ${this.board.grid[posY + move[0]][posX + move[1]]}`)
    }
    //Fill in here
      this.position[0] += move[0];
      this.position[1] += move[1];
    //
  }
  moveTo(position){
    if(this.position[0] === position[0] && this.position[1] === position[1]) return;

    let movementVector = [this.position[0] - position[0], this.position[1] - position[1]];
    if(movementVector[0] !== 0){
      if(movementVector[0] < 0){
        this.move('down');
        movementVector[0]++;
      } else {
        this.move('up');
        movementVector[0]--;
      }
    }
    if(movementVector[1] !== 0){
      if(movementVector[1] < 0){
        this.move('right');
        movementVector[1]++;
      } else {
        this.move('left');
        movementVector[1]--;
      }
    }
    this.moveTo(position);
  }
}
// this.vector = vector;

export class Wall extends Entity{
  constructor(position, board){
    super(0, position, board)
  }
  move(){
    //dummy function
  }
  moveTo(){
    //dummy function
  }
}

export class CodeBlock extends Entity{
  constructor(position, board){
    super(0, position, board)
  }
  move(){

  }
  moveTo(){

  }
}