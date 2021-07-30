export default 
class Entity{
  constructor(life = 100, position = [10, 10]){
    this.life = life;
    this.position = position;
    this.DIRECTIONS = { 
      left: [0, -1],
      right: [0, 1],
      up: [1, 0],
      down: [-1, 0]
    }
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
    //Fill in here
      this.position[0] += move[0];
      this.position[1] += move[1];
    //
  }
}
// this.vector = vector;