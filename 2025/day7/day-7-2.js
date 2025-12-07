import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-7-2.txt', import.meta.url))
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
let beams = [{ pos: beamStart, multiplier: 1 }];

for (let row = 1; row < splitterConfiguration.length; row++) {
    const rowSplitters = splitterConfiguration[row];
    const newBeams = [];
    for (const beam of beams) {
        if (rowSplitters.includes(beam.pos)) {

            const leftBeamIdx = newBeams.findIndex(({ pos }) => pos === beam.pos - 1);
            if (leftBeamIdx !== -1) {
                newBeams[leftBeamIdx].multiplier += beam.multiplier;
            } else {
                newBeams.push({ pos: beam.pos - 1, multiplier: beam.multiplier });
            }

            const rightBeamIdx = newBeams.findIndex(({ pos }) => pos === beam.pos + 1);
            if (rightBeamIdx !== -1) {
                newBeams[rightBeamIdx].multiplier += beam.multiplier;
            } else {
                newBeams.push({ pos: beam.pos + 1, multiplier: beam.multiplier });
            }
        } else {
            newBeams.push(beam);
        }
    }
    beams = newBeams;
}

console.log(beams.reduce((sum, { multiplier }) => sum + multiplier, 0));
