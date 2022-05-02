import { PrivateKey, PublicKey } from "./models";
import { euclidGCD, gcd } from "./utils";

export default class RSA {
  p: bigint;
  q: bigint;
  e: bigint;
  n: bigint;
  d: bigint;
  phi: bigint;
  publicKey: PublicKey;
  privateKey: PrivateKey;

  constructor(p: bigint, q: bigint) {
    this.p = p;
    this.q = q;
    this.phi = this.getPhi(p, q);
    this.e = this.computeEncryptionExponent(this.phi);
    this.d = this.computeDecryptionExponent(this.e, this.phi);
    this.n = this.getN(p, q);
    this.publicKey = this.getPublicKey();
    this.privateKey = this.getPrivateKey();
  }

  private getPublicKey = (): PublicKey => {
    return { e: this.e, n: this.n };
  };

  private getPrivateKey = (): PrivateKey => {
    return { p: this.p, q: this.q, d: this.d };
  };

  private getPhi = (p: bigint, q: bigint) => (p - 1n) * (q - 1n);

  private getN = (p: bigint, q: bigint) => p * q;

  private computeEncryptionExponent = (phi: bigint) => {
    let randE = 46819;
    while (gcd(BigInt(randE), phi) !== 1n) {
      randE += 1;
    }
    return BigInt(randE);
  };

  private computeDecryptionExponent = (e: bigint, phi: bigint): bigint => {
    let d = BigInt(euclidGCD(Number(e), Number(phi))!.x);
    while (d < 1) {
      d += phi;
    }
    return d;
  };

  encrypt(m: bigint, publicKey: PublicKey) {
    const { e, n } = publicKey;
    if (m < 0 || m >= n) {
      throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
    }
    if (gcd(m, n) !== 1n) {
      throw new Error("Condition gcd(m, n) = 1 not met.");
    }
    return m ** e % n;
  }

  decrypt = (c: bigint, secretKey: PrivateKey) => {
    const { d, p, q } = secretKey;
    return c ** d % (p * q);
  };
}
