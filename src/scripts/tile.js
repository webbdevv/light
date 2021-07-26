export default class Tile{
  constructor(board, pos){
    this.board = board;
    this.pos = pos;
    document.getElementById('board').appendChild('cube');
  } 
}