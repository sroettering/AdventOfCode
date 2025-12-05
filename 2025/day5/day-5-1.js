import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-5-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const database = inputLines.reduce((db, line) => {
    if (line.includes('-')) {
        const [first, last] = line.split('-').map(id => parseInt(id));
        db.freshIds.push({ first, last });
    } else {
        db.availableIds.push(parseInt(line));
    }
    return db;
}, { freshIds: [], availableIds: [] });

const result = database.availableIds.filter(id => {
    return database.freshIds.some(({ first, last }) => first <= id && last >= id);
}).length;

console.log(result);
