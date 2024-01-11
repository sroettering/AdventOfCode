import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-19-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseInput = (lines) => {
    return lines.reduce((dict, line) => {
        const ruleStart = line.indexOf('{');
        const ruleEnd = line.indexOf('}');
        const ruleName = line.substring(0, ruleStart);
        const rawConditions = line.substring(ruleStart + 1, ruleEnd).split(',');

        const conditions = [];
        for (const rawCondition of rawConditions) {
            if (!rawCondition.includes(':')) {
                continue;
            }
            const [bool, goto] = rawCondition.split(':');
            const category = bool.substring(0, 1);
            const comparison = bool.substring(1, 2);
            const targetRating = Number(bool.substring(2));

            if (comparison === '<') {
                conditions.push({
                    targetRule: goto,
                    bounds: { [category]: { lower: 1, upper: targetRating - 1 } },
                    negatedBounds: { [category]: { lower: targetRating, upper: 4000 } },
                });
            } else {
                conditions.push({
                    targetRule: goto,
                    bounds: { [category]: { lower: targetRating + 1, upper: 4000 } },
                    negatedBounds: { [category]: { lower: 1, upper: targetRating } },
                });
            }
        }

        const fallback = rawConditions.find((condition) => !condition.includes(':'));
        if (fallback) {
            const bounds = conditions.reduce((dict, condition) => {
                Object.assign(dict, condition.negatedBounds);
                return dict;
            }, {});
            conditions.push({
                targetRule: fallback,
                bounds,
            });
        }

        dict[ruleName] = conditions;
        return dict;
    }, {});
};

const mergeBounds = (target, source) => {
    for (const category of Object.keys(source)) {
        const { lower: sourceLower, upper: sourceUpper } = source[category] ?? {};
        const { lower: targetLower, upper: targetUpper } = target[category] ?? {};

        target[category] = {
            lower: Math.max(sourceLower ?? 1, targetLower ?? 1),
            upper: Math.min(sourceUpper ?? 4000, targetUpper ?? 4000),
        };
    }
};

const countPermutations = (rules, currentRule, globalBounds, path) => {
    let permutations = 0;
    const allNegatedBounds = {};
    for (const condition of currentRule) {
        const { targetRule, bounds } = condition;
        const updatedBounds = JSON.parse(JSON.stringify(globalBounds));
        mergeBounds(updatedBounds, allNegatedBounds);
        mergeBounds(allNegatedBounds, condition.negatedBounds ?? {});

        for (const category of Object.keys(bounds)) {
            if (globalBounds[category].lower > bounds[category].upper) {
                continue;
            }
            if (globalBounds[category].upper < bounds[category].lower) {
                continue;
            }
            updatedBounds[category] = {
                lower: Math.max(updatedBounds[category].lower, bounds[category].lower),
                upper: Math.min(updatedBounds[category].upper, bounds[category].upper),
            };
        }

        if (targetRule === 'A') {
            const values = Object.values(updatedBounds).reduce((product, { lower, upper }) => {
                return product * (upper - lower + 1);
            }, 1);
            const { x, m, a, s } = updatedBounds;
            console.log(`x[${x.lower}|${x.upper}] m[${m.lower}|${m.upper}] a[${a.lower}|${a.upper}] s[${s.lower}|${s.upper}]`, path.join('->'), values);
            permutations += values;
        } else if (targetRule !== 'R') {
            permutations += countPermutations(rules, rules[targetRule], updatedBounds, [...path, targetRule]);
        }
    }
    return permutations;
};

const rules = parseInput(inputLines);
const startRule = rules.in;
const bounds = {
    x: { lower: 1, upper: 4000 },
    m: { lower: 1, upper: 4000 },
    a: { lower: 1, upper: 4000 },
    s: { lower: 1, upper: 4000 },
};
const result = countPermutations(rules, startRule, bounds, ['in']);
console.log(result);
