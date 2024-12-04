import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-2-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const isReportSafe = (report) => {
    let sign;
    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i] - report[i+1];
        if (!sign) {
            sign = Math.sign(diff);
        }
        if (sign !== Math.sign(diff) || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
    }
    return true;
};

const numSafeReports = inputLines.map((line) => line.split(' '))
    .map((values) => values.map((num) => Number(num)))
    .map((report) => isReportSafe(report))
    .filter(Boolean)
    .length;

console.log(numSafeReports);
