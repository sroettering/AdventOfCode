import { readInput } from '../../helpers/read-input.js';

const packages = readInput(new URL('day-13-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((line) => JSON.parse(line));

packages.push([[2]]);
packages.push([[6]]);

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

const sortedPackages = packages.sort((pairA, pairB) => {
    const inOrder = hasCorrectOrder(pairA, pairB);
    return inOrder === false ? 1 : -1;
});

console.log(sortedPackages);

const dividerTwo = '[[2]]';
const dividerSix = '[[6]]';
const dividerIndices = [];

for (let i = 0; i < sortedPackages.length; i++) {
    if (JSON.stringify(sortedPackages[i]) === dividerTwo) {
        dividerIndices.push(i+1);
    }
    if (JSON.stringify(sortedPackages[i]) === dividerSix) {
        dividerIndices.push(i+1);
    }
}

console.log(dividerIndices[0] * dividerIndices[1]);
