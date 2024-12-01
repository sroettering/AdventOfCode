import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-21-2-example.txt', import.meta.url))
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
            const wrappedY = (y % garden.length + garden.length) % garden.length;
            const wrappedX = (x % garden[wrappedY].length + garden[wrappedY].length) % garden[wrappedY].length;
            return garden[wrappedY][wrappedX] !== '#';
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

for (let step = 0; step < 10; step++) {
    possiblePositions = makeStep(input, possiblePositions);
}

console.log(possiblePositions.length);

console.log(input.length, input[0].length);
// 100 = 8732
// 150 = 19293
// 200 = 34457

// 283

//
// 5,11028152
//
// (x / 26501365) / (34457 / 200) = 132506,825
// =>
// 132506,825 * 26501365 * 34457 / 200

