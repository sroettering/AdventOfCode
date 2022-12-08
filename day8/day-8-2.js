import { readInput } from '../helpers/read-input.js';

const treeGrid = readInput(new URL('day-8-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map(row => row.split('').map(height => Number.parseInt(height)));

const scenicTreeGrid = treeGrid.map((row) => {
    return row.map((height) => {
       return {
           height,
           scenicScore: 0,
       };
    });
});

const vdEast = (grid, x, y) => {
    const maxHeight = grid[y][x].height;
    for (let vd = 1; vd < grid.length - x; vd++) {
        if (grid[y][x+vd].height >= maxHeight) {
            return vd;
        }
    }
    return grid.length - x - 1;
};

const vdWest = (grid, x, y) => {
    const maxHeight = grid[y][x].height;
    for (let vd = 1; vd < x; vd++) {
        if (grid[y][x-vd].height >= maxHeight) {
            return vd;
        }
    }
    return x;
};

const vdSouth = (grid, x, y) => {
    const maxHeight = grid[y][x].height;
    for (let vd = 1; vd < grid.length - y; vd++) {
        if (grid[y+vd][x].height >= maxHeight) {
            return vd;
        }
    }
    return grid.length - y - 1;
};

const vdNorth = (grid, x, y) => {
    const maxHeight = grid[y][x].height;
    for (let vd = 1; vd < y; vd++) {
        if (grid[y-vd][x].height >= maxHeight) {
            return vd;
        }
    }
    return y;
};

const calcHighestScenicScore = () => {
    let maxScore = 0;
    for (let x = 0; x < scenicTreeGrid.length; x++) {
        for (let y = 0; y < scenicTreeGrid.length; y++) {
            maxScore = Math.max(
                maxScore,
                vdEast(scenicTreeGrid, x, y) * vdWest(scenicTreeGrid, x, y) * vdNorth(scenicTreeGrid, x, y) * vdSouth(scenicTreeGrid, x, y)
            )
        }
    }
    return maxScore;
};

console.log('Highest Scenic Score', calcHighestScenicScore());
