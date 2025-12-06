import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-6-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const ops = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
};

const operators = inputLines[inputLines.length - 1].split(/\s+/);
const operandLines = [[]];
const maxLength = Math.max(...inputLines.map(line => line.length));
for (let col = 0; col < maxLength; col++) {
    let operand = '';

    for (let row = 0; row < inputLines.length - 1; row++) {
        operand += inputLines[row][col] ?? '';
    }

    if (operand.trim().length) {
        operandLines[operandLines.length - 1].push(parseInt(operand));
    } else {
        operandLines.push([]);
    }
}

const mathResult = operandLines.reduce((sum, operandLine, idx) => {
    const operation = ops[operators[idx]];
    return sum + operandLine.reduce((result, operand) => {
        if (result === null) {
            return operand;
        }
        return operation(result, operand);
    }, null);
}, 0);

console.log(mathResult);
