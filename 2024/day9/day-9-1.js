import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-9-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const diskMap = inputLines.map((line) => line.split('').map(Number)).flat();

const toBlockFormat = (map) => {
    let fileId = 0;
    let isFile = true;
    const blockFormat = [];

    for (const entry of map) {
        if (isFile) {
            blockFormat.push(...new Array(entry).fill(fileId));
            fileId++;
        } else {
            blockFormat.push(...new Array(entry).fill(null));
        }
        isFile = !isFile;
    }

    return blockFormat;
};

const rearrangeFileBlocks = (blockFormat) => {
    for (let i = 0; i < blockFormat.length; i++) {
        const block = blockFormat[i];
        if (block === null) {
            const lastBlock = blockFormat.findLastIndex((value) => value !== null);
            if (lastBlock <= i) {
                break;
            }

            blockFormat[i] = blockFormat[lastBlock];
            blockFormat[lastBlock] = null;
        }
    }

    return blockFormat;
};

const calcChecksum = (blockFormat) => blockFormat.reduce((sum, fileId, idx) => sum + fileId * idx, 0);

console.log(calcChecksum(rearrangeFileBlocks(toBlockFormat(diskMap))));
