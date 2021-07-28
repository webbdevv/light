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