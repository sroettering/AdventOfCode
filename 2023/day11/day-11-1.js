import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-11-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseUniverse = (lines) => {
    return lines.map((line) => line.split(''));
};

const expandUniverse = (universe) => {
    for (let x = 0; x < universe[0].length; x++) {
        const column = universe.map((row) => row[x]);
        if (column.every((space) => space === '.')) {
            console.log('expanding horizontally');
            for (let y = 0; y < universe.length; y++) {
                universe[y].splice(x+1, 0, '.');
            }
            x++;
        }
    }

    const expandedUniverse = [];
    for (let y = 0; y < universe.length; y++) {
        expandedUniverse.push(universe[y]);
        if (universe[y].every((space) => space === '.')) {
            console.log('expanding vertically');
            expandedUniverse.push([...universe[y]]);
        }
    }

    return expandedUniverse;
};

const pathLength = (pointA, pointB) => {
    const pathPoint = {...pointA};
    let steps = 0;
    while (pathPoint.x !== pointB.x || pathPoint.y !== pointB.y) {
        const m = (pointB.y - pathPoint.y) / (pointB.x - pathPoint.x);
        if (m > 1 || m < -1) {
            pathPoint.y++;
        } else if (m >= 0 && m <= 1) {
            pathPoint.x++;
        } else {
            pathPoint.x--;
        }
        steps++;
    }
    return steps;
};

const findShortestPaths = (universe) => {
    const galaxyPositions = [];
    for (let y = 0; y < universe.length; y++) {
        for (let x = 0; x < universe[0].length; x++) {
            if (universe[y][x] === '#') {
                galaxyPositions.push({ x, y });
            }
        }
    }

    let steps = 0;
    for (let g = 0; g < galaxyPositions.length - 1; g++) {
        const galaxy = galaxyPositions[g];
        for (let g2 = g + 1; g2 < galaxyPositions.length; g2++) {
            const galaxy2 = galaxyPositions[g2];
            steps += pathLength(galaxy, galaxy2);
        }
    }

    return steps;
};

const universe = parseUniverse(inputLines);
const expandedUniverse = expandUniverse(universe);
const result = findShortestPaths(expandedUniverse);

console.log(result);
// 10077850

