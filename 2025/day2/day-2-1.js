import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-2-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const isInvalidId = (id) => {
    if (id.length % 2 !== 0) {
        return false;
    }
    const start = id.substring(0, id.length / 2);
    const end = id.substring(id.length / 2);
    return start === end;
};

const result = inputLines[0].split(',').map(line => line.split('-'))
    .reduce((sum, [from, to]) => {
        for (let id = parseInt(from); id <= parseInt(to); id++) {
            sum += isInvalidId(id.toString()) ? id : 0;
        }

        return sum;
    }, 0);

console.log(result);
