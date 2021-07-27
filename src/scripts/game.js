import { extractFunction } from "./util";
export default class Game{
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: [
        {
          id: 1,
          text: 'Hello Light, I welcome you to your new home. Enjoy your stay.'
        },
        {
          id: 2,
          text: `We'll start simple today, finding the meaning of life is a good place to start.
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
          text: `As you can see, life doesn't amount to much as it is now. Let's add some more spice, shall we?`
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
          template: `function Death(){return}`,
          header: `The Meaning of Life`,
          correctReturn: 100,
        }
      ],
      currentPage: 0,
      currentPuzzle: 0,
    }
    this.nextPage = this.nextPage.bind(this);
    this.generatePuzzle = this.generatePuzzle.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.cleanupPuzzle = this.cleanupPuzzle.bind(this);
    this.setupPuzzle = this.setupPuzzle.bind(this);
  }

  generateText(interval, text = this.gameState.textNodes[this.gameState.currentPage].text, idx = 0, target = document.getElementById('text-body')){
    if(idx === 0) {
      document.getElementById('text-sender').innerHTML = '???'
      document.getElementById('next-btn').style.display = 'inline-block';
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
        this.setupPuzzle();
        break;
      case 4:
        this.setupPuzzle();
        break;
    }
  }

  setupPuzzle(){
    const puzzle = this.gameState.puzzles[this.gameState.currentPuzzle]
    document.getElementById('next-btn').style.display = 'none';
    this.codeMirror.setValue(puzzle.template);
    document.getElementById('function-header').innerHTML = puzzle.header;
    let codeBtn = document.getElementById('submit-code')
    codeBtn.innerHTML = 'Submit';
    codeBtn.addEventListener('click', this.submitCode)
  }

  cleanupPuzzle(){
    document.getElementById('submit-code').removeEventListener('click', this.submitCode);
    this.gameState.currentPuzzle++;
    document.getElementById('function-header').innerHTML = '';
    this.codeMirror.setValue('');
    document.getElementById('submit-code').innerHTML = '';
    this.nextPage();
  }

  submitCode(){ 
    let code = document.querySelector('.CodeMirror').CodeMirror.doc.getValue()
    code = extractFunction(code);
    let func = new Function(code);
    if(func() === this.gameState.puzzles[this.gameState.currentPuzzle].correctReturn){
      this.cleanupPuzzle();
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

  test(){

  }
}
