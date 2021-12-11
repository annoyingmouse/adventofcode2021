const mini =
  [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1]
  ]

const test = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const processStr = str => str.split(/\n/).reduce((t, c) => [...t, c.split('').map(s => Number(s))], [])
const incrementAll = arr => {
  for(let y = 0; y < arr.length; y++){
    for(let x = 0; x < arr[y].length; x++){
      arr[y][x] = arr[y][x] += 1
    }
  }
  return arr
}
const incrementNeighbours = (y, x, arr) => {
  const neighbours = [
    [y - 1, x - 1], [y - 1, x],[y - 1, x + 1],
    [y, x - 1],                [y + 1, x + 1],
    [y + 1, x - 1], [y + 1, x],[y + 1, x + 1]
  ]

}


const flash = arr => {
  let inner = [...arr]
  console.log(inner)
  const nines = []
  while(!!~inner.flat().indexOf(9)){
    for(let y = 0; y < inner.length; y++){
      for(let x = 0; x < inner[y].length; x++){
        if(inner[y][x] > 9){
          nines.push([y, x])
          incrementNeighbours(y, x, inner)
          inner[y][x] = 0
        }
      }
    }
  }

}


const part1 = str => {
  let arr = processStr(str)
  console.log(JSON.parse(JSON.stringify(arr)))
  arr = incrementAll(arr)
  console.log(JSON.parse(JSON.stringify(arr)))
  //arr = flash(arr)
}

flash(mini)
//part1(test)
