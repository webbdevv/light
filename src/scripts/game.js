export default class Game{
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: [
        {
          id: 1,
          text: 'Hello Light, I welcome you to your new home for the next eternity. Enjoy your stay'
        },
        {
          id: 2,
          text: "We'll start simple today, reckoning with your mortality would be a good place to start."
        }
      ],
      currentPage: 0
    }
    this.nextPage = this.nextPage.bind(this);
    this.hideBtn = this.hideBtn.bind(this);
  }
  generateText(interval, text = this.gameState.textNodes[this.gameState.currentPage].text, idx = 0, target = document.getElementById('text-body')){
    if(idx === 0) {
      document.getElementById('text-sender').innerHTML = '???'
      target.innerHTML = '';
      this.hideBtn()
    }
    if(idx < text.length){
      target.innerHTML += text[idx++];
      setTimeout(() => { this.generateText(interval, text, idx)}, interval)
    }
    if(idx === text.length - 1){
      setTimeout(() => console.log('hello'), 1000);
    }
  }

  hideBtn(){
    switch(this.gameState.currentPage){
      case 1: //first puzzle
        document.getElementById('next-btn').style.display = 'none';
        this.codeMirror.setValue('let a = 123');
        break;
    }
  }

  play(){
    //First begin by darkening screen and writing first function
    document.getElementById('next-btn').innerHTML = 'Next';
    this.generateText(20);
    document.getElementById('next-btn').addEventListener('click', this.nextPage)
  }

  nextPage(){
    this.gameState.currentPage++;
    this.generateText(20);
  }
}
