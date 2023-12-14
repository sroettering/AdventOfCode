import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-14-1.txt', import.meta.url))
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

const determineLoad = (field) => {
    let load = 0;
    for (let y = 0; y < field.length; y++) {
        const stones = field[y].filter((char) => char === 'O').length;
        load += stones * (field.length - y);
    }
    return load;
};

const result = determineLoad(moveNorth(parseField(inputLines)));
console.log(result);
