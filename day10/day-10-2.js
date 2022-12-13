import { readInput } from '../helpers/read-input.js';

const instructions = readInput(new URL('day-10-2.txt', import.meta.url))
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

let crt = '';
let x = 1;

for (let c = 0; c < 240; c++) {
    const crtX = c % 40;

    if (crtX >= x - 1 && crtX <= x + 1) {
        crt += '#';
    } else {
        crt += '.';
    }
    x += cycles[c];

    if ((c+1) % 40 === 0) {
        crt += '\n';
    }
}

console.log(crt);
