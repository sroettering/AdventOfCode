import { readInput } from '../../helpers/read-input.js';

const distance = (pos1, pos2) => {
    return (Math.max(pos1.x, pos2.x) - Math.min(pos1.x, pos2.x))
        + (Math.max(pos1.y, pos2.y) - Math.min(pos1.y, pos2.y))
}

const sensorBeaconPairs = readInput(new URL('day-15-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '')
    .map((line) => {
        const [sensor, beacon] = line.split(':');

        const sensorX = parseInt(sensor.substring(12, sensor.indexOf(',')));
        const sensorY = parseInt(sensor.substring(sensor.indexOf(',') + 4));

        const beaconX = parseInt(beacon.substring(24, beacon.indexOf(',')));
        const beaconY = parseInt(beacon.substring(beacon.indexOf(',') + 4));

        return {
            sensor: { x: sensorX, y: sensorY },
            beacon: { x: beaconX, y: beaconY },
            distance: distance({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY }),
        };
    });

const targetRow = 2000000;

const minXLimit = Math.min(...sensorBeaconPairs.map(({ sensor, beacon }) => Math.min(sensor.x, beacon.x)));
const maxXLimit = Math.max(...sensorBeaconPairs.map(({ sensor, beacon }) => Math.max(sensor.x, beacon.x)));

const blockedXValues = new Set();

sensorBeaconPairs.forEach(({ sensor, beacon, distance }) => {
    const sensorYDistance = Math.abs(sensor.y - targetRow);
    if (sensorYDistance <= distance) {
        const minX = sensor.x - (distance - sensorYDistance);
        const maxX = sensor.x + (distance - sensorYDistance);
        for (let x = minX; x <= maxX; x++) {
            blockedXValues.add(x);
        }
    }
});

sensorBeaconPairs.forEach(({ beacon: { x, y } }) => {
    if (y === targetRow) {
        blockedXValues.delete(x);
    }
})

console.log(blockedXValues.size);
