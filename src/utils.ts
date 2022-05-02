import { LinearCombination } from "./models";

const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

export const findPrimeNumbersInRange = (
  start: number,
  end: number,
  positions: Set<number>
): number[] => {
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

const stringToAsciiArray = (str: string): number[] => {
  const arr: number[] = [];
  for (const c of str.toUpperCase()) {
    arr.push(c.charCodeAt(0));
  }
  return arr;
};

const offsetAsciiTo26Letters = (asciiArr: number[]) =>
  asciiArr.map((a) => a - 64);

export const stringToAlphabetNumbers = (str: string) => {
  const asciiArr = stringToAsciiArray(str);
  const alphabetArr = offsetAsciiTo26Letters(asciiArr);
  const msgNum = BigInt(alphabetArr.toString().split(",").join(""));
  return String(msgNum);
};

export const gcd = (...arr: bigint[]): bigint => {
  const _gcd = (x: bigint, y: bigint) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

export function euclidGCD(a: number, b: number): LinearCombination | null {
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
  let signX = a < 0 ? -1 : 1,
    signY = b < 0 ? -1 : 1,
    x = 0,
    y = 1,
    u = 1,
    v = 0,
    q,
    r,
    m,
    n;
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

export const getPrimeFactors = (n: bigint): bigint[] => {
  const factors: bigint[] = [];
  let divisor = 2n;
  while (n >= 2n) {
    if (n % divisor === 0n) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};
