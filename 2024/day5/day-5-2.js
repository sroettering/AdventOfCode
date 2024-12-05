import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-2.txt', import.meta.url))
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

const orderPages = (update, rules) => {

    const orderPage = (remainingUpdate, orderedUpdate) => {
        if (!remainingUpdate.length) {
            return orderedUpdate;
        }
        const [currPage, ...rest] = remainingUpdate;
        const brokenRules = rules.filter(({ page }) => currPage === page)
            .filter(({ condition }) => update.includes(condition))
            .filter(({ condition }) => !orderedUpdate.includes(condition));

        if (brokenRules.length) {
            rest.push(currPage);
        } else {
            orderedUpdate.push(currPage);
        }
        return orderPage(rest, orderedUpdate);
    };

    return orderPage(update, []);
};

const sum = updates.filter(update => attemptPrint(update, rules).length !== update.length)
    .map((update) => orderPages(update, rules))
    .reduce((sum, pages) => sum + Number(pages[Math.floor(pages.length / 2)]), 0);

console.log(sum);
