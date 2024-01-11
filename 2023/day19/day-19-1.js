import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-19-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const parseInput = (lines) => {
    const rules = [];
    const parts = [];
    lines.forEach(line => {
        if (line.startsWith('{')) {
            const json = line.replace('x', '"x"').replace('m', '"m"').replace('a', '"a"').replace('s', '"s"').replace(/=/g, ':')
            parts.push(JSON.parse(json));
        } else {
            rules.push(Rule.from(line));
        }
    });

    return { rules, parts };
};

class Rule {

    static from(line) {
        const ruleStart = line.indexOf('{');
        const ruleEnd = line.indexOf('}');
        const ruleName = line.substring(0, ruleStart);
        const conditions = line.substring(ruleStart + 1, ruleEnd)
            .split(',')
            .map((condition) => {
                if (condition.includes(':')) {
                    const [bool, goto] = condition.split(':');
                    const category = bool.substring(0, 1);
                    const comparison = bool.substring(1, 2);
                    const targetRating = bool.substring(2);

                    return (part) => {
                        const rating = part[category];
                        if (comparison === '<') {
                            return rating < targetRating ? goto : null;
                        } else {
                            return rating > targetRating ? goto : null;
                        }
                    };
                } else {
                    return () => condition;
                }
            });

        return new Rule(ruleName, conditions);
    }

    constructor(name, conditions) {
        this.name = name;
        this.conditions = conditions;
    }

    check(part) {
        for (const condition of this.conditions) {
            const goto = condition(part);
            if (goto) {
                return goto;
            }
        }
    }
}

const ruleMap = new Map();
const acceptedParts = [];
const rejectedParts = [];

const { rules, parts } = parseInput(inputLines);
rules.forEach(rule => ruleMap.set(rule.name, rule));

parts.forEach((part) => {
    let currentRule = 'in';
    while (currentRule !== 'A' && currentRule !== 'R') {
        const rule = ruleMap.get(currentRule);
        currentRule = rule.check(part);
    }
    if (currentRule === 'A') {
        acceptedParts.push(part);
    } else {
        rejectedParts.push(part);
    }
});

const result = acceptedParts.reduce((sum, part) => sum + part.x + part.m + part.a + part.s, 0);
console.log(result);
