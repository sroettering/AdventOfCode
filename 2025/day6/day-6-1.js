import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const ops = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
};

const [operators, ...operandLines] = inputLines.map(line => line.trim().split(/\s+/)).reverse();

const sum = operandLines.reduce((results, operandLine, idx) => {
    if (idx === 0) {
        return operandLine.map(operand => parseInt(operand));
    }
    return operandLine.map((operand, i) => ops[operators[i]](results[i], parseInt(operand)));
}, [])
    .reduce((sum, result) => sum + result, 0);

console.log(sum);
