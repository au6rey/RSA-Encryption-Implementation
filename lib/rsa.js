"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class RSA {
    p;
    q;
    e;
    n;
    d;
    phi;
    publicKey;
    privateKey;
    constructor(p, q) {
        this.p = p;
        this.q = q;
        this.phi = this.getPhi(p, q);
        this.e = this.computeEncryptionExponent(this.phi);
        this.d = this.computeDecryptionExponent(this.e, this.phi);
        this.n = this.getN(p, q);
        this.publicKey = this.getPublicKey();
        this.privateKey = this.getPrivateKey();
    }
    getPublicKey = () => {
        return { e: this.e, n: this.n };
    };
    getPrivateKey = () => {
        return { p: this.p, q: this.q, d: this.d };
    };
    getPhi = (p, q) => (p - 1n) * (q - 1n);
    getN = (p, q) => p * q;
    computeEncryptionExponent = (phi) => {
        let randE = 46819;
        while ((0, utils_1.gcd)(BigInt(randE), phi) !== 1n) {
            randE += 1;
        }
        return BigInt(randE);
    };
    computeDecryptionExponent = (e, phi) => {
        let d = BigInt((0, utils_1.euclidGCD)(Number(e), Number(phi)).x);
        while (d < 1) {
            d += phi;
        }
        return d;
    };
    encrypt(m, publicKey) {
        const { e, n } = publicKey;
        if (m < 0 || m >= n) {
            throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
        }
        if ((0, utils_1.gcd)(m, n) !== 1n) {
            throw new Error("Condition gcd(m, n) = 1 not met.");
        }
        return m ** e % n;
    }
    decrypt = (c, secretKey) => {
        const { d, p, q } = secretKey;
        return c ** d % (p * q);
    };
}
exports.default = RSA;
//# sourceMappingURL=rsa.js.map