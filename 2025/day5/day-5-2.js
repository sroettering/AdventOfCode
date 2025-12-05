import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const database = inputLines.reduce((db, line) => {
    if (line.includes('-')) {
        const [first, last] = line.split('-').map(id => parseInt(id));
        db.push({ first, last });
    }
    return db;
}, []).sort((a, b) => a.first - b.first);

const mergeRanges = (db) => {
    const mergedDb = [db[0]];
    let currentRangeIdx = 0;
    for (let i = 1; i < db.length; i++) {
        const nextRange = db[i];
        if (nextRange.first <= mergedDb[currentRangeIdx].last + 1) {
            mergedDb[currentRangeIdx].last = Math.max(mergedDb[currentRangeIdx].last, nextRange.last);
        } else {
            currentRangeIdx += 1;
            mergedDb[currentRangeIdx] = nextRange;
        }
    }
    return mergedDb;
};

const result = mergeRanges(database).map(({ first, last }) => last - first).reduce((sum, ids) => sum + ids + 1, 0);

console.log(result);
