import { readInput } from '../../helpers/read-input.js';

let startNode;
let endNode;

const heightMap = readInput(new URL('day-12-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((row, y) => row.split('').map((char, x) => {
        const isStart = char === 'S';
        const isEnd = char === 'E';
        const node = {
            x,
            y,
            height: isStart ? 'a'.charCodeAt(0) : isEnd ? 'z'.charCodeAt(0) : char.charCodeAt(0),
            isStart,
            isEnd,
            visited: isStart,
            dist: 0,
        };

        if (isStart) startNode = node;
        if (isEnd) endNode = node;

        return node;
    }));

const findNeighbours = (node, graph) => {
    const { x, y, height } = node;

    const left = graph[y][x-1];
    const right = graph[y][x+1];
    const up = graph[y-1]?.[x];
    const down = graph[y+1]?.[x];

    return [left, right, up, down]
        .filter(Boolean)
        .filter((neighbour) => height + 1 >= neighbour.height)
        .filter(({ visited }) => !visited);
};

const visualize = (graph) => {
    let str = '';
    graph.forEach((row) => {
        row.forEach((node) => str += node.visited ? '-' : String.fromCharCode(node.height));
        str += '\n';
    });
    console.log(str);
};

const queue = [startNode];

while (queue.length) {
    const node = queue.shift();

    if (node.isEnd) {
        console.log('Found end node at depth', node.dist);
        break;
    }

    const neighbours = findNeighbours(node, heightMap);
    neighbours.forEach((neighbour) => {
        neighbour.visited = true;
        neighbour.dist = node.dist + 1;
    });
    // console.log(`Neighbours at depth ${node.dist}`, neighbours);
    // visualize(heightMap);
    queue.push(...neighbours);
}
