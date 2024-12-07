import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-7-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const equations = inputLines.map((line) => line.split(': '))
    .map(([result, operands]) => ({
        result: Number(result),
        operands: operands.split(' ').map((value) => Number(value)),
    }));

const operators = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '||': (a, b) => Number(`${a}${b}`),
};

const evaluateEquation = (result, operands, ops) => {
    let tempResult = operands[0];

    for (let i = 1; i < operands.length; i++) {
        tempResult = operators[ops[i-1]](tempResult, operands[i]);
    }

    return tempResult === result;
};

const getNextCombination = (ops, length, perm) => {
    if (Math.pow(ops.length, length) <= perm) {
        return null;
    }
    const permString = perm.toString(ops.length);
    return permString.padStart(length, '0').split('').map((idx) => ops[Number(idx)]);
};

const findPopssibleEquations = (equ) => {
    let sum = 0;
    let ops = Object.keys(operators);

    for (const { result, operands } of equ) {
        let permutation = 0;
        let combination;

        while (true) {
            combination = getNextCombination(ops, operands.length - 1, permutation++);
            if (combination === null) {
                break;
            }
            if (evaluateEquation(result, operands, combination)) {
                sum += result;
                break;
            }
        }
    }

    return sum;
};

console.log(findPopssibleEquations(equations));
