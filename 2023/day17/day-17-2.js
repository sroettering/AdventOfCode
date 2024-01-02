import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-17-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseInput = (lines) => {
    return lines.map((line, y) => line.split('').map((heat, x) => ({
        heat: Number(heat),
        x,
        y
    })));
};

class PrioQueue {
    queue = {};

    minPrio = null;

    getPrio;

    constructor(getPrio) {
        this.getPrio = getPrio;
    }

    push(node) {
        const priority = this.getPrio(node);
        this.queue[priority] = this.queue[priority] || [];
        this.queue[priority].push(node);
        this.minPrio = Math.min(this.minPrio, priority);
    }

    pop() {
        const node = this.queue[this.minPrio].shift();
        if (!this.queue[this.minPrio].length) {
            delete this.queue[this.minPrio];
            this.minPrio = Math.min(...Object.keys(this.queue));
        }
        return node;
    }

    isEmpty() {
        return !Object.keys(this.queue).length;
    }
}

const dijkstra = (grid, start, dest) => {
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];
    const queue = new PrioQueue((node) => node.heatLoss);
    queue.push({ x: 0, y: 0, heatLoss: 0, dirX: 0, dirY: 0, numStraightSteps: 0 });
    const visited = new Set();

    while (!queue.isEmpty()) {
        const { heatLoss, ...current } = queue.pop();
        if (current.numStraightSteps > 10) {
            continue;
        }

        if (visited.has(JSON.stringify(current))) {
            continue;
        }

        if (current.x === dest.x && current.y === dest.y && current.numStraightSteps >= 4) {
            return heatLoss;
        }

        directions
            .filter(({ x, y }) => x !== -current.dirX || y !== -current.dirY)
            .filter(({ x, y }) => (current.dirX === 0 && current.dirY === 0) || (x === current.dirX && y === current.dirY) || current.numStraightSteps >= 4)
            .filter(({ x, y }) => current.x + x >= 0 && current.y + y >= 0 && current.y + y < grid.length && current.x + x < grid[current.y + y].length)
            .forEach(({ x, y }) => {
                const additionalLoss = grid[current.y + y][current.x + x].heat;
                const neighbor = {
                    x: current.x + x,
                    y: current.y + y,
                    heatLoss: heatLoss + additionalLoss,
                    dirX: x,
                    dirY: y,
                    numStraightSteps: current.dirX === x && current.dirY === y ? current.numStraightSteps + 1 : 1,
                };
                queue.push(neighbor);
            });
        visited.add(JSON.stringify(current));
    }

    console.log('did not find destination node', queue, visited);
    return 0;
};

const grid = parseInput(inputLines);
const start = grid[0][0];
const dest = grid[grid.length - 1][grid[0].length - 1];

const result = dijkstra(grid, start, dest);
console.log(result); // -> 32
