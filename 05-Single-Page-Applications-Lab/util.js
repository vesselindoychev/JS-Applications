export function sum (a, b) {
    verifyNumber(a);
    verifyNumber(b);
    return a + b;
}

export function product(a, b) {
    verifyNumber(a);
    verifyNumber(b);
    return a * b;
}

function printData() {
    console.log(data);
}

function verifyNumber(arg) {
    if (typeof arg != 'number') {
        throw new Error('Argument must be a number!')
    }
}

const data = [10, 20, 30];

export {
    data,
    printData
}