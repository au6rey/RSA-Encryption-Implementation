"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimeFactors = exports.euclidGCD = exports.gcd = exports.stringToAlphabetNumbers = exports.findPrimeNumbersInRange = void 0;
const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0)
            return false;
    }
    return num > 1;
};
const findPrimeNumbersInRange = (start, end, positions) => {
    let count = 1;
    let result = [];
    for (let i = start; i <= end; i++) {
        if (result.length >= positions.size) {
            break;
        }
        if (isPrime(i)) {
            if (positions.has(count)) {
                result.push(i);
            }
            count += 1;
        }
    }
    return result;
};
exports.findPrimeNumbersInRange = findPrimeNumbersInRange;
const stringToAsciiArray = (str) => {
    const arr = [];
    for (const c of str.toUpperCase()) {
        arr.push(c.charCodeAt(0));
    }
    return arr;
};
const offsetAsciiTo26Letters = (asciiArr) => asciiArr.map((a) => a - 64);
const stringToAlphabetNumbers = (str) => {
    const asciiArr = stringToAsciiArray(str);
    const alphabetArr = offsetAsciiTo26Letters(asciiArr);
    const msgNum = BigInt(alphabetArr.toString().split(",").join(""));
    return String(msgNum);
};
exports.stringToAlphabetNumbers = stringToAlphabetNumbers;
const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : (0, exports.gcd)(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};
exports.gcd = gcd;
function euclidGCD(a, b) {
    a = +a;
    b = +b;
    if (a !== a || b !== b) {
        return { value: NaN, x: NaN, y: NaN };
    }
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return { value: Infinity, x: Infinity, y: Infinity };
    }
    if (a % 1 !== 0 || b % 1 !== 0) {
        return null;
    }
    let signX = a < 0 ? -1 : 1, signY = b < 0 ? -1 : 1, x = 0, y = 1, u = 1, v = 0, q, r, m, n;
    a = Math.abs(a);
    b = Math.abs(b);
    while (a !== 0) {
        q = Math.floor(b / a);
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return { value: b, x: signX * x, y: signY * y };
}
exports.euclidGCD = euclidGCD;
const getPrimeFactors = (n) => {
    const factors = [];
    let divisor = 2n;
    while (n >= 2n) {
        if (n % divisor === 0n) {
            factors.push(divisor);
            n = n / divisor;
        }
        else {
            divisor++;
        }
    }
    return factors;
};
exports.getPrimeFactors = getPrimeFactors;
//# sourceMappingURL=utils.js.map