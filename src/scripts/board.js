import Tile from './tile'
export default class Board{
  constructor(size){
    this.size = size;
    this.grid = [];
    this.htmlGrid = []
    this.generateBoard();
    this.generateBoard = this.generateBoard.bind(this)
  }

  generateBoard() {
    let board = document.getElementById('board')
    for(let i = 0; i < this.size; i++){
      this.grid.push([]);
      this.htmlGrid.push([]);
      for(let j = 0; j < this.size; j++){
        const tile = new Tile(this, [i, j]);
        let cube = document.createElement('div')
        cube.classList.add('cube')
        this.grid[i].push(tile);
        board.appendChild(cube);
        this.htmlGrid.push(cube)
      }
    }
  }
}