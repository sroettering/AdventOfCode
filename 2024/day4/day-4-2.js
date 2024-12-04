import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const countCross = (word, grid) => {
    let count = 0;
    const revWord = word.split('').reverse().join('');
    const horizontalDistance = Math.ceil(word.length / 2);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            let diagonalRight = grid[y][x];
            let diagonalLeft = grid[y][x + horizontalDistance];
            for (let n = 1; n < word.length; n++) {
                diagonalRight += grid[y + n]?.[x + n];
                diagonalLeft += grid[y + n]?.[x + horizontalDistance - n];
            }
            if ((diagonalRight === word || diagonalRight === revWord)
                && (diagonalLeft === word || diagonalLeft === revWord)) {
                console.log(diagonalRight, diagonalLeft);
                count++;
            }
        }
    }

    return count;
};

console.log(countCross('MAS', inputLines));
