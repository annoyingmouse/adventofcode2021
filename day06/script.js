//const original = [3,4,3,1,2]
const original = [1,4,1,1,1,1,5,1,1,5,1,4,2,5,1,2,3,1,1,1,1,5,4,2,1,1,3,1,1,1,1,1,1,1,2,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,4,1,1,1,1,5,1,4,1,1,4,1,1,1,1,4,1,1,5,5,1,1,1,4,1,1,1,1,1,3,2,1,1,1,1,1,2,3,1,1,2,1,1,1,3,1,1,1,2,1,2,1,1,2,1,1,3,1,1,1,3,3,5,1,4,1,1,5,1,1,4,1,5,3,3,5,1,1,1,4,1,1,1,1,1,1,5,5,1,1,4,1,2,1,1,1,1,2,2,2,1,1,2,2,4,1,1,1,1,3,1,2,3,4,1,1,1,4,4,1,1,1,1,1,1,1,4,2,5,2,1,1,4,1,1,5,1,1,5,1,5,5,1,3,5,1,1,5,1,1,2,2,1,1,1,1,1,1,1,4,3,1,1,4,1,4,1,1,1,1,4,1,4,4,4,3,1,1,3,2,1,1,1,1,1,1,1,4,1,3,1,1,1,1,1,1,1,5,2,4,2,1,4,4,1,5,1,1,3,1,3,1,1,1,1,1,4,2,3,2,1,1,2,1,5,2,1,1,4,1,4,1,1,1,4,4,1,1,1,1,1,1,4,1,1,1,2,1,1,2]

const inputToObj = arr => {
  return arr.reduce((previousValue, currentValue) => {
    if(previousValue.hasOwnProperty(currentValue.toString())){
      previousValue[currentValue] += 1
    }else{
      previousValue[currentValue] = 1
    }
    return previousValue
  }, {})
}

let input = [...original]
let inputObj = inputToObj(input)

const process = obj => {
  const returnObj = {}
  const arrKeys = Object.keys(obj).map(e => Number(e)).sort().reverse()
  arrKeys.forEach(value => {
    if(!value){
      returnObj[8] = obj[value]
      if(returnObj[6]){
        returnObj[6] += obj[value]
      }else{
        returnObj[6] = obj[value]
      }
    }else{
      returnObj[value - 1] = obj[value]
    }
  })
  return returnObj
}

for(let i = 0; i < 256; i++){
  inputObj = JSON.parse(JSON.stringify(process(inputObj)))
}

console.log(Object.keys(inputObj).reduce((previousValue, currentValue) => previousValue += inputObj[currentValue], 0))