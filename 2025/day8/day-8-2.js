import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('input.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const points = inputLines.map(line => line.split(','))
    .map(([x, y, z]) => ({ x, y, z }));

const distance = (p1, p2) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const isEqual = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y && p1.z === p2.z;
};

const toKey = (boxA, boxB) => `${boxA.x},${boxA.y},${boxA.z}|${boxB.x},${boxB.y},${boxB.z}`;

const createDistances = (boxes) => {
    const distanceMap = new Map();
    for (let boxA of boxes) {
        for (let boxB of boxes) {
            if (isEqual(boxA, boxB)) {
                continue;
            }
            if (!distanceMap.has(toKey(boxA, boxB)) && !distanceMap.has(toKey(boxB, boxA))) {
                distanceMap.set(toKey(boxA, boxB), { boxA, boxB, distance: distance(boxA, boxB) });
            }
        }
    }
    return Array.from(distanceMap.values()).sort((a, b) => a.distance - b.distance);
};

const connectAllBoxes = (boxes) => {
    const circuits = [];
    const distanceMap = createDistances(boxes);

    let c = 0;
    let pair;
    while (circuits[0]?.length !== boxes.length) {
        pair = distanceMap[c];
        const circuitA = circuits.findIndex((circuit) => circuit.includes(pair.boxA));
        const circuitB = circuits.findIndex((circuit) => circuit.includes(pair.boxB));

        if (circuitA !== -1 && circuitB === -1) {
            circuits[circuitA].push(pair.boxB);
        }
        if (circuitA === -1 && circuitB !== -1) {
            circuits[circuitB].push(pair.boxA);
        }
        if (circuitA !== -1 && circuitB !== -1 && circuitA !== circuitB) {
            const connectionsB = circuits[circuitB];
            circuits[circuitA].push(...connectionsB);
            circuits.splice(circuitB, 1);
        }
        if (circuitA === -1 && circuitB === -1) {
            circuits.push([pair.boxA, pair.boxB]);
        }

        c++;
    }

    return pair.boxA.x * pair.boxB.x;
};

console.log(connectAllBoxes(points));
