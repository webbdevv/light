import chai, { expect, should, assert } from 'chai'
import Entity from './entity'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

function test0(func, args){
  let spy = sinon.spy(func);
  let errors = [];
  try{
    expect(spy).to.not.throw(Error)
    let a = spy(2.5);
    expect(a).to.equal(true)
  } catch(err){
    errors.push(err)
    console.log(err)
  }
  return errors
}

function test1(func){
  let spy = sinon.spy(func);
  let errors = [];
  try{
    expect(spy).to.not.throw(Error)
    let a = spy();
    expect(a).to.equal(42)
    expect(spy.callCount).to.equal(2);
  } catch(err){
    errors.push(err)
    console.log(err)
  }
  return errors
}

function test2(func){
  let spy = sinon.spy(func);
  let entity = new Entity();
  spy = spy.bind(entity);
  let errors = [];
  try{
    expect(spy).to.not.throw(Error);
    expect(spy()).to.equal(false);
    entity.life = 0;
    expect(spy()).to.equal(true);
  } catch (err){
    errors.push(err)
    console.log(err)
  }
  return errors;
}

function test3(func){
  let spy = sinon.spy(func);
  let errors = [];
  let a = new Entity();
  let b = new Entity();
  let c = new Entity();
  window.entities = [a, b, c];
  window.destroyAll = spy;
  try{
    spy(entities);
    expect(window.entities).to.be.empty;
    expect(spy.callCount).to.be.above(3);
    expect(spy.callCount).to.be.below(5);
  } catch(err){
    console.log(err)
    errors.push(err)
  }
  return errors;
}

export const testarr = [test0, test1, test2, test3]
