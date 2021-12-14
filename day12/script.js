const test = `start-co
ip-WE
end-WE
le-ls
wt-zi
end-sz
wt-RI
wt-sz
zi-start
wt-ip
YT-sz
RI-start
le-end
ip-sz
WE-sz
le-WE
le-wt
zi-ip
RI-zi
co-zi
co-le
WB-zi
wt-WE
co-RI
RI-ip`
let lines = test.split(/\n/)
const paths = {}

for (const line of lines) {
  const [b, e] = line.split("-");
  paths[b] = [...(paths[b] ?? []), e];
  paths[e] = [...(paths[e] ?? []), b];
}

const found = [];

function pathFind(pos, current) {
  if (pos === "end") {
    found.push([...current, pos]);
    return;
  }
  const next = [...current, pos];
  for (const dir of paths[pos]) if (dir.toLowerCase() !== dir || current.indexOf(dir) === -1) pathFind(dir, next);
}

pathFind("start", []);

console.log(found.length);