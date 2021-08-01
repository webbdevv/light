import Entity from "./entity";
import { extractFunction } from "./util";
import { testarr } from './test';
import textnodes from './textnodes'
import Board from './board'
import { createTemplates, createAnswers } from './templates'
import puzzles from './puzzles'

export default class Game {
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: textnodes,
      puzzles: puzzles,
      currentPage: 11, //9
      currentPuzzle: 5, //4
    }
    this.light = new Entity()
    this.board = undefined;
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
      case 1: //puzzle 1
      this.setupPuzzle();
      this.codeMirror.doc.setBookmark({line: 1, ch: 0})
      this.codeMirror.doc.setBookmark({line: 2, ch: 0});
        break;
      case 3: //second puzzle
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 1, ch: 0})
        this.codeMirror.doc.setBookmark({line: 2, ch: 0});
        break;
      case 6: //isDead puzzle
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 6, ch: 0})
        this.codeMirror.doc.setBookmark({line: 7, ch: 0});
        break;
      case 7: //recursion puzzle
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 13, ch: 0})
        this.codeMirror.doc.setBookmark({line: 14, ch: 0});
        break;
      case 9: //making move function
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 18, ch: 0})
        this.codeMirror.doc.setBookmark({line: 22, ch: 0});
        break;
      case 11: //moving to a new location
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 23, ch: 0})
        this.codeMirror.doc.setBookmark({line: 24, ch: 0});
        break;
      case 12: //move to a code block for the first time currentPuzzle=6
        this.setupPuzzle();
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

    //errors cleanup
    document.getElementById('error-msg').innerHTML = ''
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
    debugger
    let marks = this.codeMirror.doc.getAllMarks();
    let code = this.codeMirror.doc.getRange(marks[0].find(), marks[1].find()).trim();
    let args = this.handleArguments();
    let func = window.currentFunction(code, args);
    let err = testarr[this.gameState.currentPuzzle](func);
    if(!err){
      this.gameState.puzzles[this.gameState.currentPuzzle].userSolution = code
      switch(this.gameState.currentPuzzle){
        case 4:
          this.board = new Board(20);
          document.querySelector('#game > canvas').remove()
          document.querySelector('#board').classList.add('active')
          this.board.htmlGrid[this.light.position[0]][this.light.position[1]].style.backgroundColor = 'white'
          break;
        default:
          break;
      }
      this.cleanupPuzzle();
    } else {
      document.getElementById('error-msg').innerHTML = err
    }
  }

  grabCode(){

  }

  moveLight(){

  }

  handleArguments(){
    switch(this.gameState.currentPuzzle){
      case 0:
        return 'two';
      case 4:
        return 'direction';
      case 5:
        return 'position';
      case 6: 
        return 'daBaby';
      default:
        return undefined;
    }
  }
  play(){
    //First begin by darkening screen and writing first function
    this.generateText(2);
    document.getElementById('next-btn').innerHTML = 'Next';
    document.getElementById('next-btn').addEventListener('click', this.nextPage)
    document.getElementById('play').removeEventListener('click', this.play)
  }

  nextPage(){
    this.gameState.currentPage++;
    this.generateText(2);
  }
}

//workflow

//textnodes
//code inside the class itself
//update puzzle title and id
//template
//handle arguments if needed
//Code solution
//code test
//handle cleanup