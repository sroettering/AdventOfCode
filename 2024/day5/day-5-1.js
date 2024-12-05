import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const splitIdx = inputLines.findIndex((line) => line.includes(','));
const rules = inputLines.slice(0, splitIdx).map((line) => {
    const [condition, page] = line.split('|');
    return { page, condition };
});
const updates = inputLines.slice(splitIdx).map((line) => line.split(','));

const attemptPrint = (update, rules) => {
    const printedPages = [];
    for (let currPage of update) {
        const brokenRules = rules.filter(({ page }) => currPage === page)
            .filter(({ condition }) => update.includes(condition))
            .filter(({ condition }) => !printedPages.includes(condition));

        if (!brokenRules.length) {
            printedPages.push(currPage);
        }
    }
    return printedPages;
};

const printedMiddlePages = updates.map(update => {
    const printedPages = attemptPrint(update, rules);
    if (printedPages.length === update.length) {
        return Number(printedPages[Math.floor(printedPages.length / 2)]);
    }
    return 0;
});

const sum = printedMiddlePages.reduce((sum, page) => sum + page, 0);
console.log(sum);
