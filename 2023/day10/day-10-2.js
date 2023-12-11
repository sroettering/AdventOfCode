import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon } from '@turf/helpers';
import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-10-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseMaze = (lines) => {
    return lines.map((line) => line.split(''));
};

const findStartPosition = (maze) => {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 'S') {
                return { x, y };
            }
        }
    }
};

const directions = {
    '|': (prev, curr) => prev.y - curr.y > 0 ? { x: 0, y: -1 } : { x: 0, y: 1 },
    '-': (prev, curr) => prev.x - curr.x > 0 ? { x: -1, y: 0 } : { x: 1, y: 0 },
    'L': (prev, curr) => curr.y - prev.y > 0 ? { x: 1, y: 0 } : { x: 0, y: -1 },
    'J': (prev, curr) => curr.y - prev.y > 0 ? { x: -1, y: 0 } : { x: 0, y: -1 },
    '7': (prev, curr) => prev.y - curr.y > 0 ? { x: -1, y: 0 } : { x: 0, y: 1 },
    'F': (prev, curr) => prev.y - curr.y > 0 ? { x: 1, y: 0 } : { x: 0, y: 1 },
}

const maze = parseMaze(inputLines);
const startPosition = findStartPosition(maze);

// console.log(maze);
console.log(startPosition);
// console.log(directions['|']({ x: 0, y: 0 }, { x: 0, y: 1 }));

const traverseMaze = (maze) => {
    const { x, y } = findStartPosition(maze);
    let pos;
    if (maze[y][x + 1] === '-' || maze[y][x + 1] === 'J' || maze[y][x + 1] === '7') {
        pos = { x: x + 1, y };
    } else if (maze[y][x - 1] === '-' || maze[y][x - 1] === 'L' || maze[y][x - 1] === 'F') {
        pos = { x: x - 1, y };
    } else if (maze[y + 1][x] === '|' || maze[y + 1][x] === 'L' || maze[y + 1][x] === 'J') {
        pos = { x, y: y + 1 };
    } else if (maze[y - 1][x] === '|' || maze[y - 1][x] === '7' || maze[y - 1][x] === 'F') {
        pos = { x, y: y - 1 };
    }

    let steps = 1;
    let prev = { x, y };
    const points = [prev, pos];
    while (maze[pos.y][pos.x] !== 'S') {
        const dir = directions[maze[pos.y][pos.x]](prev, pos);
        prev = { ...pos };
        pos = { x: pos.x + dir.x, y: pos.y + dir.y };
        points.push(pos);
        steps++;
    }
    return points;
};

const isInsideLoop = (loop, x, y) => {
    return booleanPointInPolygon([x, y], loop, { ignoreBoundary: true });
};

const countPointsInsideLoop = (maze, loop) => {
    let countInside = 0;
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (isInsideLoop(loop, x, y)) {
                countInside++;
            }
        }
    }
    return countInside;
};

const points = traverseMaze(maze).map(({ x, y }) => [x, y]);
const loop = polygon([points]);

console.log(countPointsInsideLoop(maze, loop))
