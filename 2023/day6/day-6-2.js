import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseRace = () => {
    const time = inputLines[0].split(/\s+/).slice(1).join('');
    const distance = inputLines[1].split(/\s+/).slice(1).join('');
    return { time: Number(time), distance: Number(distance) };
};

const analyzeRace = ({ time, distance }) => {
    let wins = 0;
    for (let t = 1; t < time; t++) {
        const rest = time - t;
        const travelDistance = t * rest;
        if (travelDistance > distance) {
            wins++;
        }
    }
    return wins;
};

const result = analyzeRace(parseRace());

console.log(result);
