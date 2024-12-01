import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-1-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const [left, right] = inputLines.reduce(([first, second], line) => {
    const [a, b] = line.split('   ');
    return [[Number(a), ...first], [Number(b), ...second]];
}, [[], []])
    .map((list) => list.sort());

const sum = left
    .filter(num => right.includes(num))
    .reduce((sum, num, idx) => {
        return sum + num * (right.lastIndexOf(num) - right.indexOf(num) + 1);
    }, 0);

console.log(sum);
