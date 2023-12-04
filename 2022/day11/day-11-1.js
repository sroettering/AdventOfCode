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
            const updatedWorryLevel = Math.floor(this.operation(worryLevel) / 3);
            this.test(updatedWorryLevel, monkeys);
        }
    }
}

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

const rounds = 20

for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey) => monkey.act(monkeys));
}

const sortedMonkeys = monkeys.sort((mA, mB) => mB.inspections - mA.inspections);

console.log(sortedMonkeys[0].inspections * sortedMonkeys[1].inspections);
