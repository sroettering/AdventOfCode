import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-11-2-example.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const initialArrangement = inputLines.map((line) => line.split(' ').map(Number)).flat();

const stoneCache = {
    [0]: [[1], [2024], [20, 24], [2, 0, 2, 4]],
};

const performBlink = (stone, times) => {
    if (stoneCache[stone]?.[times-1] != null) {
        return stoneCache[stone]?.[times-1].length;
    }

    const stoneDigits = stone.toString();
    let resultStones = [];
    if (stone === 0) {
        resultStones.push(1);
    } else if (stoneDigits.length % 2 === 0) {
        resultStones.push(Number(stoneDigits.substring(0, stoneDigits.length / 2)));
        resultStones.push(Number(stoneDigits.substring(stoneDigits.length / 2)));
    } else {
        resultStones.push(stone * 2024);
    }

    stoneCache[stone] ??= [];
    stoneCache[stone][0] = resultStones;

    for (const resultStone of resultStones) {
        performBlink(resultStone, times - 1);
    }
};

const blink = (stones, times) => {
    let numStones = 0;
    for (const stone of stones) {
        console.log('stone', stone);
        performBlink(stone, times);
        console.log(stoneCache);
        numStones += stoneCache[stone][times].length;
    }
    return numStones;
};

console.log(blink([...initialArrangement], 75));
