import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-9-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseSeries = (lines) => {
    return lines.map((line) => line.split(' ').map((num) => Number(num)));
};

const extrapolateSeries = (series) => {
    const rows = buildRows(series);

    for (let r = rows.length - 1; r > 0; r--) {
        const lastItem = rows[r][rows[r].length - 1];
        const lastItemRowBefore = rows[r-1][rows[r-1].length - 1];
        rows[r - 1].push(lastItem + lastItemRowBefore);
    }
    return rows[0][rows[0].length - 1];
};

const buildRows = (series) => {
    const rows = [series];
    let lastRow = series;
    while(lastRow.some((num) => num !== 0)) {
        const newRow = [];
        for (let i = 0; i < lastRow.length - 1; i++) {
            newRow.push(lastRow[i + 1] - lastRow[i]);
        }
        rows.push(newRow);
        lastRow = newRow;
    }
    return rows;
};

const series = parseSeries(inputLines);
const result = series.map(extrapolateSeries).reduce((sum, num) => sum + num, 0);

console.log(result);
