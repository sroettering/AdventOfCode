import { readInput } from '../../helpers/read-input.js';

const moves = readInput(new URL('day-9-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .reduce((directions, instruction) => {
        const [direction, steps] = instruction.split(' ');
        directions.push(...new Array(+steps).fill(direction));
        return directions;
    }, []);

const buildKey = (x, y) => `${x}_${y}`;

const knots = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
];
const visitedPositions = new Set();

const movements = {
    'R': { dx: 1, dy: 0 },
    'L': { dx: -1, dy: 0 },
    'D': { dx:0, dy: 1 },
    'U': { dx: 0, dy: -1 },
}

const distance = (pos1, pos2) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

const follow = (head, tail) => {
    const { dx, dy } = {
        dx: head.x === tail.x ? 0 : (head.x - tail.x) / Math.abs(head.x - tail.x),
        dy: head.y === tail.y ? 0 : (head.y - tail.y) / Math.abs(head.y - tail.y),
    };

    if (distance(head, tail) >= 2) {
        tail.x += dx;
        tail.y += dy;
    }
}

const visualize = (currentKnots) => {
    let str = '';
    for (let y = -4; y <= 0; y++) {
        for (let x = 0; x <= 5; x++) {
            const knot = currentKnots.findIndex((k) => k.x === x && k.y === y);
            str += (knot === -1 ? '.' : knot);
        }
        str += '\n';
    }
    return str;
};


moves.forEach((move) => {
    const { dx, dy } = movements[move];
    knots[0].x += dx;
    knots[0].y += dy;

    for (let k = 1; k < knots.length; k++) {
        follow(knots[k-1], knots[k]);
    }
    visitedPositions.add(buildKey(knots[knots.length - 1].x, knots[knots.length - 1].y));
    // console.log(visualize(knots));
});

console.log('Unique Tail Positions:', visitedPositions.size);
