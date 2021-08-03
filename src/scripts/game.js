import Entity from "./entity";
import { Wall, CodeBlock } from './entity'
import { testarr } from './test';
import textnodes from './textnodes'
import Board from './board'
import Tile from './tile'
import { createTemplates, createAnswers } from './templates'
import puzzles from './puzzles'

export default class Game {
  constructor(){
    this.codeMirror = document.querySelector('.CodeMirror').CodeMirror
    this.gameState = {
      textNodes: textnodes,
      puzzles: puzzles,
      currentPage: 0, //11
      currentPuzzle: 0, //5
    }
    this.light = new Entity();
    this.board = undefined;
    this.gridCopy = [];
    this.nextPage = this.nextPage.bind(this);
    this.generatePuzzle = this.generatePuzzle.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.cleanupPuzzle = this.cleanupPuzzle.bind(this);
    this.setupPuzzle = this.setupPuzzle.bind(this);
    this.handleArguments = this.handleArguments.bind(this);
    this.resetCode = this.resetCode.bind(this);
    this.moveLight = this.moveLight.bind(this);
    this.generateWalls = this.generateWalls.bind(this);
    this.copyGrid = this.copyGrid.bind(this)
    this.showHint = this.showHint.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  generateText(interval, err = false, text = this.gameState.textNodes[this.gameState.currentPage].text, idx = 0, target = document.getElementById('text-body')){
    if(idx === 0) {
      document.getElementById('text-sender').innerHTML = '???'
      target.innerHTML = '';
      if(!err){
        document.getElementById('next-btn').style.display = 'inline-block';
        this.generatePuzzle()
      }
    }
    if(idx < text.length){
      target.innerHTML += text[idx++];
      setTimeout(() => { this.generateText(interval, err, text, idx)}, interval)
    }
    if(idx === text.length - 1){
      setTimeout(() => {}, 1000);
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
        this.codeMirror.doc.setBookmark({line: 21, ch: 0})
        this.codeMirror.doc.setBookmark({line: 23, ch: 0});
        break;
      case 12: //move to a code block for the first time currentPuzzle=6
        this.setupPuzzle();
        this.codeMirror.doc.setBookmark({line: 8, ch: 0})
        this.codeMirror.doc.setBookmark({line: 9, ch: 0})
        break;
      case 14: //making the walls for the first time
        this.setupPuzzle();
        this.generateWalls();
        this.board.grid[19][19] = new CodeBlock()
        this.codeMirror.doc.setBookmark({line: 8, ch: 0})
        this.codeMirror.doc.setBookmark({line: 9, ch: 0})
        if(this.board){
          this.gridCopy = this.copyGrid(this.board.grid);
        }
        this.board.htmlGrid[19][19].style.backgroundColor = 'red';
    }
  }

  generateWalls(){
    
    for(let i = 19; i >= 17; i--){ //Wall Sheena
      this.board.grid[i][17] = new Wall([i, 17]);
      this.board.htmlGrid[i][17].style.backgroundColor = 'white';
      this.board.grid[17][i] = new Wall([17, i]);
      this.board.htmlGrid[17][i].style.backgroundColor = 'white';
    }
    
    for(let i = 19; i >= 15; i--){
      this.board.grid[i][15] = new Wall([i, 15]);
      this.board.htmlGrid[i][15].style.backgroundColor = 'white';
      this.board.grid[15][i] = new Wall([15, i]);
      this.board.htmlGrid[15][i].style.backgroundColor = 'white';
    }

    for(let i = 19; i >= 13; i--){
      this.board.grid[i][13] = new Wall([i, 13]);
      this.board.htmlGrid[i][13].style.backgroundColor = 'white';
      this.board.grid[13][i] = new Wall([13, i]);
      this.board.htmlGrid[13][i].style.backgroundColor = 'white';
    }
  }

  copyGrid(source, target = []){
    source.forEach((row,idx1) => {
      target.push([])
      row.forEach((el) => {
        if(el instanceof Tile){
          target[idx1].push(new Tile(el.position))
        } else if(el instanceof Wall){
          target[idx1].push(new Wall(el.position))
        } else if(el instanceof CodeBlock){
          target[idx1].push(new CodeBlock(el.position));
        }
      })
    })
    return target;
  }

  setupPuzzle(){
    const puzzle = this.gameState.puzzles[this.gameState.currentPuzzle]
    document.getElementById('next-btn').style.display = 'none';
    puzzle.template = createAnswers(this.gameState);

    if(this.board){
      this.gridCopy = this.copyGrid(this.board.grid);
    }

    //setup code block
    this.codeMirror.setValue(puzzle.template);
    document.getElementById('function-header').innerHTML = puzzle.header;

    //Setup reset
    let reset = document.getElementById('reset-code')
    reset.innerHTML = 'Reset';
    reset.addEventListener('click', this.resetCode);
    
    //setup get answer
    let answer = document.getElementById('get-answer');
    answer.innerHTML = "Answer"

    //setup submission
    let codeBtn = document.getElementById('submit-code')
    codeBtn.innerHTML = 'Submit';
    codeBtn.addEventListener('click', this.submitCode)
  }

  resetCode(){
    let template = createAnswers(this.gameState);
    if(this.board){
      this.board.grid = this.copyGrid(this.gridCopy);
    }
    this.codeMirror.setValue(template);
    //reset bookmarks
    switch(this.gameState.currentPage){
      case 1:
      this.codeMirror.doc.setBookmark({line: 1, ch: 0})
      this.codeMirror.doc.setBookmark({line: 2, ch: 0});
        break;
      case 3: //second puzzle
        this.codeMirror.doc.setBookmark({line: 1, ch: 0})
        this.codeMirror.doc.setBookmark({line: 2, ch: 0});
        break;
      case 6: //isDead puzzle
        this.codeMirror.doc.setBookmark({line: 6, ch: 0})
        this.codeMirror.doc.setBookmark({line: 7, ch: 0});
        break;
      case 7: //recursion puzzle
        this.codeMirror.doc.setBookmark({line: 13, ch: 0})
        this.codeMirror.doc.setBookmark({line: 14, ch: 0});
        break;
      case 9: //making move function
        this.codeMirror.doc.setBookmark({line: 18, ch: 0})
        this.codeMirror.doc.setBookmark({line: 22, ch: 0});
        break;
      case 11: //moving to a new location
        this.codeMirror.doc.setBookmark({line: 21, ch: 0})
        this.codeMirror.doc.setBookmark({line: 23, ch: 0});
        break;
      case 12: //move to a code block for the first time currentPuzzle=6
        this.codeMirror.doc.setBookmark({line: 8, ch: 0})
        this.codeMirror.doc.setBookmark({line: 9, ch: 0})
        break;
      case 14: //making the walls for the first time
        this.codeMirror.doc.setBookmark({line: 8, ch: 0})
        this.codeMirror.doc.setBookmark({line: 9, ch: 0})
      } 
  }

  cleanupPuzzle(){
    //hint cleanup
    document.getElementById('hint').classList.remove('active');

    //errors cleanup
    document.getElementById('text-body').classList.remove('error')
    //reset cleanup
    document.getElementById('reset-code').innerHTML = ''
    //submit
    document.getElementById('submit-code').removeEventListener('click', this.submitCode);
    //Answer
    let answer = document.getElementById('get-answer');
    answer.innerHTML = ""

    this.gameState.currentPuzzle++;
    document.getElementById('function-header').innerHTML = '';
    this.codeMirror.setValue('');
    document.getElementById('submit-code').innerHTML = '';

    //move to next page
    this.nextPage();
  }

  submitCode(){ 
    let marks = this.codeMirror.doc.getAllMarks();
    let code = this.codeMirror.doc.getRange(marks[0].find(), marks[1].find()).trim();
    let args = this.handleArguments();
    let func = window.currentFunction(code, args);
    let err = testarr[this.gameState.currentPuzzle](func, this);  //test current function
    if(!err){
      this.gameState.puzzles[this.gameState.currentPuzzle].userSolution = code
      switch(this.gameState.currentPuzzle){
        case 5:
          this.board = new Board(20);
          document.querySelector('#game > canvas').remove()
          document.querySelector('#board').classList.add('active')
          this.board.htmlGrid[this.light.position[0]][this.light.position[1]].style.backgroundColor = 'white'
          this.board.htmlGrid[5][5].style.backgroundColor = '#d32f2f';
          this.light.board = this.board
          break;
        default:
          break;
      }
      this.cleanupPuzzle();
    } else {
      document.getElementById('text-body').classList.add('error')
      this.generateText(15, true, err)
    }
  }

  showAnswer(){
    let hint = document.getElementById('hint')
    hint.classList.add('active');
    hint.innerHTML = this.gameState.puzzles[this.gameState.currentPuzzle].answer
  }
   
  showHint(){
    let hint = document.getElementById('hint')
    hint.classList.toggle('active');
    hint.innerHTML = this.gameState.puzzles[this.gameState.currentPuzzle].hint
  }

  moveLight(prev){
    let [posY, posX] = prev
    this.board.htmlGrid[posY][posX].style.backgroundColor = 'inherit'
    let [curPosY, curPosX] = this.light.position;
    this.board.htmlGrid[curPosY][curPosX].style.backgroundColor = 'white';
    this.board.htmlGrid[curPosY][curPosX].style.borderColor = 'white';
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
        return 'baby';
      case 7:
        return ['grid', 'light'];
      default:
        return undefined;
    }
  }
  play(){
    //First begin by darkening screen and writing first function
    this.generateText(2, false);
    document.getElementById('next-btn').innerHTML = 'Next';
    document.getElementById('next-btn').addEventListener('click', this.nextPage)
    document.getElementById('play').removeEventListener('click', this.play)
  }

  nextPage(){
    if(this.gameState.currentPage === 16){
      //remove from the DOM
      document.querySelector('#board').remove()
      let message = document.getElementById('end-message')
      message.style.display = 'block'
      document.getElementById('next-btn').innerHTML = '';
      document.getElementById('text-sender').innerHTML = '';
      document.getElementById('text-body').innerHTML = '';
      return;
    }

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