import chai, { expect, should } from 'chai'
import sinon from '../../node_modules/sinon/pkg/sinon-esm'

function str(){
  return 'asdf';
}

export function test(){
  let spy = sinon.spy(str);
  let res = spy();
  expect(res).to.equal('asdf');
  expect(1).to.satisfy(function(num) { return num > 0; } )
  expect(res).to.have.lengthOf(4);
  expect(spy.callCount).to.equal(1);
}