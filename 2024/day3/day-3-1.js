import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-3-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const instructions = inputLines.join('');

const result = instructions.match(/mul\(\d{1,3},\d{1,3}\)/g)
    .map((instruction) => instruction.replace('mul(', '').replace(')', ''))
    .map((instruction) => instruction.split(','))
    .map(([a, b]) => Number(a) * Number(b))
    .reduce((sum, product) => sum + product, 0);

console.log(result);
