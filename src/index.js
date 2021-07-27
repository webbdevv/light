//Add threejs as a conventional name
const THREE = require('three');
import setup from './scripts/setup'
import Plane from './scripts/plane';
import Game from './scripts/game';

document.addEventListener('DOMContentLoaded', () => {
  setup(); //assign scene to new variable to do more with it in the future
  const plane = new Plane();
  plane.setup();    //create rotating cube and utilities necessary for 3d rendering
  document.getElementById('play').addEventListener('click', () => {
    const game = new Game();
    game.play()
  });
})

//to recreate function
function testMyColors(variable1, variable2, v3){
  if(v3){

  } else{
    variable1;
  }
  let mine;
}