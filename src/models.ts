export type PublicKey = {
  e: bigint;
  n: bigint;
};

export type PrivateKey = {
  d: bigint;
  p: bigint;
  q: bigint;
};

export type LinearCombination = {
  value: number; // the value of ax + by
  x: number; // the coefficient x in ax + by
  y: number; // the coefficient y in ax + by
};
