import chai, { expect, should } from 'chai'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

function str(){
  return 'asdf';
}

export function test(){
  let spy = sinon.spy(str);
  let res = spy();
  expect(res).to.equal('asdf');
  expect(res).to.have.lengthOf(4);
  console.log(spy)
  expect(spy.callCount).to.equal(1);
}