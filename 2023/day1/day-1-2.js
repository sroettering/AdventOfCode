import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-1-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const unifyMatch = (match) => {
    return match.replace('one', '1')
        .replace('two', '2')
        .replace('three', '3')
        .replace('four', '4')
        .replace('five', '5')
        .replace('six', '6')
        .replace('seven', '7')
        .replace('eight', '8')
        .replace('nine', '9')
};

const reverseString = (string) => Array.from(string).reverse().join('');

const numberRegex = 'one|two|three|four|five|six|seven|eight|nine';
const reversedRegex = reverseString(numberRegex);

const sum = inputLines.reduce((sum, line) => {
    let matches = line.match(new RegExp(`\\d|(${numberRegex})`, 'g'));
    let reversedMatches = reverseString(line).match(new RegExp(`\\d|(${reversedRegex})`, 'g'))
    matches = matches.map(unifyMatch);
    reversedMatches = reversedMatches.map(reverseString).map(unifyMatch);
    return sum + Number(matches[0] + reversedMatches[0]);
}, 0);

console.log(sum);
