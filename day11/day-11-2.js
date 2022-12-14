class Monkey {
    items;
    operation;
    test;

    inspections;

    constructor({ items, operation, test }) {
        this.items = items;
        this.operation = operation;
        this.test = test;

        this.inspections = 0;
    }

    give(item) {
        this.items.push(item);
    }

    act(monkeys) {
        while (this.items.length) {
            this.inspections++;
            const worryLevel = this.items.splice(0, 1)[0];
            const updatedWorryLevel = this.operation(worryLevel) % (11 * 7 * 13 * 5 * 3 * 17 * 2 * 19);
            this.test(updatedWorryLevel, monkeys);
        }
    }
}

// puzzle input
const monkeys = [
    new Monkey({
        items: [57],
        operation: (item) => item * 13,
        test: (item, monkeys) => item % 11 === 0 ? monkeys[3].give(item) : monkeys[2].give(item),
    }),
    new Monkey({
        items: [58, 93, 88, 81, 72, 73, 65],
        operation: (item) => item + 2,
        test: (item, monkeys) => item % 7 === 0 ? monkeys[6].give(item) : monkeys[7].give(item),
    }),
    new Monkey({
        items: [65, 95],
        operation: (item) => item + 6,
        test: (item, monkeys) => item % 13 === 0 ? monkeys[3].give(item) : monkeys[5].give(item),
    }),
    new Monkey({
        items: [58, 80, 81, 83],
        operation: (item) => item * item,
        test: (item, monkeys) => item % 5 === 0 ? monkeys[4].give(item) : monkeys[5].give(item),
    }),
    new Monkey({
        items: [58, 89, 90, 96, 55],
        operation: (item) => item + 3,
        test: (item, monkeys) => item % 3 === 0 ? monkeys[1].give(item) : monkeys[7].give(item),
    }),
    new Monkey({
        items: [66, 73, 87, 58, 62, 67],
        operation: (item) => item * 7,
        test: (item, monkeys) => item % 17 === 0 ? monkeys[4].give(item) : monkeys[1].give(item),
    }),
    new Monkey({
        items: [85, 55, 89],
        operation: (item) => item + 4,
        test: (item, monkeys) => item % 2 === 0 ? monkeys[2].give(item) : monkeys[0].give(item),
    }),
    new Monkey({
        items: [73, 80, 54, 94, 90, 52, 69, 58],
        operation: (item) => item + 7,
        test: (item, monkeys) => item % 19 === 0 ? monkeys[6].give(item) : monkeys[0].give(item),
    }),
];

// example input
// const monkeys = [
//     new Monkey({
//         items: [79, 98],
//         operation: (item) => item * 19,
//         test: (item, monkeys) => {
//             if (item % 23 === 0) {
//                 monkeys[2].give(item);
//             } else {
//                 monkeys[3].give(item);
//             }
//             // item % 23 === 0 ? monkeys[2].give(item) : monkeys[3].give(item)
//         },
//     }),
//     new Monkey({
//         items: [54, 65, 75, 74],
//         operation: (item) => item + 6,
//         test: (item, monkeys) => {
//             if (item % 19 === 0) {
//                 monkeys[2].give(item);
//             } else {
//                 monkeys[0].give(item);
//             }
//             // item % 19 === 0 ? monkeys[2].give(item) : monkeys[0].give(item)
//         },
//     }),
//     new Monkey({
//         items: [79, 60, 97],
//         operation: (item) => item * item,
//         test: (item, monkeys) => {
//             if (item % 13 === 0) {
//                 monkeys[1].give(item);
//             } else {
//                 monkeys[3].give(item);
//             }
//             // item % 13 === 0 ? monkeys[1].give(item) : monkeys[3].give(item)
//         },
//     }),
//     new Monkey({
//         items: [74],
//         operation: (item) => item + 3,
//         test: (item, monkeys) => {
//             if (item % 17 === 0) {
//                 monkeys[0].give(item);
//             } else {
//                 monkeys[1].give(item);
//             }
//             // item % 17 === 0 ? monkeys[0].give(item) : monkeys[1].give(item)
//         },
//     }),
// ];

const rounds = 10000;

const outputRounds = [19, 999, 1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999]

for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey) => monkey.act(monkeys));

    if (outputRounds.includes(round)) {
        console.log(`== After round ${ round + 1 } ==`);
        monkeys.forEach((monkey, idx) => console.log(`Monkey ${ idx } inspected items ${ monkey.inspections } times.`));
        console.log(`\n`);
    }
}

const sortedMonkeys = monkeys.sort((mA, mB) => mB.inspections - mA.inspections);
console.log(sortedMonkeys[0].inspections * sortedMonkeys[1].inspections);
