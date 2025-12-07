import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-7-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const splitterConfiguration = inputLines.map(line => line.split('')).reduce((configuration, line) => {
    const splitters = line.reduce((splitters, elem, idx) => {
        if (elem === '^') {
            splitters.push(idx);
        }
        return splitters;
    }, []);
    configuration.push(splitters);
    return configuration;
}, []);

const beamStart = inputLines[0].indexOf('S');
const beams = new Set();
beams.add(beamStart);
let splittersHit = 0;

for (let row = 1; row < splitterConfiguration.length; row++) {
    const rowSplitters = splitterConfiguration[row];
    for (const beam of beams) {
        if (rowSplitters.includes(beam)) {
            beams.delete(beam);
            beams.add(beam + 1);
            beams.add(beam - 1);
            splittersHit++;
        }
    }
}

console.log(splittersHit);
