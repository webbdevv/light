//Add threejs as a conventional name
import setup from './scripts/setup'
import Plane from './scripts/plane';
import Game from './scripts/game';
import { test } from './scripts/test';
const currentFunction = (fnc) => {
  return new Function(fnc)
}
window.currentFunction = currentFunction;
// basic setup for generating dynamic functions is as follows
document.addEventListener('DOMContentLoaded', () => {
  setup(); //assign scene to new variable to do more with it in the future
  const plane = new Plane();
  plane.setup();    //create rotating cube and utilities necessary for 3d rendering
  document.getElementById('play').addEventListener('click', () => {
    const game = new Game();
    game.play()
  });
})
test();