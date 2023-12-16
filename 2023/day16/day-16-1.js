import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-16-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseGrid = (lines) => {
    return lines.map((line) => line.split('').map((tile) => ({ tile, energized: [] })));
};

const followBeam = (grid, x, y, direction) => {
    if (x < 0 || y < 0 || y >= grid.length || x >= grid[y].length) {
        return;
    }

    const tile = grid[y][x];
    const dirString = `${direction.x}|${direction.y}`;
    if (tile.energized.includes(dirString)) {
        return;
    }
    tile.energized.push(dirString);

    if (direction.x > 0 && tile.tile === '/' || direction.x < 0 && tile.tile === '\\') {
        followBeam(grid, x, y - 1, { x: 0, y: -1 });
    } else if (direction.x > 0 && tile.tile === '\\' || direction.x < 0 && tile.tile === '/') {
        followBeam(grid, x, y + 1, { x: 0, y: 1 });
    } else if (direction.y > 0 && tile.tile === '/' || direction.y < 0 && tile.tile === '\\') {
        followBeam(grid, x - 1, y, { x: -1, y: 0 });
    } else if (direction.y > 0 && tile.tile === '\\' || direction.y < 0 && tile.tile === '/') {
        followBeam(grid, x + 1, y, { x: 1, y: 0 });
    } else if (tile.tile === '-' && direction.y) {
        followBeam(grid, x + 1, y, { x: 1, y: 0 });
        followBeam(grid, x - 1, y, { x: -1, y: 0 });
    } else if (tile.tile === '|' && direction.x) {
        followBeam(grid, x, y + 1, { x: 0, y: 1 });
        followBeam(grid, x, y - 1, { x: 0, y: -1 });
    } else {
        followBeam(grid, x + direction.x, y + direction.y, direction);
    }
};


const grid = parseGrid(inputLines);
// console.log(grid);
followBeam(grid, 0, 0, { x: 1, y: 0 }, []);
const result = grid.map((row) => row.filter((tile) => tile.energized.length).length)
    .reduce((sum, energizedTiles) => sum + energizedTiles,  0);
console.log(result);
console.log(grid.map(row => row.map(tile => tile.energized.length ? '#' : '.').join('')).join('\n'))
