import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-21-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseInput = (lines) => {
    return lines.map((line) => {
        return line.split('');
    });
};

const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

const makeStep = (garden, positions) => {
    const newPositions = [];
    for (let position of positions) {
        newPositions.push(...directions.map(([x, y]) => ({
            x: position.x + x,
            y: position.y + y,
        })).filter(({ x, y }) => {
            return y >= 0 && y < garden.length && x >= 0 && x < garden[y].length
                && garden[y][x] !== '#';
        }));
    }

    return newPositions.filter(({ x, y }, index, array) => array.findIndex((aPos) => aPos.x === x && aPos.y === y) === index);
};

const input = parseInput(inputLines);
let possiblePositions = [];

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === 'S') {
            possiblePositions.push({ x, y });
        }
    }
}

for (let step = 0; step < 64; step++) {
    possiblePositions = makeStep(input, possiblePositions);
}

console.log(possiblePositions.length);
