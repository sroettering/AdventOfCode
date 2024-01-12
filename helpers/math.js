export function hcf(...values) {
    const min = Math.min(...values);
    for (let i = min; i > 0; i--) {
        if (values.every((num) => num % i === 0)) {
            return i;
        }
    }
}

export function lcm(...values) {
    const product = values.reduce((prod, num) => prod * num, 1);
    return product / hcf(...values);
}
