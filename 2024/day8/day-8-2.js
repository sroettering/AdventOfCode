import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-8-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const width = inputLines[0].length;
const height = inputLines.length;

const antennas = inputLines.map((line, y) => line.split('').map((char, x) => {
    if (char === '.') {
        return null;
    }
    return { frequency: char, position: { x, y } };
}).filter(Boolean))
    .flat()
    .reduce((antennaMap, antenna) => {
        antennaMap[antenna.frequency] ??= [];
        antennaMap[antenna.frequency].push(antenna.position);
        return antennaMap;
    }, {});

const isPositionInside = ({ x, y }) => x >= 0 && x < width && y >= 0 && y < height;

const findAntinodes = (posA, posB) => {
    const dist = {
        x: posA.x - posB.x,
        y: posA.y - posB.y,
    };

    let firstNode = {
        x: posA.x,
        y: posA.y,
    };
    let secondNode = {
        x: posB.x,
        y: posB.y,
    };
    const positions = [];

    while (isPositionInside(firstNode) || isPositionInside(secondNode)) {
        if (isPositionInside(firstNode)) {
            positions.push(firstNode);
        }
        if (isPositionInside(secondNode)) {
            positions.push(secondNode);
        }

        firstNode = {
            x: firstNode.x + dist.x,
            y: firstNode.y + dist.y,
        };
        secondNode = {
            x: secondNode.x - dist.x,
            y: secondNode.y - dist.y,
        };
    }

    return positions.map(({ x, y }) => `${x}|${y}`);
};

const findUniqueAntinodes = (antennaMap) => {
    const antinodes = new Set();

    for (const positions of Object.values(antennaMap)) {
        for (let i = 0; i < positions.length - 1; i++) {
            const currPos = positions[i];
            for (let j = i + 1; j < positions.length; j++) {
                const refPos = positions[j];
                findAntinodes(currPos, refPos).forEach((node) => antinodes.add(node));
            }
        }
    }

    return antinodes.size;
};

console.log(findUniqueAntinodes(antennas));
