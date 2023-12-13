import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-13-1.txt', import.meta.url))
    .split('\n');

const parsePatterns = (lines) => {
    const patterns = [[]];
    for (let l = 0; l < lines.length - 1; l++) {
        if (lines[l] === '') {
            patterns.push([]);
            continue;
        }
        patterns[patterns.length - 1].push(lines[l]);
    }
    return patterns;
};

const patterns = parsePatterns(inputLines);

const getReflectionLength = (left, right) => {
    for (let c = 0; c < Math.min(left.length, right.length); c++) {
        if (left[c] !== right[c]) {
            return c;
        }
    }
    return Math.min(left.length, right.length);
};

const findVerticalMirror = (pattern) => {
    for (let m = 1; m < pattern[0].length; m++) {
        const reflections = pattern.map((row) => {
            const left = row.slice(0, m).split('').reverse().join('');
            const right = row.slice(m);
            return getReflectionLength(left, right);
        });

        if (reflections.some((reflection) => reflection !== pattern[0].length - m && reflection !== m)) {
            continue;
        }

        return m;
    }
    return 0;
};

const findHorizontalMirror = (pattern) => {
    const transposedPattern = [];
    for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[0].length; x++) {
            transposedPattern[x] = transposedPattern[x] || [''];
            transposedPattern[x] += pattern[y][x];
        }
    }
    return findVerticalMirror(transposedPattern);
};

const result = patterns.map((pattern) => {
    const vertical = findVerticalMirror(pattern);
    const horizontal = findHorizontalMirror(pattern);
    // console.log(pattern.join('\n'));
    // console.log('vertical', vertical, 'horizontal', horizontal);
    // console.log('------------------');
    return vertical + 100 * horizontal;
})
    .reduce((sum, value) => sum + value, 0);
console.log(result);
//34772
