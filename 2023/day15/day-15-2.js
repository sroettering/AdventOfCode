import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-15-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseInput = (lines) => {
    return lines[0].split(',');
};

const hash = (str) => {
    let hash = 0;
    for (let c = 0; c < str.length; c++) {
        hash = ((hash + str.charCodeAt(c)) * 17) % 256;
    }
    return hash;
};

const applyOperation = (boxes, operation) => {
    const label = operation.split(/[-=]/)[0];
    const boxNum = hash(label);
    const box = boxes[boxNum];

    const lensIndex = box.findIndex((lens) => lens.startsWith(label));
    if (operation.includes('-') && lensIndex !== -1) {
        box.splice(lensIndex, 1);
    }
    if (operation.includes('=') && lensIndex !== -1) {
        box.splice(lensIndex, 1, operation);
    }
    if (operation.includes('=') && lensIndex === -1) {
        box.push(operation);
    }
};

const calculateFocussingPower = (boxes) => {
    return boxes.map((box, boxNum) => {
        return box.map((operation, index) => (1 + boxNum) * (index + 1) * Number(operation.split('=')[1]))
            .reduce((sum, value) => sum + value, 0);
    }).reduce((sum, box) => sum + box, 0);
};

const sequence = parseInput(inputLines);
const initialBoxes = new Array(256).fill(null).map(() => []);
sequence.forEach((operation) => applyOperation(initialBoxes, operation));
const result = calculateFocussingPower(initialBoxes);
console.log(result);
//259333
