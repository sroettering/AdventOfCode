import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const lab = inputLines.map((line) => line.split('').map((cell) => ({ obstacle: cell === '#', visited: cell === '^' })));

const findStartPosition = (grid) => {
    for (let y = 0; y < lab.length; y++) {
        for (let x = 0; x < lab[y].length; x++) {
            if (lab[y][x].visited) {
                return { x, y };
            }
        }
    }
};

const turnRight = (direction) => {
    if (direction.y === -1) {
        return { x: 1, y: 0 };
    } else if (direction.x === 1) {
        return { x: 0, y: 1 };
    } else if (direction.y === 1) {
        return { x: -1, y: 0 };
    } else {
        return { x: 0, y: -1 };
    }
};

const moveGuard = (grid) => {
    let direction = { x: 0, y: -1 };
    let guardPosition = findStartPosition(grid);

    while (true) {
        while (grid[guardPosition.y + direction.y]?.[guardPosition.x + direction.x]?.obstacle) {
            direction = turnRight(direction);
        }

        guardPosition = {
            x: guardPosition.x + direction.x,
            y: guardPosition.y + direction.y,
        };
        if (!grid[guardPosition.y]?.[guardPosition.x]) {
            return grid;
        }
        grid[guardPosition.y][guardPosition.x].visited = true;
    }
};

const sum = moveGuard(lab).map((row) => row.filter((cell) => cell.visited).length)
    .reduce((sum, visitedCells) => sum + visitedCells, 0);

console.log(sum);
