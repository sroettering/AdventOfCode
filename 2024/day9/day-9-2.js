import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-9-2.txt', import.meta.url))
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

const rearrangeWholeFiles = (blockFormat) => {
    let lastBlockIdx = blockFormat.findLastIndex((block) => block !== null);
    let firstBlockIdx = blockFormat.findIndex((block) => block === blockFormat[lastBlockIdx]);

    for (let fileId = blockFormat[lastBlockIdx]; fileId >= 0; fileId--) {
        const fileLength = lastBlockIdx - firstBlockIdx + 1;
        const leftPart = blockFormat.slice(0, firstBlockIdx);

        let blockStart = leftPart.findIndex((block) => block === null);
        for (let i = 0; i < fileLength; i++) {
            const block = leftPart[blockStart + i];
            if (block === null) {
                continue;
            }
            if (blockStart + i < leftPart.length) {
                blockStart = leftPart.findIndex((block, idx) => block === null && idx > blockStart + i);

                if (blockStart === -1) {
                    break;
                }

                i = 0;
            } else {
                blockStart = -1;
                break;
            }
        }

        if (blockStart !== -1) {
            blockFormat.splice(blockStart, fileLength, ...new Array(fileLength).fill(fileId));
            blockFormat.splice(firstBlockIdx, fileLength, ...new Array(fileLength).fill(null));
        }

        lastBlockIdx = blockFormat.findLastIndex((block) => block !== null && block < fileId);
        firstBlockIdx = blockFormat.findIndex((block) => block === blockFormat[lastBlockIdx]);
    }

    return blockFormat;
};

const calcChecksum = (blockFormat) => blockFormat.reduce((sum, fileId, idx) => sum + fileId * idx, 0);

console.log(calcChecksum(rearrangeWholeFiles(toBlockFormat(diskMap))));

// terrible run time, possibly faster using string and regex replacements
