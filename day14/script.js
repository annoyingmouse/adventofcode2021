// const input = `NNCB
//
// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`

const input = `PSVVKKCNBPNBBHNSFKBO

CF -> H
PP -> H
SP -> V
NO -> C
SF -> F
FS -> H
OF -> P
PN -> B
SH -> V
BO -> K
ON -> V
VP -> S
HN -> B
PS -> P
FV -> H
NC -> N
FN -> S
PF -> F
BF -> F
NB -> O
HS -> C
SC -> V
PC -> K
KF -> K
HC -> C
OK -> H
KS -> P
VF -> C
NV -> S
KK -> F
HV -> H
SV -> V
KC -> N
HF -> P
SN -> F
VS -> P
VN -> F
VH -> C
OB -> K
VV -> O
VC -> O
KP -> V
OP -> C
HO -> S
NP -> K
HB -> C
CS -> S
OO -> S
CV -> K
BS -> F
BH -> P
HP -> P
PK -> B
BB -> H
PV -> N
VO -> P
SS -> B
CC -> F
BC -> V
FF -> S
HK -> V
OH -> N
BV -> C
CP -> F
KN -> K
NN -> S
FB -> F
PH -> O
FH -> N
FK -> P
CK -> V
CN -> S
BP -> K
CH -> F
FP -> K
HH -> N
NF -> C
VB -> B
FO -> N
PB -> C
KH -> K
PO -> K
OV -> F
NH -> H
KV -> B
OS -> K
OC -> K
FC -> H
SO -> H
KO -> P
NS -> F
CB -> C
CO -> F
KB -> V
BK -> K
NK -> O
SK -> C
SB -> B
VK -> O
BN -> H`


let initial = input.split(/\n\n/)[0]

const rules = Object.fromEntries(input.split(/\n\n/)[1].split(/\n/).map(str => str.split(' -> ')));
console.log(rules)

const instructions = input.split(/\n\n/)[1].split(/\n/).map(line => ({target: line.split(' -> ')[0], insert: line.split(' -> ')[1]}))

/*
 * Part 2
 */
let pairs = {};

for (let i = 1; i < initial.length; i++) {
  const pair = initial[i - 1] + initial[i];
  if (!(pair in pairs)) pairs[pair] = 0;
  pairs[pair] += 1;
}

for (let step = 0; step < 40; step++) {
  let newPairs = {};

  for (const [pair, cnt] of Object.entries(pairs)) {
    // Each pair that has an existing rule will split into 2 new pairs
    if (pair in rules) {
      const pair1 = pair[0] + rules[pair];
      const pair2 = rules[pair] + pair[1];

      if (!(pair1 in newPairs)) newPairs[pair1] = 0;
      if (!(pair2 in newPairs)) newPairs[pair2] = 0;

      newPairs[pair1] += cnt;
      newPairs[pair2] += cnt;
    }
  }

  pairs = {...newPairs};
}

const charCounts = {};

for (const [pair, cnt] of Object.entries(pairs)) {
  if (!(pair[0] in charCounts)) charCounts[pair[0]] = 0;
  if (!(pair[1] in charCounts)) charCounts[pair[1]] = 0;

  charCounts[pair[0]] += cnt;
  charCounts[pair[1]] += cnt;
}

let leastCommon = Infinity;
let mostCommon = 0;

Object.values(charCounts).forEach(count => {
  // Rounding error due to first and last character in polymer chain occurring only once
  let realCount = Math.ceil(count / 2);

  if (realCount < leastCommon) leastCommon = realCount;
  if (realCount > mostCommon) mostCommon = realCount;
});

console.log(mostCommon - leastCommon);









/*
 * Part 1
 */
// const instructionsMap = new Map();
// instructions.forEach(instuction => {
//   const targetParts = instuction.target.split('')
//   const first = targetParts[0]
//   const second = instuction.insert
//   const third = targetParts[1]
//   instructionsMap.set(instuction.target, [first, second, third].join(''))
// })
//
// const generatePairs = str => str.split('').reduce((p, c, i, a) => {
//   if(i < a.length - 1){
//     p.push([c, a[i + 1]].join(''))
//   }
//   return p
// }, [])
//
// for(let i = 0; i < 10; i++){
//   const subarrs = generatePairs(initial)
//   for(let p = 0; p < subarrs.length; p++){
//     subarrs[p] = p
//       ? instructionsMap.get(subarrs[p]).substring(1)
//       : instructionsMap.get(subarrs[p])
//   }
//   initial = subarrs.join('')
// }
//
// const uniqs = initial.split('').reduce((p, c) => {
//   p[c] = p[c] === undefined ? 1 : p[c] += 1;
//   return p;
// }, {});

//console.log(Math.max(...Object.values(uniqs)) - Math.min(...Object.values(uniqs)))
