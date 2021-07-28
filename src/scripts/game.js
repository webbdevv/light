import { extractFunction } from "./util";
import { testarr } from './test';
import puzzles from './puzzles'
import textnodes from './textnodes'
export default class Game{
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: textnodes,
      puzzles: puzzles,
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
    this.gameState.puzzles[this.gameState.currentPuzzle].userWritten = this.codeMirror.doc.value
    this.gameState.currentPuzzle++;
    document.getElementById('function-header').innerHTML = '';
    this.codeMirror.setValue('');
    document.getElementById('submit-code').innerHTML = '';
    this.nextPage();
  }

  submitCode(){ 
    let code = document.querySelector('.CodeMirror').CodeMirror.doc.getValue()
    code = extractFunction(code);
    let func = window.currentFunction(code, 'a', 'b', 'c');
    if(func() === this.gameState.puzzles[this.gameState.currentPuzzle].correctReturn && testarr[this.gameState.currentPuzzle](func).length <= 0){
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
}
