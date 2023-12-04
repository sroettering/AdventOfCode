import { readInput } from '../../helpers/read-input.js';

const treeGrid = readInput(new URL('day-8-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map(row => row.split('').map(height => Number.parseInt(height)));

const treeHeightGrid = treeGrid.map((row) => {
    return row.map((column) => {
        return {
            height: column,
        };
    });
});

const visibleTrees = new Set();

const checkVisibleFromLeft = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        let maxHeightInLane = -1;
        for (let x = 0; x < grid.length; x++) {
            const tree = grid[y][x];
            if (tree.height > maxHeightInLane) {
                maxHeightInLane = tree.height;
                visibleTrees.add(tree);
            }
        }
    }
    return visibleTrees;
};

const checkVisibleFromRight = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        let maxHeightInLane = -1;
        for (let x = grid.length - 1; x >= 0; x--) {
            const tree = grid[y][x];
            if (tree.height > maxHeightInLane) {
                maxHeightInLane = tree.height;
                visibleTrees.add(tree);
            }
        }
    }
    return visibleTrees;
};

const checkVisibleFromTop = (grid) => {
    for (let x = 0; x < grid.length; x++) {
        let maxHeightInLane = -1;
        for (let y = 0; y < grid.length; y++) {
            const tree = grid[y][x];
            if (tree.height > maxHeightInLane) {
                maxHeightInLane = tree.height;
                visibleTrees.add(tree);
            }
        }
    }
    return visibleTrees;
};

const checkVisibleFromBottom = (grid) => {
    for (let x = 0; x < grid.length; x++) {
        let maxHeightInLane = -1;
        for (let y = grid.length - 1; y >= 0; y--) {
            const tree = grid[y][x];
            if (tree.height > maxHeightInLane) {
                maxHeightInLane = tree.height;
                visibleTrees.add(tree);
            }
        }
    }
    return visibleTrees;
};

checkVisibleFromRight(treeHeightGrid);
checkVisibleFromLeft(treeHeightGrid);
checkVisibleFromTop(treeHeightGrid);
checkVisibleFromBottom(treeHeightGrid);

console.log('Visible Trees:', visibleTrees.size);
