import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-1-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const operations = {
    'L': (dial, clicks) => (((dial - clicks) % 100) + 100) % 100,
    'R': (dial, clicks) => (dial + clicks) % 100,
};

const { zeros } = inputLines.map(line => ([line[0], parseInt(line.substring(1))]))
    .reduce(({ dial, zeros }, [direction, clicks]) => {
    const result = operations[direction](dial, clicks);
    return { dial: result, zeros: result === 0 ? zeros + 1 : zeros };
}, { dial: 50, zeros: 0 });

console.log(zeros);
