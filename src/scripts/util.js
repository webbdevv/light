export const extractFunction = function(data){
  data = data.toString();
  let left = data.indexOf('//')
  let f = data.slice(left + 15);
  let right = f.indexOf('}')
  if(left === -1 || right === -1){
    return undefined
  }
  return f.slice(2, right - 1).trim()
}
