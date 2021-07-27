export default class Game{
  constructor(){
    this.won = false;
    this.puzzle = 0;
  }
  generateText(text, interval, idx = 0, target = document.getElementById('text-body')){
    if(idx === 0) {
      document.getElementById('text-sender').innerHTML = '???'
      target.innerHTML = '';
    }
    if(idx < text.length){
      target.innerHTML += text[idx++];
      setTimeout(() => { this.generateText(text, interval, idx)}, interval)
    }
  } 
}
