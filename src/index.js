//Add threejs as a conventional name
import setup from './scripts/setup'
import Plane from './scripts/plane';
import Game from './scripts/game';
const currentFunction = (fnc, ...args) => {
  return new Function(...args, fnc)
}
window.currentFunction = currentFunction;
// basic setup for generating dynamic functions is as follows
document.addEventListener('DOMContentLoaded', () => {
  setup(); //assign scene to new variable to do more with it in the future
  const plane = new Plane();
  plane.setup();    //create rotating cube and utilities necessary for 3d rendering
  document.getElementById('play').addEventListener('click', () => {
    const game = new Game();
    game.play();
    document.getElementById('play').style.display = 'none'
  });
})
