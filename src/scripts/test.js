import chai, { expect, should, assert } from 'chai'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

function test1(func){
  let spy = sinon.spy(func);
  let errors = [];
  try{
    expect(func).to.exist();
    let a = spy();
    expect(a).to.equal(42)
    expect(spy.callCount).to.equal(1);
    expect(spy).to.not.throw(Error)
  } catch(err){
    errors.push(err)
  }
  return errors
}

export const testarr = [test1]
