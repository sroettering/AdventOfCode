import { readInput } from '../../helpers/read-input.js';

const instructions = readInput(new URL('day-10-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .reduce((aggregated, command) => {
        const [instruction, steps] = command.split(' ');
        aggregated.push({ instruction, operand: steps ? +steps : null });
        return aggregated;
    }, []);

const cycles = instructions.reduce((aggregate, instruction) => {
    if (instruction.instruction === 'addx') {
        aggregate.push(...[0, instruction.operand]);
    }
    if (instruction.instruction === 'noop') {
        aggregate.push(...[0]);
    }
    return aggregate;
}, []);

const targetCycles = [20, 60, 100, 140, 180, 220];

const { sumSignalStrength } = cycles.reduce((aggregate, dx, cycle) => {
    if (targetCycles.includes(cycle + 1)) {
        console.log('cycle', cycle + 1, aggregate.x);
        aggregate.sumSignalStrength += (cycle+1) * aggregate.x;
    }

    aggregate.x += dx;

    return aggregate;
}, { sumSignalStrength: 0, x: 1 });

console.log('Sum of signal strengths', sumSignalStrength);
