import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const initialGrid = inputLines.map(line => line.split(''));

const countRolls = (grid) => grid.flatMap(line => line).reduce((sum, cell) => sum + (cell === '@' ? 1 : 0), 0);

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

const removeRolls = (grid) => {
    return grid.map((row, y) => {
        return row.map((cell, x) => {
            if (cell === '@' && countNeighbors(grid, x, y) >= 4) {
                return '@';
            }
            return '.';
        })
    });
};

let updatedGrid = initialGrid;
let lastRolls = countRolls(updatedGrid);
while (true) {
    updatedGrid = removeRolls(updatedGrid);
    const currentRolls = countRolls(updatedGrid);
    if (currentRolls === lastRolls) {
        break;
    }
    lastRolls = currentRolls;
}

console.log(countRolls(initialGrid) - lastRolls);
