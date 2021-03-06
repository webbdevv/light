import chai, { expect, should, assert } from 'chai'
import Entity from './entity'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'
import { CodeBlock } from './entity';

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function test0(func, args){
  let spy = sinon.spy(func);
  let error;
  try{
    expect(spy).to.not.throw(Error, "Syntax Error")
    let a = spy(2.5);
    expect(a).to.equal(true, "Those are not equal")
  } catch(err){
    error = err.message.split(":")[0];
  }
  return error
}

function test1(func){
  let spy = sinon.spy(func);
  let error;
  try{
    expect(spy).to.not.throw(Error, "Syntax Error")
    let a = spy();
    expect(a).to.equal(42, "That isn't the correct answer. So sorry for your loss.")
    expect(spy.callCount).to.equal(2);
  } catch(err){
    error = err.message.split(":")[0]
  }
  return error
}

function test2(func){
  let spy = sinon.spy(func);
  let entity = new Entity();
  spy = spy.bind(entity);
  let error;
  try{
    expect(spy).to.not.throw(Error, "Syntax Error");
    expect(spy()).to.equal(false, "Entities should be alive if they are at full life");
    entity.life = 0;
    expect(spy()).to.equal(true, "Entities should die when they are at 0 life");
  } catch (err){
    error = err.message.split(":")[0]
  }
  return error;
}

function test3(func){
  let spy = sinon.spy(func);
  let error;
  let a = new Entity();
  let b = new Entity();
  let c = new Entity();
  window.entities = [a, b, c];
  window.destroyAll = spy;
  try{
    spy(entities);
    expect(window.entities).to.have.lengthOf(0, "Entities should be cleared from their containing array when they are destroyed. Wouldn't want to hold onto the dead bodies would we?");
    expect(spy.callCount).to.be.above(3, "Recursion please");
    expect(spy.callCount).to.be.below(5, "Recursion please");
  } catch(err){
    error = err.message.split(":")[0]
  }
  return error;
}

function test4(func){
  let spy = sinon.spy(func);
  let error;
  let entity = new Entity();
  spy = spy.bind(entity)
  try{
    expect(spy).to.not.throw(Error, "Syntax error");
    expect(arraysEqual(entity.position, [0, 0])).to.equal(true, 'Without calling move the entity should not move');
      spy('down')
    expect(arraysEqual(entity.position, [1, 0])).to.equal(true, 'Moving up should move up');
      spy('right')
    expect(arraysEqual(entity.position, [1, 1])).to.equal(true, 'Moving left should do accordingly')
      spy('left')
    expect(arraysEqual(entity.position, [1, 0])).to.equal(true, 'Moving right should do accordingly')
      spy('up')
    expect(arraysEqual(entity.position, [0, 0])).to.equal(true, 'Moving down should do accordingly')

  } catch (err){
    error = err.message.split(':')[0]
  }
  return error
}

function test5(func, game){
  let entity = new Entity()
  func = func.bind(entity);
  let spy = sinon.spy(func);
  window.moveTo = spy
  let error;


  try {
    expect(arraysEqual(entity.position, [0, 0])).to.equal(true, 'Without calling move the entity should not move');
    expect(spy).to.not.throw(Error, "Something went wrong with your function")
    spy([7, 7]);
    expect(spy.callCount).to.be.above(1, "moveTo must be called recursively");
    expect(arraysEqual(entity.position, [7, 7])).to.equal(true, 'Movement did not work as expected')
    spy([3, 3]);
    expect(arraysEqual(entity.position, [3, 3])).to.equal(true, 'Movement did not work as expected')
  } catch(err){
    error = err.message.split(':')[0] //Chai returns error messages split by colon, first one is string provided so that's what we want
  }
  return error;
}

function test6(func, game){
  let error;
  const light = game.light;
  let prevPos = [0, 0]
  let endPos = [5, 5]
  try {
    expect(arraysEqual(light.position, prevPos)).to.equal(true, 'Light, you have to start at 0, 0');
    func(light);
    expect(arraysEqual(light.position, endPos)).to.equal(true, "Light didn't move the the right place")
    game.moveLight(prevPos);
    return
  } catch(err){
    light.position = [0, 0] //reset on failure
    error = err.message.split(':')[0]
    return error
  }
}

function test7(func, game){
  let error;
  const light = game.light;
  let prevPos = [5, 5];
  let [posY, posX] = light.position
  try{
    expect(arraysEqual(light.position, prevPos)).to.equal(true, "Light, you should start at [5, 5]");
    func(game.board.grid, light);
    if(game.board.grid[posY][posX] instanceof CodeBlock){
      return;  
    }
    expect(arraysEqual(light.position, [19, 19])).to.equal(true, "Light needs to move to the square at 19, 19");
  } catch(err){
    light.position = [5, 5] //reset on failure
    error = err.message.split(':')[0]
    return error
  }
}

export const testarr = [test0, test1, test2, test3, test4, test5, test6, test7]
