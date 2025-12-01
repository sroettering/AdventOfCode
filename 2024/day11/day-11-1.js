import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-11-1-example.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const initialArrangement = inputLines.map((line) => line.split(' ').map(Number)).flat();

const performBlink = (stones) => {
    const modifiedStones = [];
    for (const stone of stones) {
        const stoneDigits = stone.toString();
        if (stone === 0) {
            modifiedStones.push(1);
        } else if (stoneDigits.length % 2 === 0) {
            modifiedStones.push(Number(stoneDigits.substring(0, stoneDigits.length / 2)));
            modifiedStones.push(Number(stoneDigits.substring(stoneDigits.length / 2)));
        } else {
            modifiedStones.push(stone * 2024);
        }
    }
    return modifiedStones;
};

const blink = (stones, times) => {
    while (times > 0) {
        stones = performBlink(stones);
        times--;
    }
    return stones;
};

console.log(blink([...initialArrangement], 25).length);
