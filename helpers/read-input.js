import fs from 'fs';

export const readInput = (filename) => {
    return fs.readFileSync(filename).toString();
}
