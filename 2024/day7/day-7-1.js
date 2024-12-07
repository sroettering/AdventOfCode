import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-7-1.txt', import.meta.url))
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
};

const permutate = (possibleValues, length) => {
    if (length === 1) {
        return possibleValues.map((value) => [value]);
    }
    const permutations = [];
    for (const value of possibleValues) {
        const nextPerms = permutate(possibleValues, length - 1);
        for (const perm of nextPerms) {
            permutations.push([value, ...perm]);
        }
    }
    return permutations;
};

const evaluateEquation = (result, operands, ops) => {
    let tempResult = operands[0];

    for (let i = 1; i < operands.length; i++) {
        tempResult = operators[ops[i-1]](tempResult, operands[i]);
    }

    return tempResult === result;
};

const findPopssibleEquations = (equ) => {
    let sum = 0;

    for (const { result, operands } of equ) {
        const operatorCombinations = permutate(Object.keys(operators), operands.length - 1);

        for (const combination of operatorCombinations) {
            if (evaluateEquation(result, operands, combination)) {
                sum += result;
                break;
            }
        }
    }

    return sum;
};

console.log(findPopssibleEquations(equations));
