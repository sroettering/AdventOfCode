import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-10-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const heightMap = inputLines.map((line) => line.split('').map(Number));

const followTrail = (map, x, y, height) => {
    const neighbors = [
        { x: x+1, y, height: map[y]?.[x+1]},
        { x: x-1, y, height: map[y]?.[x-1]},
        { x, y: y+1, height: map[y+1]?.[x]},
        { x, y: y-1, height: map[y-1]?.[x]},
    ].filter((neighbor) => neighbor.height === height);
    if (!neighbors.length) {
        return [];
    }
    if (height === 9) {
        return neighbors.map((neighbor) => `${neighbor.x}|${neighbor.y}`);
    }
    return neighbors.map((neighbor) => followTrail(map, neighbor.x, neighbor.y, neighbor.height + 1)).flat();
};

const calculateTrailScore = (map, startX, startY) => {
    return followTrail(map, startX, startY, 1).length;
};

const findTrailScores = (map) => {
    let sum = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                const score = calculateTrailScore(map, x, y);
                console.log('trailHead at', x, y, score);
                sum += score;
            }
        }
    }

    return sum;
};

console.log(findTrailScores(heightMap));
