import { readInput } from '../../helpers/read-input.js';

const inputLines = readInput(new URL('day-20-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

class Network {

    nodes = {};
    inputs = {};
    outputs = {};
    highPulses = 0;
    lowPulses = 0;
    pulseQueue = [];

    pushButton() {
        this.queuePulse('button', 'broadcaster', false);
        while(this.pulseQueue.length) {
            this.handlePulse(this.pulseQueue.shift());
        }
    }

    queuePulse(from, to, isHigh) {
        this.pulseQueue.push({ from, to, isHigh });
    }

    handlePulse({ from, to, isHigh }) {
        if (isHigh) {
            this.highPulses++;
        } else {
            this.lowPulses++;
        }

        // console.log(`${from} -${isHigh ? 'high' : 'low'}-> ${to}`);

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

for (let btn = 0; btn < 1000; btn++) {
    network.pushButton();
}

console.log(network.lowPulses * network.highPulses);
