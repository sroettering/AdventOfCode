import assert from 'node:assert';
import { lcm } from '../../helpers/math.js';
import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-20-2.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

class Network {

    nodes = {};
    inputs = {};
    outputs = {};
    pulseQueue = [];
    targets = [];
    btnPresses = 0;

    pushButton() {
        this.btnPresses++;
        this.queuePulse('button', 'broadcaster', false);
        while(this.pulseQueue.length) {
            this.handlePulse(this.pulseQueue.shift());
        }
    }

    queuePulse(from, to, isHigh) {
        this.pulseQueue.push({ from, to, isHigh });
    }

    handlePulse({ from, to, isHigh }) {
        // console.log(`${from} -${isHigh ? 'high' : 'low'}-> ${to}`);

        if (isHigh) {
            const target = this.targets.find(({ name }) => name === from);
            if (target && !target.seen) {
                target.btnPresses = this.btnPresses;
                target.seen = true;
            }
        }

        const targetNode = this.nodes[to];

        if (!targetNode) {
            return;
        }

        if(targetNode.type === '%') {
            if (!isHigh) {
                targetNode.latestPulse = !targetNode.latestPulse;
                this.outputs[to].forEach(output => this.queuePulse(to, output, targetNode.latestPulse));
            }
        } else if (targetNode.type === '&') {
            const latestPulses = this.inputs[to].map(input => this.nodes[input]).map(node => node.latestPulse);
            const pulse = !Object.values(latestPulses).every(isHigh => isHigh);
            targetNode.latestPulse = pulse;
            this.outputs[to].forEach(output => this.queuePulse(to, output, pulse));
        } else { // broadcaster
            targetNode.latestPulse = isHigh;
            this.outputs[to].forEach(output => this.queuePulse(to, output, isHigh));
        }
    }

    addNode(name, type, outputs) {
        this.nodes[name] = { type, latestPulse: false };
        outputs.forEach(output => {
            this.inputs[output] ??= [];
            this.inputs[output].push(name);
        });
        this.outputs[name] = outputs;
    }
}

const parseInput = (lines) => {
    const network = new Network();

    lines.forEach((line) => {
        const [name, ...outputs] = line.split(/->|,/g);
        const type = name.substring(0, 1);
        network.addNode(
            name.replace(/[%&]/, '').trim(),
            type,
            outputs.map(o => o.trim())
        );
    });

    return network;
};

const network = parseInput(inputLines);

const targetNode = 'rx';
const nodesBeforeTarget = network.inputs[targetNode];
assert(nodesBeforeTarget.length === 1);
assert(network.nodes[nodesBeforeTarget[0]].type === '&'); // single conjunction before rx
assert(network.inputs[nodesBeforeTarget[0]].length > 1); // last conjunction has more than one input that has to send a high pulse

// Idea:
// All input nodes feeding into the last conjunction have to send a high pulse for conjunction to send a low pulse to rx.
// Assuming the inputs emit a high pulse in a regular interval, calculating the lcm of the interval lengths should give the correct answer

network.targets = network.inputs[nodesBeforeTarget[0]].map((input) => ({
    name: input,
    seen: false,
    btnPresses: 0,
}));

while (network.targets.some((target) => !target.seen)) {
    network.pushButton();
}

console.log(lcm(...network.targets.map(({ btnPresses }) => btnPresses)));
