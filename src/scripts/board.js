export default class Board{
  constructor(size){
    this.size = size;
    this.board = [];
  }

  generateBoard() {
    for(let i = 0; i < this.size; i++){
      this.grid.push([]);
      for(let j = 0; j < this.size; j++){
        const tile = new Tile(this, [i, j]);
        this.grid[i].push(tile);
      }
    }
  }
}