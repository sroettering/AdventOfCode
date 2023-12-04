import { readInput } from '../../helpers/read-input.js';

const interpolate = (pos1, pos2) => {
    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
        return [pos2];
    }

    if (pos1[0] === pos2[0]) {
        // y axis
        if (pos1[1] > pos2[1]) {
            return interpolate(pos2, pos1);
        }

        return [pos1, ...interpolate([pos1[0], pos1[1]+1], pos2)];
    } else if (pos1[1] === pos2[1]) {
        // x axis
        if (pos1[0] > pos2[0]) {
            return interpolate(pos2, pos1);
        }

        return [pos1, ...interpolate([pos1[0]+1, pos1[1]], pos2)];
    }
};

const rockPaths = readInput(new URL('day-14-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((line) => {
        return line.split(' -> ')
            .map(position => position.split(',').map(coord => parseInt(coord)));
    });

const blockedAir = [];
rockPaths.forEach((rockPath) => {
    for (let r = 1; r <= rockPath.length - 1; r++) {
        blockedAir.push(...interpolate(rockPath[r-1], rockPath[r]));
    }
});

const floorLine = Math.max(...blockedAir.map(coord => coord[1])) + 2;

// console.log(blockedAir);

const isFree = (x, y) => {
    return !blockedAir.find((block) => block[0] === x && block[1] === y);
};

let numSettled = 0;
let sandParticle = [500, 0];
while (true) {
    if (sandParticle[1] + 1 === floorLine) {
        blockedAir.push(sandParticle);
        sandParticle = [500, 0];
        numSettled++;
    } else if (isFree(sandParticle[0], sandParticle[1]+1)) {
        sandParticle[1]++;
    } else if (isFree(sandParticle[0]-1, sandParticle[1]+1)) {
        sandParticle[0]--;
        sandParticle[1]++;
    } else if (isFree(sandParticle[0]+1, sandParticle[1]+1)) {
        sandParticle[0]++;
        sandParticle[1]++;
    } else {
        if (sandParticle[1] === 0) {
            console.log('Settling at 500,0', sandParticle);
            numSettled++;
            break;
        }
        blockedAir.push(sandParticle);
        sandParticle = [500, 0];
        numSettled++;
    }
}

console.log(numSettled);
