import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-12-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseSprings = (lines) => {
    return lines.map((line) => {
        const [springs, conditions] = line.split(' ');
        return {
            springs,
            conditions: conditions.split(',').map((condition) => Number(condition)),
        };
    });
};

const springs = parseSprings(inputLines);

const countArrangements = ({ springs, conditions }) => {
    return checkArrangement(springs, conditions);
};

const checkArrangement = (springs, conditions) => {
    const groups = springs.split(/\.+/).filter((group) => group !== '');
    console.log(springs, groups, conditions);

    const sumSprings = groups.reduce((sum, group) => sum + group.length, 0);
    const sumConditions = conditions.reduce((sum, condition) => sum + condition, 0);
    if (sumSprings < sumConditions) {
        return 0;
    }

    const groupsWithSprings = groups.filter((group) => group.includes('#')).length;
    if (groupsWithSprings > conditions.length) {
        return 0;
    }

    if (groups[0].match(/^#+/)?.[0].length > conditions[0]) {
        return 0;
    }

    if (groups[0].match(/^#+$/) && groups[0].length !== conditions[0]) {
        return 0;
    }

    while (groups[0].match(new RegExp(`^#{${conditions[0]}}(?!#)`))) {
        console.log('removing', conditions[0], 'from', groups[0]);
        groups[0] = groups[0].substring(conditions[0]);
        conditions.shift();
        if (!groups[0].length) {
            groups.shift();
        } else if (!conditions.length && groups.every((group) => group.match(/^\?+$/))) { // consider removing else here
            console.log('found permutation', groups, conditions);
            return 1;
        } else if (groups[0]?.startsWith('?')) {
            // console.log('group continues with ?, setting it to .');
            groups[0] = groups[0].replace('?', '.');
            return checkArrangement(groups.join('.'), conditions);
        }

        if (groups.length === 0 && conditions.length === 0) {
            console.log('found permutation', groups, conditions);
            return 1;
        } else if (groups.length === 0 || conditions.length === 0) {
            // console.log('early exit', groups, conditions);
            return 0;
        }
    }

    const broken = groups.slice();
    broken[0] = broken[0].replace(/\?/, '.');
    const working = groups.slice();
    working[0] = working[0].replace(/\?/, '#');
    // console.log('splitting', groups, 'into: ', broken, working);

    return checkArrangement(working.join('.'), [...conditions]) + checkArrangement(broken.join('.'), [...conditions]);
};

// .?##
// ..## , .###

// console.log(countArrangements({ springs: '###', conditions: [3] }));
// console.log(countArrangements({ springs: '???.##', conditions: [3, 2] }));
// console.log(countArrangements({ springs: '???.###', conditions: [1, 1, 3] }));
// console.log(countArrangements({ springs: '.??..??...?##.', conditions: [1, 1, 3] }));
// console.log(countArrangements({ springs: '?##.', conditions: [3] }));
// console.log(countArrangements({ springs: '?#?#?#?#?#?#?#?', conditions: [1, 3, 1, 6] }));
// console.log(countArrangements({ springs: '?###????????', conditions: [3, 2, 1] }));
// console.log(countArrangements({ springs: '???????????', conditions: [3, 2, 1] }));

const row = springs[13];
console.log(row, 'result: ', countArrangements({ springs: row.springs, conditions: [...row.conditions] }));

// for (let r = 0; r < springs.length; r++) {
//     console.log(`Row ${r}: `, countArrangements(springs[r]));
// }

// const result = springs.reduce((sum, row) => sum + countArrangements(row), 0);
// console.log(result);

// ??.##?#?##??.???
// #..#######.#....
// .#.#######.#....

// #..#######...#..
// .#.#######...#..

// #..#######....#.
// .#.#######....#.

// #..#######.....#
// .#.#######.....#
