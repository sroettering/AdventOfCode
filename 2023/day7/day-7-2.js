import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-7-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const cardMap = { 'J': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'Q': 11, 'K': 12, 'A': 13 };

const rankCards = (cards) => {
    const handSummary = cards.split('').reduce((summary, card) => {
        summary[card] = summary[card] || 0;
        summary[card]++;
        return summary;
    }, {});

    const jokers = handSummary['J'] || 0;
    delete handSummary['J'];

    const commonCards = Object.values(handSummary).sort().reverse();
    commonCards[0] += jokers;

    if (jokers === 5) {
        return 6; // five of a kind
    } else if (commonCards[0] === 5) {
        return 6; // five of a kind
    } else if (commonCards[0] === 4) {
        return 5; // four of a kind
    } else if (commonCards[0] === 3 && commonCards[1] === 2) {
        return 4; // full house
    } else if (commonCards[0] === 3) {
        return 3; // three of a kind
    } else if (commonCards[0] === 2 && commonCards[1] === 2) {
        return 2; // two pair
    } else if (commonCards[0] === 2) {
        return 1; // one pair
    }
    return 0;
};

const parseHand = (line) => {
    const [cards, bid] = line.split(' ');
    return {
        cards,
        handRank: rankCards(cards),
        bid: Number(bid),
    };
};

const compareHands = (hand1, hand2) => {
    if (hand1.handRank > hand2.handRank) {
        return 1;
    }
    if (hand1.handRank < hand2.handRank) {
        return -1;
    }
    for (let c = 0; c < hand1.cards.length; c++) {
        const comparison = compareCards(hand1.cards[c], hand2.cards[c]);
        if (comparison !== 0) {
            return comparison;
        }
    }
    return 0;
};

const compareCards = (card1, card2) => {
    if (cardMap[card1] > cardMap[card2]) {
        return 1;
    }
    if (cardMap[card1] < cardMap[card2]) {
        return -1;
    }
    return 0;
};

console.time('calculate');
const result = inputLines.map(parseHand)
    .sort(compareHands)
    .reduce((sum, { bid, cards }, index) => sum + (bid * (index + 1)), 0);
console.timeEnd('calculate');

console.log(result);
// 248652697
