import chai, { expect, should, assert } from 'chai'
import Entity from './entity'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

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

export const testarr = [test0, test1, test2, test3]
