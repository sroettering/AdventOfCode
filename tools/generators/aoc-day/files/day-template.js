import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('input.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

console.log(inputLines);

