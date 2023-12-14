import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-14-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseField = (lines) => {
    return lines.map((line) => line.split(''));
};

const moveNorth = (field) => {
    const updatedField = [];
    for (let y = 0; y < field.length; y++) {
        updatedField[y] = [];
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] === 'O' && y > 0) {
                for (let y2 = y - 1; y2 >= 0; y2--) {
                    if (updatedField[y2][x] === '.' && y2 > 0) {
                        continue;
                    } else if (updatedField[y2][x] !== '.') {
                        updatedField[y][x] = '.';
                        updatedField[y2+1][x] = 'O';
                        break;
                    } else if (y2 === 0) {
                        updatedField[y2][x] = 'O';
                        updatedField[y][x] = '.';
                    }
                }
            } else {
                updatedField[y].push(field[y][x]);
            }
        }
    }
    return updatedField;
};

const rotate90 = (field) => {
    const rotatedField = [];

    for (let y = field.length - 1; y >= 0; y--) {
        const row = field[y];
        for (let r = 0; r < row.length; r++) {
            rotatedField[r] = rotatedField[r] || [];
            rotatedField[r].push(row[r]);
        }
    }

    return rotatedField;
};

const determineLoad = (field) => {
    let load = 0;
    for (let y = 0; y < field.length; y++) {
        const stones = field[y].filter((char) => char === 'O').length;
        load += stones * (field.length - y);
    }
    return load;
};

const performCycles = () => {
    const cycles = 1000000000;
    let field = parseField(inputLines);
    const cache = {};
    let loopOffset = -1;
    let loopLength = -1;

    for (let c = 1; c <= cycles; c++) {
        field = moveNorth(field);
        field = rotate90(field);
        field = moveNorth(field);
        field = rotate90(field);
        field = moveNorth(field);
        field = rotate90(field);
        field = moveNorth(field);
        field = rotate90(field);

        if (loopOffset !== -1 && (c - loopOffset) % loopLength === ((cycles - loopOffset) % loopLength)) {
            // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
            //     |           |                |                 |
            //     |             |                    |                24
            return { field, cycle: c };
        }

        const cacheKey = field.map((line) => line.join('')).join('');
        const cacheEntry = cache[cacheKey];
        if (cacheEntry && loopOffset === -1) {
            loopOffset = cacheEntry.cycle;
            loopLength = c - cacheEntry.cycle;
            console.log('found cache entry at cycle', c, 'for', cacheEntry.cycle, 'with load', determineLoad(field), loopOffset, loopLength);
            continue;
        }
        cache[cacheKey] = { cycle: c, field };
    }

    return {
        field,
        cycle: cycles,
    };
};

const { field, cycle } = performCycles();

const result = determineLoad(field);
console.log('cycle', cycle, 'result', result);
//88680
