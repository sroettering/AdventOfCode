import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-2-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const limits = {
    red: 12,
    green: 13,
    blue: 14,
};

const parseGame = (line) => {
    const [game, reveals] = line.split(': ');
    return {
        id: Number(game.substring(5)),
        reveals: reveals.split('; '),
    };
};

const parseReveal = (reveal) => {
    const cubes = reveal.split(', ');
    const red = cubes.find((cube) => cube.endsWith(' red'));
    const green = cubes.find((cube) => cube.endsWith(' green'));
    const blue = cubes.find((cube) => cube.endsWith(' blue'));
    return {
        red: parseInt(red ?? 0),
        green: parseInt(green ?? 0),
        blue: parseInt(blue ?? 0),
    };
};

const allRevealsPossible = (game) => {
    return game.reveals.every(({ red, green, blue }) => {
        return red <= limits.red && green <= limits.green && blue <= limits.blue;
    });
};

const sum = inputLines
    .map((line) => parseGame(line))
    .map((game) => ({
        ...game,
        reveals: game.reveals.map((reveal) => parseReveal(reveal)),
    }))
    .filter(allRevealsPossible)
    .reduce((sum, { id }) => sum + id, 0);

console.log(sum);
