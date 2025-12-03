import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-3-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const getMaxSingleJoltage = (bank, paddingRight) => {
    return Math.max(...bank.slice(0, bank.length - paddingRight));
}

const result = inputLines.map(line => line.split('').map(battery => parseInt(battery)))
    .reduce((totalJoltage, bank) => {
        let joltageString = '';
        for (let i = 11; i >= 0; i--) {
            const maxJoltage = getMaxSingleJoltage(bank, i);
            joltageString += maxJoltage;
            bank = bank.slice(bank.indexOf(maxJoltage) + 1, bank.length);
        }

        return totalJoltage + parseInt(joltageString);
    }, 0);

console.log(result);

