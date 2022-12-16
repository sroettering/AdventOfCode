import { polygon } from '@turf/helpers';
import union from '@turf/union';
import intersect from '@turf/intersect';
import { readInput } from '../helpers/read-input.js';

const distance = (pos1, pos2) => {
    return (Math.max(pos1.x, pos2.x) - Math.min(pos1.x, pos2.x))
        + (Math.max(pos1.y, pos2.y) - Math.min(pos1.y, pos2.y))
}

const sensorBeaconPairs = readInput(new URL('day-15-2.txt', import.meta.url))
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
    })
    .map(({ sensor, distance }) => {
        return polygon([[
            [sensor.x - distance, sensor.y],
            [sensor.x, sensor.y + distance],
            [sensor.x + distance, sensor.y],
            [sensor.x, sensor.y - distance],
            [sensor.x - distance, sensor.y],
        ]]);
    })
    .reduce((merged, poly) => {
        if (!merged) {
            return poly;
        }
        return union(merged, poly);
    }, null);

const windowPolygon = polygon([[[0, 0], [0, 4000000], [4000000, 4000000], [4000000, 0], [0, 0]]]);

const relevantWindow = intersect(sensorBeaconPairs, windowPolygon);

console.log(relevantWindow.geometry.coordinates[1]);

console.log(2911363 * 4000000 + 2855041);
