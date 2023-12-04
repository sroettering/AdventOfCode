import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseCard = (line) => {
    const withoutPrefix = line.substring(line.match(/:/).index + 1);
    return withoutPrefix.split('|').map((part) => part.trim().split(/\s+/));
}

const calculatePoints = ([winning, actual]) => {
    const points = winning.filter((num) => actual.includes(num))
        .reduce((points) => points * 2, 0.5);
    return Math.floor(points);
};

const sum = inputLines.map(parseCard)
    .map((card) => calculatePoints(card))
    .reduce((sum, points) => sum + points, 0);

console.log(sum);
