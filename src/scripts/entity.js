export default 
class Entity{
  constructor(life = 100, position = [10, 10]){
    this.life = life;
    this.position = position;
    this.DIRECTIONS = { left, right, up, down }
  }
  isDead(){
    return this.life === 0;
  }
  destroy(){
    this.life = 0;
  }
  move(direction){
    if(!this.DIRECTIONS[direction]) throw Error("Invalid Direction");

    //Fill in here
    
    //
  }
}
// this.vector = vector;