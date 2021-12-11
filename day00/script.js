const shuffle = array => { // Fisher–Yates Shuffle from Mike Bostock
  const a = [...array]
  let m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = a[m];
    a[m] = a[i];
    a[i] = t;
  }
  return a;
}

const generateSecretSanta = givers => {
  const secretSantas = new Map()
  const recipients = [...shuffle(givers)]
  for(let i = 0; i < givers.length; i++){
    secretSantas.set(givers[i], recipients[i])
  }
  secretSantas.forEach((value, key) => {
    console.log(`${key} will give a 🎁 to ${value}`)
  })
}

const getSecretSanta = async file => {
  const response = await fetch(file)
  const text = await response.text()
  generateSecretSanta(text.split(/\r\n/))
}

getSecretSanta('names.txt')