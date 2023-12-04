import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-3-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const toBoundingBox = (str, x, y) => {
    return [
        [x - 1, y - 1],
        [x + str.length, y + 1],
    ];
};

const isInside = (point, box) => {
    const [[x1, y1], [x2, y2]] = box;
    const [x, y] = point;
    return x1 <= x && x <= x2 && y1 <= y && y <= y2;
};

const parsedParts = inputLines.reduce(([symbols, numbers], line, lineNumber) => {
    for (const match of line.matchAll(/\d+/g)) {
        // console.log(match);
        numbers.push({
            partNumber: Number(match[0]),
            bbox: toBoundingBox(match[0], match.index, lineNumber),
        });
    }
    for (const match of line.matchAll(/[^.\d]/g)) {
        // console.log(match);
        symbols.push({
            symbol: match[0],
            pos: [match.index, lineNumber],
        });
    }
    return [symbols, numbers];
}, [[], []]);

const sum = parsedParts[0]
    .filter(({ symbol }) => symbol === '*')
    .map((symbol) => {
        const gearRatios = parsedParts[1].filter((number) => isInside(symbol.pos, number.bbox));
        if (gearRatios.length >= 2) {
            return gearRatios.reduce((ratio, { partNumber }) => ratio * partNumber, 1);
        }
        return 0;
    })
    .reduce((sum, gearRatio) => sum + gearRatio, 0);

console.log(sum);
