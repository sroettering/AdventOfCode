import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-11-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseUniverse = (lines) => {
    return lines.map((line) => line.split(''));
};

const findVerticalExpansions = (universe) => {
    const expansions = [];
    for (let y = 0; y < universe.length; y++) {
        if (universe[y].every((space) => space === '.')) {
            expansions.push(y);
        }
    }
    return expansions;
};

const findHorizontalExpansions = (universe) => {
    const expansions = [];
    for (let x = 0; x < universe[0].length; x++) {
        const column = universe.map((row) => row[x]);
        if (column.every((space) => space === '.')) {
            expansions.push(x);
        }
    }
    return expansions;
};

const calculatePath = (pointA, pointB, verticalExpansions, horizontalExpansions, expansionFactor) => {
    const yMax = Math.max(pointA.y, pointB.y);
    const yMin = Math.min(pointA.y, pointB.y);
    const xMax = Math.max(pointA.x, pointB.x);
    const xMin = Math.min(pointA.x, pointB.x);
    const vExpansions = verticalExpansions.filter((expansion) => expansion < yMax && expansion > yMin).length;
    const hExpansions = horizontalExpansions.filter((expansion) => expansion < xMax && expansion > xMin).length;

    const dy = (yMax - yMin - vExpansions) + vExpansions * expansionFactor
    const dx = (xMax - xMin - hExpansions) + hExpansions * expansionFactor;

    return dy + dx;
};

const findShortestPaths = (universe, expansionFactor) => {
    const verticalExpansions = findVerticalExpansions(universe);
    const horizontalExpansions = findHorizontalExpansions(universe);

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
            steps += calculatePath(galaxy, galaxy2, verticalExpansions, horizontalExpansions, expansionFactor);
        }
    }

    return steps;
};

const expansionFactor = 1000000;
const universe = parseUniverse(inputLines);
const result = findShortestPaths(universe);

console.log(result);
// 504715068438
