import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-13-2.txt', import.meta.url))
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

const getDifference = (str1, str2) => {
    let diff = 0;
    for (let c = 0; c < str1.length; c++) {
        if (str1[c] !== str2[c]) {
            diff++;
        }
    }
    return diff;
};

const getReflectionLength = (top, bottom) => {
    let differences = 0;
    for (let r = 0; r < Math.min(top.length, bottom.length); r++) {
        differences += getDifference(top[r], bottom[r]);
        if (differences > 0) {
            return r;
        }
    }
    return Math.min(top.length, bottom.length);
};

const getReflectionWithSmudge = (top, bottom) => {
    let differences = 0;
    for (let r = 0; r < Math.min(top.length, bottom.length); r++) {
        differences += getDifference(top[r], bottom[r]);
        if (differences > 1) {
            return r;
        }
    }
    return Math.min(top.length, bottom.length);
};

const findHorizontalMirror = (pattern) => {
    for (let m = 1; m < pattern.length; m++) {
        const top = pattern.slice(0, m).reverse();
        const bottom = pattern.slice(m);
        const reflection = getReflectionLength(top, bottom);
        const reflectionWithSmudge = getReflectionWithSmudge(top, bottom);
        if ((reflectionWithSmudge === top.length || reflectionWithSmudge === bottom.length) && reflection !== reflectionWithSmudge) {
            return m;
        }
    }
    return 0;
};

const findVerticalMirror = (pattern) => {
    const transposedPattern = [];
    for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[0].length; x++) {
            transposedPattern[x] = transposedPattern[x] || [''];
            transposedPattern[x] += pattern[y][x];
        }
    }
    return findHorizontalMirror(transposedPattern);
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
//35554
