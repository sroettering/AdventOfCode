import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-8-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const rlPattern = inputLines[0].split('').map((char) => char === 'L' ? 'left' : 'right');

const parseNodes = (lines) => {
    return lines.map((line) => {
        const [name, connections] = line.split(' = (');
        const [left, right] = connections.substring(0, connections.length - 1).split(', ');
        return {
            name,
            left,
            right,
        }
    });
};

const nodes = parseNodes(inputLines.slice(1));

let patternIndex = 0;
let node = nodes.find(({ name }) => name === 'AAA');
let steps = 0;

while (true) {
    if (node.name === 'ZZZ') {
        break;
    }
    steps++;
    const direction = rlPattern[patternIndex];
    node = nodes.find(({ name }) => name === node[direction]);
    patternIndex = (patternIndex + 1) % rlPattern.length;
}

console.log(node.name, steps);
