import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-15-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const hash = (str) => {
    let hash = 0;
    for (let c = 0; c < str.length; c++) {
        hash = ((hash + str.charCodeAt(c)) * 17) % 256;
    }
    return hash;
};

const result = inputLines[0].split(',')
    .map((entry) => hash(entry))
    .reduce((sum, hash) => sum + hash, 0);
console.log(result);
//509167
