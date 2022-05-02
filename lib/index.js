"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attack_1 = require("./attack");
const rsa_1 = __importDefault(require("./rsa"));
const utils_1 = require("./utils");
//Message to encrypt
const messageString = "rsa";
const messageNum = BigInt((0, utils_1.stringToAlphabetNumbers)(messageString));
//Generate random prime numbers to use for key generation
const pAndQ = (0, utils_1.findPrimeNumbersInRange)(1000, 10000, new Set([10, 19]));
const p = BigInt(pAndQ[0]);
const q = BigInt(pAndQ[1]);
//RSA set up
const rsa = new rsa_1.default(p, q);
const phi = rsa.phi;
const e = rsa.e;
const d = rsa.d;
const n = rsa.n;
const publicKey = rsa.publicKey;
const privateKey = rsa.privateKey;
//Encryption and decryption
const ciphertext = rsa.encrypt(messageNum, publicKey);
const deciphered = rsa.decrypt(ciphertext, privateKey);
console.log("Message Alphabet: ", messageString);
console.log("Message As Integer: ", messageNum);
console.log("q: ", q);
console.log("p: ", p);
console.log("n: ", n);
console.log("phi: ", phi);
console.log("d: ", d);
console.log("e: ", e);
console.log("Public Key: ", publicKey);
console.log("Private Key: ", privateKey);
console.log("Encrypted Message: ", ciphertext);
console.log("Decrypted Message: ", deciphered);
//Brute force guessing the private key
const timeBeforeAttack = Date.now();
const guessedMessage = (0, attack_1.runAttack)(publicKey, ciphertext);
const timeAfterAttack = Date.now();
if (messageNum === guessedMessage) {
    console.log("Attack was successful.");
    console.log("Total time taken to guess private key in milliseconds: ", timeAfterAttack - timeBeforeAttack);
}
else {
    console.log("Attack failed.");
}
//# sourceMappingURL=index.js.map