import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-2-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const isInvalidId = (id) => {
    for (let i = 0; i <= id.length / 2; i++) {
        const sequence = id.substring(0, i);
        if (id.replaceAll(sequence, '').length === 0) {
            return true;
        }
    }
    return false;
};

const result = inputLines[0].split(',').map(line => line.split('-'))
    .reduce((sum, [from, to]) => {
        for (let id = parseInt(from); id <= parseInt(to); id++) {
            sum += isInvalidId(id.toString()) ? id : 0;
        }

        return sum;
    }, 0);

console.log(result);
