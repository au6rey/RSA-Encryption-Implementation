import { runAttack } from "./attack";
import RSA from "./rsa";
import { findPrimeNumbersInRange, stringToAlphabetNumbers } from "./utils";

//Message to encrypt
const messageString = "rsa";
const messageNum = BigInt(stringToAlphabetNumbers(messageString));

//Generate random prime numbers to use for key generation
const pAndQ = findPrimeNumbersInRange(1000, 10000, new Set([10, 19]));
const p = BigInt(pAndQ[0]);
const q = BigInt(pAndQ[1]);

//RSA set up
const rsa = new RSA(p, q);
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
const guessedMessage = runAttack(publicKey, ciphertext);
const timeAfterAttack = Date.now();

if (messageNum === guessedMessage) {
  console.log("Attack was successful.");
  console.log(
    "Total time taken to guess private key in milliseconds: ",
    timeAfterAttack - timeBeforeAttack
  );
}else{
    console.log("Attack failed.")
}

