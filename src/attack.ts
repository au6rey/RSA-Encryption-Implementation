import { PublicKey } from "./models";
import RSA from "./rsa";
import { getPrimeFactors } from "./utils";

/*
    If an adversary obtains the public key PU = {e, n}, 
    demonstrate how the adversary uses the exhaustive search to get the private key d 
    and show the time cost of the search.
*/

export const runAttack = (
  publicKey: PublicKey,
  ciphertext: bigint
): bigint | undefined => {
  console.log("START EXHAUSTIVE SEARCH");
  //Factorize the public key to obtain p and q
  const factors = getPrimeFactors(publicKey.n);
  console.log("Prime factors of the public key's n: ", factors);
  let compromisedMessage;
  //If array length == 2 then we have found q and p
  if (factors.length === 2) {
    const guessed_p = factors[0];
    const guessed_q = factors[1];
    const rsa = new RSA(guessed_p, guessed_q);
    const guessed_private_key = rsa.privateKey;
    compromisedMessage = rsa.decrypt(ciphertext, guessed_private_key);
    console.log("Decrypted compromised message: ", compromisedMessage);
    console.log("END EXHAUSTIVE SEARCH");
  }
  return compromisedMessage;
};
