import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const initialGrid = inputLines.map(line => line.split(''));

const countNeighbors = (grid, x, y) => {
    let rolls = 0;
    for (let i = x - 1; i <= x+1; i++) {
        for (let j = y - 1; j <= y+1; j++) {
            if (grid[j]?.[i] === '@') {
                rolls += 1;
            }
        }
    }
    return rolls - 1;
};

let rollCount = 0;
for (let y = 0; y < initialGrid.length; y++) {
    for (let x = 0; x < initialGrid[y].length; x++) {
        if (initialGrid[y][x] === '@' && countNeighbors(initialGrid, x, y) < 4) {
            rollCount += 1;
        }
    }
}

console.log(rollCount);
