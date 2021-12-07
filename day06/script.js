//const original = [3,4,3,1,2]
const original = [1,4,1,1,1,1,5,1,1,5,1,4,2,5,1,2,3,1,1,1,1,5,4,2,1,1,3,1,1,1,1,1,1,1,2,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,4,1,1,1,1,5,1,4,1,1,4,1,1,1,1,4,1,1,5,5,1,1,1,4,1,1,1,1,1,3,2,1,1,1,1,1,2,3,1,1,2,1,1,1,3,1,1,1,2,1,2,1,1,2,1,1,3,1,1,1,3,3,5,1,4,1,1,5,1,1,4,1,5,3,3,5,1,1,1,4,1,1,1,1,1,1,5,5,1,1,4,1,2,1,1,1,1,2,2,2,1,1,2,2,4,1,1,1,1,3,1,2,3,4,1,1,1,4,4,1,1,1,1,1,1,1,4,2,5,2,1,1,4,1,1,5,1,1,5,1,5,5,1,3,5,1,1,5,1,1,2,2,1,1,1,1,1,1,1,4,3,1,1,4,1,4,1,1,1,1,4,1,4,4,4,3,1,1,3,2,1,1,1,1,1,1,1,4,1,3,1,1,1,1,1,1,1,5,2,4,2,1,4,4,1,5,1,1,3,1,3,1,1,1,1,1,4,2,3,2,1,1,2,1,5,2,1,1,4,1,4,1,1,1,4,4,1,1,1,1,1,1,4,1,1,1,2,1,1,2]

const inputToObj = arr => arr.reduce((previousValue, currentValue) => {
    if(previousValue.hasOwnProperty(currentValue.toString())){
      previousValue[currentValue] += 1
    }else{
      previousValue[currentValue] = 1
    }
    return previousValue
  }, {})

let input = [...original]
let inputObj = inputToObj(input)

const process = obj => Object.keys(obj).map(e => Number(e)).sort().reverse().reduce((p, c) => {
  if(!c){
    p[8] = obj[c]
    p[6] = p[6] ? p[6] + obj[c] : obj[c]
  }else{
    p[currentValue - 1] = obj[currentValue]
  }
  return p
}, {})

for(let i = 0; i < 256; i++){
  inputObj = Object.assign({}, process(inputObj))
}

console.log(Object.keys(inputObj).reduce((previousValue, currentValue) => previousValue += inputObj[currentValue], 0))