import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-12-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseSprings = (lines) => {
    return lines.map((line) => {
        const [springs, conditions] = line.split(' ');
        const expandedSprings = [springs, springs, springs, springs, springs].join('?');
        const expandedConditions = [conditions, conditions, conditions, conditions, conditions].join(',');
        return {
            springs: expandedSprings,
            conditions: expandedConditions.split(',').map((condition) => Number(condition)),
        };
    });
};

const springs = parseSprings(inputLines);

const countArrangements = ({ springs, conditions }) => {
    const cache = {};
    return countArrangement(springs, conditions, cache);
};

const countArrangement = (springs, conditions, cache) => {
    const cacheKey = `${springs}-${conditions.join(',')}`;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    if (!conditions.length && !springs.includes('#')) {
        // console.log('found arrangement');
        cache[cacheKey] = 1;
        return 1;
    }
    if (!conditions.length && springs.includes('#')) {
        cache[cacheKey] = 0;
        return 0;
    }

    const neededSprings = conditions.reduce((sum, condition) => sum + condition, 0) + conditions.length - 1;

    let arrangements = 0;
    for (let s = 0; s <= springs.length - neededSprings; s++) {
        const group = springs.substring(s, s + conditions[0]);
        // console.log('group', group, 'conditions', conditions, 'springs', springs, 'window at', s);
        if (group.includes('.') && !group.startsWith('#')) {
            // console.log('skipping group', group, conditions[0]);
            continue;
        } else if (group.includes('.')) {
            cache[cacheKey] = arrangements;
            return arrangements;
        }

        const nextChar = springs.charAt(s + conditions[0]);
        if (nextChar === '#' && group.startsWith('#')) {
            // console.log('arrangement not possible because of next char', nextChar);
            cache[cacheKey] = arrangements;
            return arrangements;
        } else if (nextChar === '#') {
            // console.log('group starts with ?, but is followed by #, skipping it');
            continue;
        }

        const newSprings = springs.substring(s + conditions[0] + 1);
        // console.log('group', group, 'is valid. rest springs', newSprings);

        if (newSprings.length + 1 < neededSprings - conditions[0]) {
            // console.log('not enough springs left', newSprings, neededSprings - conditions[0]);
            cache[cacheKey] = 0;
            return 0;
        }

        arrangements += countArrangement(newSprings, conditions.slice(1), cache);

        if (group.startsWith('#')) {
            cache[cacheKey] = arrangements;
            return arrangements;
        }
    }
    cache[cacheKey] = arrangements;
    return arrangements
};

const result = springs
    .map((row, idx) => {
        console.log('analyzing row', idx);
        return countArrangements(row);
    })
    .reduce((sum, arrangements) => sum + arrangements, 0);
console.log(result);
//3415570893842
