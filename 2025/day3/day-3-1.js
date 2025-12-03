import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-3-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const result = inputLines.map(line => line.split('').map(battery => parseInt(battery)))
    .reduce((totalJoltage, bank) => {
        const maxBattery = Math.max(...bank.slice(0, bank.length - 1));
        const nextBattery = Math.max(...bank.slice(bank.indexOf(maxBattery) + 1, bank.length));

        return totalJoltage + maxBattery * 10 + nextBattery;
    }, 0);

console.log(result);
