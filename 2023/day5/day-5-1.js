import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const findMap = (name) => {
    const startingLine = inputLines.findIndex((line) => line.startsWith(name));
    const endingLine = inputLines.findIndex((line, index) => line.includes('map:') && index > startingLine);
    return inputLines.slice(startingLine + 1, endingLine === -1 ? undefined : endingLine);
}

const getMappedValue = (node, map) => {
    const mapEntry = map.find(({ src, range }) => node.val >= src && node.val < src + range);
    if (!mapEntry) {
        return node.val;
    }
    return (node.val - mapEntry.src) + mapEntry.dest;
};

const parseSeeds = () => {
    nodes = inputLines[0].split(' ').slice(1)
        .map(Number)
        .map((val) => ({ val, type: 'seed' }));
};

const parseMap = (srcType, destType) => {
    const rawMap = findMap(`${srcType}-to-${destType} map:`);
    const map = rawMap.map((line) => {
        const [dest, src, range] = line.split(' ').map(Number);
        return { src, dest, range };
    });

    const srcNodes = nodes.filter(({ type }) => type === srcType);
    srcNodes.forEach((srcNode) => {
            const dest = getMappedValue(srcNode, map);
            const destNode = {
                val: dest,
                type: destType,
                prev: srcNode,
            };
            srcNode.next = destNode;
            nodes.unshift(destNode);
    });
};


let nodes = [];
const categories = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];

parseSeeds();
categories.forEach((cat, index, arr) => index < arr.length && parseMap(cat, arr[index + 1]));

const min = nodes.filter(({ type }) => type === 'seed')
    .map(({ next }) => next)
    .map(({ next }) => next)
    .map(({ next }) => next)
    .map(({ next }) => next)
    .map(({ next }) => next)
    .map(({ next }) => next)
    .map(({ next }) => next)
    .reduce((min, { val }) => Math.min(min, val), Infinity);

console.log(min);
