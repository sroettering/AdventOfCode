import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('example.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

console.log(inputLines);

