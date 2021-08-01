import chai, { expect, should, assert } from 'chai'
import Entity from './entity'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

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
    console.log(error)
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
    console.log(err)
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
    console.log(err)
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
    console.log(err)
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
    entity.move('down')
    expect(arraysEqual(entity.position, [1, 0])).to.equal(true, 'Moving up should move up');
    entity.move('right')
    expect(arraysEqual(entity.position, [1, 1])).to.equal(true, 'Moving left should do accordingly')
    entity.move('left')
    expect(arraysEqual(entity.position, [1, 0])).to.equal(true, 'Moving right should do accordingly')
    entity.move('up')
    expect(arraysEqual(entity.position, [0, 0])).to.equal(true, 'Moving down should do accordingly')
  } catch (err){
    error = err.message.split(':')[0]
    console.log(err);
  }
  return error
}

function test5(func){
  let entity = new Entity()
}
export const testarr = [test0, test1, test2, test3, test4]
