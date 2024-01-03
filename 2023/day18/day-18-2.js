import { Polygon } from '@flatten-js/core';
import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-18-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const dirs = {
    '0': 'R',
    '1': 'D',
    '2': 'L',
    '3': 'U',
};

const parseInput = (lines) => {
    return lines.map((line) => {
        const [not, needed, color] = line.split(' ');
        const hex = color.replace('(', '').replace(')', '').replace('#', '');
        const dir = dirs[hex.substring(5)];
        const steps = parseInt(hex.substring(0, 5), 16);
        return {
            dir,
            steps,
            color,
        };
    });
};

const buildPolygon = (input) => {
    const line = [[0, 0]];
    input.forEach(({ dir, steps }) => {
        const [x, y] = line[line.length - 1];
        switch (dir) {
            case 'U':
                line.push([x, y + steps]);
                break;
            case 'D':
                line.push([x, y - steps]);
                break;
            case 'R':
                line.push([x + steps, y]);
                break;
            case 'L':
                line.push([x - steps, y]);
                break;
        }
    });
    return new Polygon(line);
};

const parsedInput = parseInput(inputLines);
console.log(parsedInput);
const poly = buildPolygon(parsedInput);
const area = poly.area();
const circumference = parsedInput.reduce((sum, { steps }) => {
    return sum + steps / 2;
}, 1);
console.log(area + circumference);
