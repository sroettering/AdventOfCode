import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const countWord = (word, grid) => {
    let wordCount = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === word[0]) {
                let horizontal = grid[y][x];
                let diagonalRight = grid[y][x];
                let vertical = grid[y][x];
                let diagonalLeft = grid[y][x];
                for (let n = 1; n < word.length; n++) {
                    horizontal += grid[y]?.[x+n];
                    diagonalRight += grid[y+n]?.[x+n];
                    vertical += grid[y+n]?.[x];
                    diagonalLeft += grid[y+n]?.[x-n];
                }
                if (horizontal === word) {
                    wordCount++;
                }
                if (diagonalRight === word) {
                    wordCount++;
                }
                if (vertical === word) {
                    wordCount++;
                }
                if (diagonalLeft === word) {
                    wordCount++;
                }
            }
        }
    }

    return wordCount;
};

const XMAS = countWord('XMAS', inputLines);
const SAMX = countWord('SAMX', inputLines);

console.log(XMAS + SAMX);
