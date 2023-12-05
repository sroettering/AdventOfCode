import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const findMap = (name) => {
    const startingLine = inputLines.findIndex((line) => line.startsWith(name));
    const endingLine = inputLines.findIndex((line, index) => line.includes('map:') && index > startingLine);
    return inputLines.slice(startingLine + 1, endingLine === -1 ? undefined : endingLine);
}

const getMappedValue = (node, map) => {
    const mapEntry = map.find(({ src, range }) => node >= src && node < src + range);
    if (!mapEntry) {
        return node;
    }
    return (node - mapEntry.src) + mapEntry.dest;
};

const parseSeeds = () => {
    const seedValues = inputLines[0].split(' ').slice(1)
        .map(Number);
    const seeds = [];
    for (let i = 0; i < seedValues.length; i = i + 2) {
        seeds.push({ start: seedValues[i], range: seedValues[i + 1] });
    }
    return seeds;
};

const maps = [
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:',
].map((mapName) => findMap(mapName))
    .map((rawMap) => rawMap.map((line) => {
        const [dest, src, range] = line.split(' ').map(Number);
        return { src, dest, range };
    }));

const traverse = (seed) => {
    let location = seed;
    for (let c = 0; c < maps.length; c++) {
        location = getMappedValue(location, maps[c]);
    }
    return location;
};

function *seedGenerator() {
    const seeds = parseSeeds();
    for (let i = 0; i < seeds.length; i++) {
        yield seeds[i];
    }
}

console.time('traverse');
let location = Infinity;
for (let seed of seedGenerator()) {
    console.log(seed);
    for (let s = seed.start; s < seed.start + seed.range; s++) {
        const result = traverse(s);
        location = Math.min(location, result);
    }
}
console.timeEnd('traverse');

console.log(location);
// 4917124
