const mini =
  [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1]
  ]

const test = `1254117228
4416873224
8354381553
1372637614
5586538553
7213333427
3571362825
1681126243
8718312138
5254266347`

const matrix = test.split(/\n/).reduce((t, c) => [...t, c.split('').map(s => Number(s))], [])
console.log(matrix)

let firstSynchronizedFlash;
let flashes = 0;
let turnCounter = 0;
function increaseEnergy({ i, j, explodedSet }) {
  // Check that it's a valid coordinate
  if (typeof matrix[i] === "undefined") return;
  if (typeof matrix[i][j] === "undefined") return;

  // Check it hasn't exploded yet
  const key = i + ":" + j;
  if (explodedSet.has(key)) {
    return;
  }

  // Act
  matrix[i][j]++;
  if (matrix[i][j] > 9) {
    // Explode!!!
    matrix[i][j] = 0;
    explodedSet.add(key);
    flashes++;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;

        increaseEnergy({ i: i + x, j: j + y, explodedSet });
      }
    }
    return;
  }
}
function turn() {
  turnCounter++;
  let explodedSet = new Set();

  // increase each spot by 1
  // if value> 9 then explode (on all 8 neighbors) / can only explode once per turn
  // once exploded, reset to 0
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let j = 0; j < line.length; j++) {
      increaseEnergy({ i, j, explodedSet });
    }
  }
  // console.table(matrix);
  if (
    typeof firstSynchronizedFlash === "undefined" &&
    explodedSet.size === matrix.length * matrix[0].length
  ) {
    firstSynchronizedFlash = turnCounter;
  }
}
for (let i = 0; i < 100; i++) {
  turn();
}
console.log(flashes);

if (typeof firstSynchronizedFlash === "undefined") {
  while (typeof firstSynchronizedFlash === "undefined") {
    turn();
  }
}

console.log(firstSynchronizedFlash);




// // const incrementAll = arr => {
// //   for(let y = 0; y < arr.length; y++){
// //     for(let x = 0; x < arr[y].length; x++){
// //       arr[y][x] = arr[y][x] += 1
// //     }
// //   }
// //   return arr
// // }
// const incrementNeighbours = (y, x, arr) => {
//
//   const inner = [...arr]
//   console.log('incrementNeighbours starting', inner)
//   for(let y = 0; y < inner.length; y++){
//     for(let x = 0; x < inner[y].length; x++){
//       inner[y][x] += 1
//     }
//   }
//   console.log('incrementNeighbours incremented original', inner)
//   const neighbours = [
//     [y - 1, x - 1], [y - 1, x],[y - 1, x + 1],
//     [y, x - 1],                [y + 1, x + 1],
//     [y + 1, x - 1], [y + 1, x],[y + 1, x + 1]
//   ]
//   for(let n = 0; n < neighbours.length; n++){
//     console.log(neighbours[n])
//     // if(inner[neighbours[n][0]] !== undefined && inner[neighbours[n][0][1]] !== undefined){
//     //   inner[arr[neighbours[n][0][1]]] += 1
//     // }
//   }
//   return inner
// }


// const flash = arr => {
//   let inner = [...arr]
//   while(!!~inner.flat().indexOf(9)){
//     for(let y = 0; y < inner.length; y++){
//       for(let x = 0; x < inner[y].length; x++){
//         if(inner[y][x] === 9){
//           console.log('found one')
//           inner = incrementNeighbours(y, x, inner)
//         }
//       }
//     }
//   }
//   console.log(inner)
// }

// const incrementAll = arr => {
//   let toExplode = new Set()
//   for(let y = 0; y < arr.length; y++){
//     for(let x = 0; x < arr[y].length; x++){
//       arr[y][x]++
//     }
//   }
// }
//
//
// const part1 = str => {
//   let arr = processStr(str)
//   console.log(JSON.parse(JSON.stringify(arr)))
//   for (let turn = 0; turn < 1; turn ++){
//     incrementAll(arr)
//   }
//   console.log(JSON.parse(JSON.stringify(arr)))
// }
//
// part1(test)