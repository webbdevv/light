import chai, { expect, should, assert } from 'chai'
import Entity from './entity'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

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
  let entity = new Entity;
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
export const testarr = [test1, test2]
