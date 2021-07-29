export const extractFunction = function(data){
  data = data.toString();
  let left = data.indexOf('//')
  let f = data.slice(left + 19).trim();
  let right = f.indexOf('/')
  if(left === -1 || right === -1){
    return undefined
  }
  return f.slice(0, right - 1).trim()
}
