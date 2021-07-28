import { extractFunction } from "./util";
import { testarr } from './test';
import textnodes from './textnodes'
import { createTemplates, createAnswers } from './templates'

export default class Game{
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: textnodes,
      puzzles: [
        {
          id: 1,
          template: '',
          header: 'Life, The Universe, and Everything',
          hint: `The Hitchhiker's Guide to the Galaxy`,
        },
        {
          id: 2,
          template: '',
          header: `Death`,
        },
        {
          id: 3,
          template: '',
          header: `Enti-cide?`,
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
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 2, ch: 1000}, {readOnly: true})
        this.codeMirror.doc.markText({line: 4, ch:0}, {line: 7, ch: 1000}, {readOnly: true})
        break;
      case 4:
        this.setupPuzzle();
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 7, ch: 1000}, {readOnly: true})
        this.codeMirror.doc.markText({line: 9, ch:0}, {line: 10, ch: 1000}, {readOnly: true})
        break;
      case 5:
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 15, ch: 1000}, {readOnly: true})
        this.setupPuzzle();
    }
  }

  setupPuzzle(){
    const puzzle = this.gameState.puzzles[this.gameState.currentPuzzle]
    document.getElementById('next-btn').style.display = 'none';
    puzzle.template = createAnswers(this.gameState)
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
    let func = window.currentFunction(code);
    if(testarr[this.gameState.currentPuzzle](func).length <= 0){
      this.gameState.puzzles[this.gameState.currentPuzzle].userSolution = code
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
    document.getElementById('play').removeEventListener('click', this.play)
  }

  nextPage(){
    this.gameState.currentPage++;
    this.generateText(20);
  }
}
