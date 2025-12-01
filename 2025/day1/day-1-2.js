import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-1-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const operations = {
    'L': (dial, clicks) => (((dial - clicks) % 100) + 100) % 100,
    'R': (dial, clicks) => (dial + clicks) % 100,
};

const { zeros } = inputLines.map(line => ([line[0], parseInt(line.substring(1))]))
    .reduce(({ dial, zeros }, [direction, clicks]) => {
        const result = operations[direction](dial, clicks);

        let zeroHits = zeros;
        if (direction === 'R') {
            zeroHits += Math.floor((dial + clicks) / 100);
        } else {
            zeroHits += Math.floor(((dial - clicks) / -100) + (dial === 0 ? 0 : 1));
        }

        return { dial: result, zeros: zeroHits };
    }, { dial: 50, zeros: 0 });

console.log(zeros);
