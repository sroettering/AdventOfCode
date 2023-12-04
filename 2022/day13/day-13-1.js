import { readInput } from '../../helpers/read-input.js';

const pairs = readInput(new URL('day-13-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .reduce((aggregate, line, idx) => {
        if (idx % 2 === 0) {
            aggregate.push([]);
        }
        aggregate[aggregate.length - 1].push(JSON.parse(line));
        return aggregate;
    }, []);

const hasCorrectOrder = (itemA, itemB) => {
    // console.log(itemA, ' - ', itemB);
    for (let x = 0; x < Math.max(itemA.length, itemB.length); x++) {
        const left = itemA[x];
        const right = itemB[x];
        if (!Array.isArray(left) && !Array.isArray(right)) {
            // console.log('Comparing', itemA[x], itemB[x]);
            if (left != null && right == null) {
                return false;
            }
            if (left == null && right != null) {
                return true;
            }
            if (left > right) {
                return false;
            }
            if (left < right) {
                return true;
            }
        } else if (Array.isArray(left) && Array.isArray(right)) {
            if (!left.length && right.length) {
                return true;
            }
            if (left.length && !right.length) {
                return false;
            }
            if (!left.length && !right.length) {
                return;
            }
            const checkOrder = hasCorrectOrder(left, right);
            if (checkOrder === true) {
                return true;
            } else if (checkOrder === false) {
                return false;
            }
        } else {
            const currentA = Array.isArray(left) ? left : [left];
            const currentB = Array.isArray(right) ? right : [right];
            // console.log('comparing', itemA[x], currentA, itemB[x], currentB);
            const checkOrder = hasCorrectOrder(currentA, currentB);
            if (checkOrder === true) {
                return true;
            } else if (checkOrder === false) {
                return false;
            }
        }
    }
}

const pairToCompare = 1;
// console.log(hasCorrectOrder(pairs[pairToCompare][0], pairs[pairToCompare][1]));

pairs.forEach((pair, idx) => {
    console.log(`Pair ${idx+1} has correct order:`, hasCorrectOrder(pair[0], pair[1]));
});

const result = pairs.reduce((sum, pair, idx) => {
    const isCorrect = hasCorrectOrder(pair[0], pair[1]);
    return sum + (isCorrect === true || isCorrect === undefined ? idx + 1 : 0);
}, 0);
console.log(result);
