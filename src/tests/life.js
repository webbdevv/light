let assert = require('assert')
import { life } from '../scripts/plane';
describe('#test', function(){
  it('should return the correct value', function(){
    assert.strictEqual(life(), 42)
  })
})