import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const lab = inputLines.map((line) => line.split('').map((cell) => ({
    obstacle: cell === '#',
    visited: cell === '^' ,
})));

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
    const visitedPositions = {};

    while (true) {
        while (grid[guardPosition.y + direction.y]?.[guardPosition.x + direction.x]?.obstacle) {
            direction = turnRight(direction);
        }

        guardPosition = {
            x: guardPosition.x + direction.x,
            y: guardPosition.y + direction.y,
        };
        if (!grid[guardPosition.y]?.[guardPosition.x]) {
            return { grid, hasLoop: false };
        }
        grid[guardPosition.y][guardPosition.x].visited = true;
        const previousPos = `${guardPosition.x - direction.x}|${guardPosition.y - direction.y}`;
        const currPos = `${guardPosition.x}|${guardPosition.y}`;
        if (visitedPositions[previousPos]?.includes(currPos)) {
            return { grid, hasLoop: true };
        } else {
            visitedPositions[previousPos] ??= [];
            visitedPositions[previousPos] = currPos;
        }
    }
};

const findPossibleObstaclePositions = (grid) => {
    return moveGuard(JSON.parse(JSON.stringify(grid))).grid
        .map((row, y) => row.map(({ visited }, x) => {
            if (visited) {
                return { x, y };
            }
            return null;
        }).filter(Boolean)).flat();
}

const countLoops = (grid, possiblePositions) => {
    let loopCount = 0;
    for (const position of possiblePositions) {
        const copiedGrid = JSON.parse(JSON.stringify(grid));
        copiedGrid[position.y][position.x].obstacle = true;

        const { hasLoop } = moveGuard(copiedGrid);
        loopCount += hasLoop ? 1 : 0;
    }

    return loopCount;
}

console.log(countLoops(lab, findPossibleObstaclePositions(lab)));
