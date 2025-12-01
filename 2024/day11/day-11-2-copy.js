import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-11-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const initialArrangement = inputLines.map((line) => line.split(' ').map(Number)).flat();

const applyRules = (stone) => {
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

    return resultStones;
};

const cache = {};
const stoneOccurences = new Set();

const blink = (stones, times) => {
    let stoneCount = stones.length;

    const remainingStones = stones.map((stone) => ({ stone, blinksLeft: times }));

    while (remainingStones.length) {
        let { stone, blinksLeft } = remainingStones.shift();
        stoneOccurences.add(stone);

        // console.log('checking cache for stone', stone, times - blinksLeft);
        // const cacheEntry = cache[stone]?.[blinksLeft];
        // if (cacheEntry != null) {
        //     stoneCount += cacheEntry;
        //     continue;
        // }

        // const countBefore = stoneCount;
        // const blinksBefore = blinksLeft;
        // const stoneBefore = stone;

        while (blinksLeft > 0) {
            const [nextStone, createdStone] = applyRules(stone);

            if (createdStone != null) {
                stoneCount++;
                if (blinksLeft > 1) {
                    remainingStones.push({ stone: createdStone, blinksLeft: blinksLeft - 1 });
                }
            }

            blinksLeft--;
            stone = nextStone;
        }

        // console.log('setting cache entry', stoneBefore, blinksBefore, stoneCount, countBefore);
        // cache[stoneBefore] ??= {};
        // cache[stoneBefore][blinksBefore] = stoneCount - countBefore;
    }

    return stoneCount;
};

console.log(blink(initialArrangement, 27));
console.log(stoneOccurences, stoneOccurences.size);
