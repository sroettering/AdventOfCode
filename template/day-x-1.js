import { readInput } from '../helpers/read-input.js';

const instructions = readInput(new URL('day-10-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');
