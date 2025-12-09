import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('input.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const redTiles = inputLines.map(line => line.split(','))
    .map(([x, y]) => ({ x, y }));

const rectSize = (p1, p2) => {
    const dx = Math.abs(p1.x - p2.x) + 1;
    const dy = Math.abs(p1.y - p2.y) + 1;
    return dx * dy;
};

const calculateRectangles = (points) => {
    const rectangleSizes = [];
    for (const pA of points) {
        for (const pB of points) {
            if (pA !== pB) {
                rectangleSizes.push(rectSize(pA, pB));
            }
        }
    }
    rectangleSizes.sort((a, b) => b - a);
    return rectangleSizes;
};

console.log(calculateRectangles(redTiles)[0]);
