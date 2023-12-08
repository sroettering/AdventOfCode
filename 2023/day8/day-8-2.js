import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-8-2.txt', import.meta.url))
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

const detectLoop = (nodeList) => {
    const lastNode = nodeList[nodeList.length - 1];
    const indices = nodeList.map((node, index, arr) => node === lastNode && index !== arr.length - 1 ? index : null)
        .filter((index) => index !== null);

    if (indices.length === 0) {
        return null;
    }

    const nodesString = nodeList.join(' ');
    for (let i = 0; i < indices.length; i++) {
        const suffix = nodesString.substring((indices[i] + 1) * 4);
        const prefix = nodesString.substring(0, (indices[i] + 1) * 4 - 1);

        if (prefix.endsWith(suffix)) {
            return {
                path: nodesString,
                prefix,
                suffix,
            };
        }
    }
    return null;
};

const nodes = parseNodes(inputLines.slice(1));

let patternIndex = 0;
const paths = nodes.filter(({ name }) => name.endsWith('A')).map((node) => ({
    loop: null,
    currNode: node,
    nodes: [node.name],
    endNodes: [],
}));
let steps = 0;

console.log('rlPattern', rlPattern.length);

console.time('traversal');
while (true) {
    if (paths.every(({ loop }) => !!loop)) {
        break;
    }
    steps++;
    const direction = rlPattern[patternIndex];
    paths.forEach((path) => {
        if (!!path.loop) {
            return;
        }

        const node = path.currNode;

        if (typeof node[direction] === 'string') {
            node[direction] = nodes.find(({ name }) => name === node[direction]);
        }

        path.currNode = node[direction];
        path.nodes.push(path.currNode.name);

        if (path.currNode.name.endsWith('Z')) {
            path.endNodes.push(steps);
            path.loop = detectLoop(path.nodes);
        }
        if (path.loop) {
            console.log('detected loop in path with length:', (path.loop.suffix.length + 1) / 4);
            console.log('Encountered a Z node at: ', path.endNodes);
        }
    });
    patternIndex = (patternIndex + 1) % rlPattern.length;
}
console.timeEnd('traversal');

const isPrime = (num) => {
    for (let d = 2; d < Math.sqrt(num); d++) {
        if (num % d === 0) {
            return false;
        }
    }
    return true;
};

const calculatePrimeFactors = (num) => {
    const factors = [];
    let rest = num;

    for (let p = 2; p <= num; p++) {
        if (isPrime(p)) {
            while (rest % p === 0) {
                factors.push(p);
                rest /= p;
            }
        }
    }
    return factors;
};

console.log(paths.map(({ endNodes }) => endNodes[0]).map(calculatePrimeFactors));

const kgv = 281 * 53 * 73 * 79 * 71 * 61 * 43;
console.log(kgv);
