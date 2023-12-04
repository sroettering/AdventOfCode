import { readInput } from '../../helpers/read-input.js';

const regex = new RegExp(/Valve (\w+) has flow rate=(\d+); (?:tunnel|tunnels) lead(?:s)? to valve(?:s)? (\w+(?:, \w+)*)/);

const nodes = readInput(new URL('day-16-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((line) => {
        const [_, valve, flowRate, connections] = regex.exec(line);
        return {
            valve,
            flowRate: parseInt(flowRate),
            connections: connections.split(', '),
            open: false,
        }
    });

const getNeighbors = (node, graph) => {
    return node.connections.map((connectedNode) => graph.find(({ valve }) => valve === connectedNode));
};

let time = 30;
let startingNode = nodes.find(({ valve }) => valve === 'AA');

const findAllClosedAndReachableValves = (startingNode, graph, timeLeft, visitedNodes = []) => {
    if (timeLeft <= 2 || visitedNodes.size === graph.length) {
        return [];
    }
    if (!visitedNodes.size) {
        visitedNodes.push({ node: startingNode, visitTime: timeLeft });
    }

    const neighbors = getNeighbors(startingNode, graph)
        .filter((node) => {
            const visitedNode = visitedNodes.find(({ node: { valve }, visitTime }) => valve === node.valve);
            if (visitedNode && visitedNode.visitTime > timeLeft - 1) {
                return false;
            } else if (visitedNode) {
                visitedNode.visitTime = timeLeft - 1;
            } else {
                visitedNodes.push({ node, visitTime: timeLeft - 1 });
            }

            return true;
        });

    return [
        ...neighbors
            .filter((node) => !node.open && node.flowRate > 0)
            .map((node) => ({ node, visitTime: timeLeft - 1 })),
        ...neighbors.flatMap((node) => findAllClosedAndReachableValves(node, graph, timeLeft - 1, visitedNodes)),
    ];
}

const evaluate = (currentNode, graph, timeLeft, releasedPressure = 0, path = 'AA') => {
    console.log('Path', path);
    const availableNodes = findAllClosedAndReachableValves(currentNode, graph, timeLeft);

    if (!availableNodes.length) {
        return [{ value: releasedPressure, path }];
    }

    return availableNodes.flatMap(({ node, visitTime }) => {
        const graphCopy = JSON.parse(JSON.stringify(graph));
        const nextNode = graphCopy.find(({ valve }) => valve === node.valve);
        nextNode.open = true;
        const timeAfterOpening = visitTime - 1;

        return evaluate(
                nextNode,
                graphCopy,
                timeAfterOpening,
                releasedPressure + (nextNode.flowRate * timeAfterOpening),
                path + '->' + nextNode.valve,
            );
    });
};

const pressures = evaluate(startingNode, JSON.parse(JSON.stringify(nodes)), time, 0);
const maxReleasedPressure = pressures.reduce((max, pressure) => pressure.value > max.value ? pressure : max, { value: 0, path: '' });
console.log(maxReleasedPressure);
