import booleanEqual from '@turf/boolean-equal';
import booleanWithin from '@turf/boolean-within';
import { polygon } from '@turf/helpers';
import intersect from '@turf/intersect';
import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('input.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const redTiles = inputLines.map(line => line.split(','))
    .map(([x, y]) => ([parseInt(x), parseInt(y)]));

const tileArea = polygon([[...redTiles, redTiles[0]]]);

const rectSize = (p1, p2) => {
    const dx = Math.abs(p1[0] - p2[0]) + 1;
    const dy = Math.abs(p1[1] - p2[1]) + 1;
    return dx * dy;
};

const calculateRectangles = (points) => {
    let maxSize = 0;
    let maxRectangle;
    for (const pA of points) {
        for (const pB of points) {
            if (pA !== pB) {
                const thirdPoint = [pA[0], pB[1]];
                const fourthPoint = [pB[0], pA[1]];
                const rectangle = polygon([[pA, thirdPoint, pB, fourthPoint, pA]]);
                if (booleanWithin(rectangle, tileArea) && intersect(rectangle, tileArea) && booleanEqual(rectangle, intersect(rectangle, tileArea))) {
                    const size = rectSize(pA, pB);
                    if (size > maxSize) {
                        maxSize = size;
                        maxRectangle = rectangle;
                    }
                }
            }
        }
    }
    return maxSize;
};

console.log(calculateRectangles(redTiles));
