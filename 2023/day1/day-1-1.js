import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-1-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const sum = inputLines.reduce((sum, line) => {
    const matches = line.match(/\d/g);
    return sum + Number(matches[0] + matches[matches.length - 1]);
}, 0);

console.log(sum);
