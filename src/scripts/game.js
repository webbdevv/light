import { extractFunction } from "./util";
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
          text: `We'll start simple today, reckoning with your mortality would be a good place to start.
          Check the panel on the right and answer it well.`
        },
        {
          id: 3,
          text: `Not too difficult right? Life is so simple, really.`
        },
        {
          id: 4,
          text: `Well then Light, we've had our fun. Time to start setting the stage.`
        },
        {
          id: 5,
          text: `As it is now, life doesn't amount to so much. Let's give it some more meaning, shall we?`
        }
      ],
      puzzles: [
        {
          id: 1,
          template: `function answerToLife(){return}`,
          header: 'Life, The Universe, and Everything',
          hint: `The Hitchhiker's Guide to the Galaxy`,
          correctReturn: 42,
        },
        {
          id: 2,
          template: `function death(){return}`,
          header: `Making Death`,
          correctReturn: 100,
        }
      ],
      currentPage: 0,
      currentPuzzle: 0,
    }
    this.nextPage = this.nextPage.bind(this);
    this.generatePuzzle = this.generatePuzzle.bind(this);
    this.submitCode = this.submitCode.bind(this);
  }

  generateText(interval, text = this.gameState.textNodes[this.gameState.currentPage].text, idx = 0, target = document.getElementById('text-body')){
    if(idx === 0) {
      document.getElementById('text-sender').innerHTML = '???'
      target.innerHTML = '';
      this.generatePuzzle()
    }
    if(idx < text.length){
      target.innerHTML += text[idx++];
      setTimeout(() => { this.generateText(interval, text, idx)}, interval)
    }
    if(idx === text.length - 1){
      setTimeout(() => console.log('hello'), 1000);
    }
  }

  generatePuzzle(){
    switch(this.gameState.currentPage){
      case 1: //first puzzle
        const puzzle = this.gameState.puzzles[this.gameState.currentPuzzle]
        document.getElementById('next-btn').style.display = 'none';
        this.codeMirror.setValue(puzzle.template);
        document.getElementById('function-header').innerHTML = puzzle.header;
        let codeBtn = document.getElementById('submit-code')
        codeBtn.innerHTML = 'Submit';
        codeBtn.addEventListener('click', this.submitCode)
        break;
    }
  }

  cleanupPuzzle(){
    document.getElementById('function-header').innerHTML = '';
    this.codeMirror.setValue('');
    codeBtn = document.getElementById('submit-code').style.display = 'none'
  }

  submitCode(){ 
    let code = document.querySelector('.CodeMirror').CodeMirror.doc.getValue()
    code = extractFunction(code);
    let func = new Function(code);
    if(func() === this.gameState.puzzles[this.gameState.currentPuzzle].correctReturn){
      console.log('success')
    } else {
      console.log('failure');
    }
  }

  play(){
    //First begin by darkening screen and writing first function
    this.generateText(20);
    document.getElementById('next-btn').innerHTML = 'Next';
    document.getElementById('next-btn').addEventListener('click', this.nextPage)
  }

  nextPage(){
    this.gameState.currentPage++;
    this.generateText(20);
  }
}
