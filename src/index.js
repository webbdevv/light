//Add threejs as a conventional name
import setup from './scripts/setup'
import Plane from './scripts/plane';
import Game from './scripts/game';

const currentFunction = (data) => {
  return new Function(data);
}

// basic setup for generating dynamic functions is as follows
console.log(currentFunction('return 102;')())

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