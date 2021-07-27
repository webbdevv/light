import assert from 'assert'

const extractFunction = function(data){
  data = data.toString();
  let left = data.indexOf('{')
  let right = data.indexOf('}')
  if(left === -1 || right === -1){
    return undefined
  }
  return data.slice(left + 1, right).trim()
}


let sampleFunction = function(abcd){
  return abcd;
}

describe('#extractFunction', function(){
  it('should return the body of a function', function(){
    assert.strictEqual(extractFunction(sampleFunction), 'return abcd;')
  });
})