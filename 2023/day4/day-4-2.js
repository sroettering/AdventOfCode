import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-4-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseCard = (line) => {
    const withoutPrefix = line.substring(line.match(/:/).index + 1);
    return withoutPrefix.split('|').map((part) => part.trim().split(/\s+/));
}

const calculateWins = ([winning, actual]) => {
    return winning.filter((num) => actual.includes(num)).length;
};

const sum = inputLines.map(parseCard)
    .map((card) => ({ card, copies: 1 }))
    .map((card, index, cards) => {
        const wins = calculateWins(card.card);
        for (let w = 1; w <= wins; w++) {
            cards[index + w].copies += card.copies;
        }
        return card;
    })
    .reduce((sum, { copies }) => sum + copies, 0);

console.log(sum);
