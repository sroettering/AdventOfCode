import { readInput } from '../helpers/read-input.js';

const regex = new RegExp(/Valve (\w+) has flow rate=(\d+); (?:tunnel|tunnels) lead(?:s)? to valve(?:s)? (\w+(?:, \w+)*)/);

const nodes = readInput(new URL('day-16-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((line) => {
        const [_, valve, flowRate, connections] = regex.exec(line);
        return {
            valve,
            flowRate: parseInt(flowRate),
            connections: connections.split(', ').map((connection) => ({ valve: connection, distance: 1 })),
            open: false,
        }
    });

const cleanGraph = () => {
    for (let n = nodes.length - 1; n >= 0; n--) {
        const node = nodes[n];
        if (node.flowRate === 0 && node.connections.length === 2) {
            console.log(node);
            const sourceNode = nodes.find(({ valve }) => valve === node.connections[0].valve);
            const targetNode = nodes.find(({ valve }) => valve === node.connections[1].valve);
            const sourceConnection = sourceNode.connections.find(({ valve }) => valve === node.valve);
            const targetConnection = targetNode.connections.find(({ valve }) => valve === node.valve);

            const sourceTargetDistance = sourceConnection.distance + targetConnection.distance;
            node.connections[0].distance += sourceTargetDistance;
            node.connections[1].distance += sourceTargetDistance;

            sourceNode.connections.push(node.connections[1]);
            sourceNode.connections = sourceNode.connections.filter(({ valve }) => valve !== node.valve);
            targetNode.connections.push(node.connections[0]);
            targetNode.connections = targetNode.connections.filter(({ valve }) => valve !== node.valve);

            nodes.splice(n, 1);
        }
    }
};

cleanGraph();

console.log(nodes.map((node) => `${node.valve}(${node.flowRate}) -> ${node.connections.map(({valve}) => valve)}`));


const getNeighbors = (node, graph) => {
    return node.connections.map((connection) => graph.find(({ valve }) => valve === connection.valve));
};

let startingNode = nodes.find(({ valve }) => valve === 'AA');

const distances = new Map();

const getDistance = (graph, from, to) => {
    const path = [from.valve, to.valve].sort().join('');
    if (distances.has(path)) {
        return distances.get(path);
    }

    const graphCopy = JSON.parse(JSON.stringify(graph));

    const fromCopy = graphCopy.find(({ valve }) => valve === from.valve);
    const openNodes = [{ ...fromCopy, distance: 0 }];
    while (openNodes.length) {
        const node = openNodes.shift();

        if (node.valve === to.valve) {
            distances.set(path, node.distance);
            return node.distance;
        }

        const neighbors = getNeighbors(node, graphCopy)
            .filter((neighbor) => !neighbor.distance)
            .map((neighbor) => ({ ...neighbor, distance: node.distance + 1 }));
        openNodes.push(...neighbors);
    }
}

const nodesToVisit = nodes.filter((node) => node.flowRate > 0)
    .sort((nodeA, nodeB) => nodeB.flowRate - nodeA.flowRate);
nodesToVisit.unshift(startingNode);

nodesToVisit.forEach((node, idx, array) => {
    const ds = array.map((target) => `${node.valve} <-> ${target.valve} (${getDistance(nodes, node, target)})`);
    console.log(ds);
});

console.log('Num nodes to visit', nodesToVisit.length);

// const createPaths = (values) => {
//     if (!values.length) {
//         return { elve: [], elefant: [] };
//     }
//     if (values.length === 1) {
//         return { elve: [], elefant: [] };
//     }
// };
//
// // TODO: use dynamic programming to compute the released pressure for all path parts
// const permutate = (values) => {
//     const res = [[]];
//
//     for (let i = 0; i < values.length; i++) {
//         while (res[res.length-1].length === i) {
//             const l = res.pop();
//             for (let j=0; j<=l.length; j++) {
//                 const copy = l.slice();
//                 copy.splice(j,0, values[i]);
//                 res.unshift(copy);
//             }
//         }
//     }
//     return res;
// }
//
// // const pathPermutations = permutate(nodesToVisit).map((path) => [startingNode, ...path]);
//
// // console.log('Num permutation', pathPermutations.length);
//
// const evaluatePath = (path) => {
//     let pathIdx = 1;
//     let time = 30;
//     let releasedPressure = 0;
//
//     while (pathIdx < path.length) {
//         const node = path[pathIdx];
//         const flowRate = node.flowRate;
//         time = time - getDistance(nodes, path[pathIdx-1], node) - 1;
//         if (time <= 0) {
//             break;
//         }
//         releasedPressure += time * flowRate;
//         pathIdx++;
//     }
//
//     return releasedPressure;
// };

// const maximumPressure = pathPermutations.reduce((max, path) => {
//     const pressure = evaluatePath(path);
//     return pressure > max ? pressure : max;
// }, 0);
//
// console.log(maximumPressure);
