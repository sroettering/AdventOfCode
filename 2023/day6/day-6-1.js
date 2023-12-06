import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseRaces = () => {
    const times = inputLines[0].split(/\s+/).slice(1);
    const distances = inputLines[1].split(/\s+/).slice(1);
    return times.map((time, index) => ({ time: Number(time), distance: Number(distances[index]) }));
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

const result = parseRaces().map(analyzeRace).reduce((product, wins) => product * wins, 1);

console.log(result);
