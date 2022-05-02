"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAttack = void 0;
const rsa_1 = __importDefault(require("./rsa"));
const utils_1 = require("./utils");
/*
    If an adversary obtains the public key PU = {e, n},
    demonstrate how the adversary uses the exhaustive search to get the private key d
    and show the time cost of the search.
*/
const runAttack = (publicKey, ciphertext) => {
    console.log("START EXHAUSTIVE SEARCH");
    //Factorize the public key to obtain p and q
    const factors = (0, utils_1.getPrimeFactors)(publicKey.n);
    console.log("Prime factors of the public key's n: ", factors);
    let compromisedMessage;
    //If array length == 2 then we have found q and p
    if (factors.length === 2) {
        const guessed_p = factors[0];
        const guessed_q = factors[1];
        const rsa = new rsa_1.default(guessed_p, guessed_q);
        const guessed_private_key = rsa.privateKey;
        compromisedMessage = rsa.decrypt(ciphertext, guessed_private_key);
        console.log("Decrypted compromised message: ", compromisedMessage);
        console.log("END EXHAUSTIVE SEARCH");
    }
    return compromisedMessage;
};
exports.runAttack = runAttack;
//# sourceMappingURL=attack.js.map