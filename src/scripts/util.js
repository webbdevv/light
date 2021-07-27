export const extractFunction = function(data){
  data = data.toString();
  let left = data.indexOf('{')
  let right = data.indexOf('}')
  if(left === -1 || right === -1){
    return undefined
  }
  return data.slice(left + 1, right).trim()
}
