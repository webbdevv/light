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
          id: 0,
          header: '"Freedom is the freedom to say that two plus two make four"',
          hint: '1984 by George Orwell'
        },
        {
          id: 1,
          header: 'Life, The Universe, and Everything',
          hint: `The Hitchhiker's Guide to the Galaxy`,
        },
        {
          id: 2,
          header: `Death`,
        },
        {
          id: 3,
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
    this.handleArguments = this.handleArguments.bind(this);
    this.resetCode = this.resetCode.bind(this);
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
      case 1: //
        this.setupPuzzle();
        this.codeMirror.doc.markText({line:0}, {line:2, ch: 1000}, {readOnly: true})
        break;
      case 3: //second puzzle
        this.setupPuzzle();
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 2, ch: 1000}, {readOnly: true})
        this.codeMirror.doc.markText({line: 4, ch:0}, {line: 7, ch: 1000}, {readOnly: true})
        break;
      case 6:
        this.setupPuzzle();
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 7, ch: 1000}, {readOnly: true})
        this.codeMirror.doc.markText({line: 9, ch:0}, {line: 10, ch: 1000}, {readOnly: true})
        break;
      case 7: //recursion puzzle
        this.codeMirror.doc.markText({line: 0, ch:0}, {line: 15, ch: 1000}, {readOnly: true})
        this.setupPuzzle();
        break;
      // case 6: //

    }
  }

  setupPuzzle(){
    const puzzle = this.gameState.puzzles[this.gameState.currentPuzzle]
    document.getElementById('next-btn').style.display = 'none';
    puzzle.template = createAnswers(this.gameState);
    
    //setup code block
    this.codeMirror.setValue(puzzle.template);
    document.getElementById('function-header').innerHTML = puzzle.header;

    //Setup reset
    let reset = document.getElementById('reset-code')
    reset.innerHTML = 'Reset';
    reset.addEventListener('click', this.resetCode);
    
    //setup submission
    let codeBtn = document.getElementById('submit-code')
    codeBtn.innerHTML = 'Submit';
    codeBtn.addEventListener('click', this.submitCode)
  }

  resetCode(){
    let template = createAnswers(this.gameState);
    this.codeMirror.setValue(template);
  }

  cleanupPuzzle(){
    //reset cleanup
    let reset = document.getElementById('reset-code');
    reset.removeEventListener('click', this.resetCode)
    reset.innerHTML = '';

    //submit
    document.getElementById('submit-code').removeEventListener('click', this.submitCode);
    this.gameState.currentPuzzle++;
    document.getElementById('function-header').innerHTML = '';
    this.codeMirror.setValue('');
    document.getElementById('submit-code').innerHTML = '';

    //move to next page
    this.nextPage();
  }

  submitCode(){ 
    let code = document.querySelector('.CodeMirror').CodeMirror.doc.getValue()
    code = extractFunction(code);
    let args = this.handleArguments();
    let func = window.currentFunction(code, args);
    if(testarr[this.gameState.currentPuzzle](func).length <= 0){
      this.gameState.puzzles[this.gameState.currentPuzzle].userSolution = code
      this.cleanupPuzzle();
    } else {
      console.log('failure');
    }
  }

  handleArguments(){
    switch(this.gameState.currentPuzzle){
      case 0:
        return 'two';
      default:
        return undefined;
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
