import { readInput } from '../../helpers/read-input.js';

// Fast version of part 2

const inputLines = readInput(new URL('day-5-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const findMap = (name) => {
    const startingLine = inputLines.findIndex((line) => line.startsWith(name));
    const endingLine = inputLines.findIndex((line, index) => line.includes('map:') && index > startingLine);
    return inputLines.slice(startingLine + 1, endingLine === -1 ? undefined : endingLine);
}

const getMappedValue = (node, map) => {
    const mapEntry = map.find(({ src, range }) => node.start >= src && node.start < src + range);
    if (!mapEntry) {
        const intersectingMap = map.find(({ src, range }) => node.start < src && src < node.start + node.range);
        return {
            start: node.start,
            range: intersectingMap ? intersectingMap.src - node.start : node.range,
        };
    }
    return {
        start: (node.start - mapEntry.src) + mapEntry.dest,
        range: mapEntry.src + mapEntry.range - node.start,
    };
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

const intersect = (range, maps) => {
    const slices = [];
    const maxRange = range.range;
    const currRange = {
        start: range.start,
        range: range.range,
    }

    for (let r = 0; r < maxRange;) {
        const slice = getMappedValue(currRange, maps);
        slice.range = Math.min(currRange.range, slice.range);
        slices.push(slice);

        r += slice.range;
        currRange.start += slice.range;
        currRange.range = Math.max(0, range.start + range.range - currRange.start);
    }
    return slices;
};

console.time('traverse');
let slices = parseSeeds();

for (let m = 0; m < maps.length; m++) {
    const nextSlices = [];
    for (let s = 0; s < slices.length; s++) {
        const intersections = intersect(slices[s], maps[m]);
        intersections.forEach((int) => nextSlices.push(int));
    }
    slices = nextSlices;
}

const min = slices.reduce((min, { start }) => Math.min(min, start), Infinity);

console.timeEnd('traverse');

console.log(min);
// 4917124
