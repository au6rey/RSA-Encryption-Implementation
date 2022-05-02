**RSA Encryption with Exhaustive Search for Private Key POC**

**Running Instructions**

 1. Install the latest version of Node from [here.](https://nodejs.dev/download/).
 2. Clone this repo.
 3. Run `cd RSA-Encryption-Implementation`
 4. Run `npm install`.
 5. Run `npm start`

**SCREENSHOT**

**![](https://github.com/au6rey/RSA-Encryption-Implementation/blob/main/screenshot/result.png?raw=true)**


**DESIGN**

The `src` folder contains the following files:

**models.ts**

Has data type definitions for representing the public and private keys.

**utils.ts**

Has helper methods/functions to be used by the RSA implementations.

**Functions:**

 **1. isPrime**
 
Returns true if a number is prime.

 **2. findPrimeNumbersInRange**
 
Find prime numbers at the chosen positions in the given range.
Example: `findPrimeNumbersInRange(1000, 10000, new Set([10, 19]))` gets the 10th and 19th prime numbers between 1000 and 10000. The result is an array of the requested numbers ie `[1061, 1129]` in this case.

 **3. stringToAlphabetNumbers**
 
Converts strings to numbers corresponding to their position from 0 to 25 letters of the alphabet.
Example: `stringToAlphabetNumbers("rsa")` returns `17180`

 **4. gcd**

Calculates the greatest common divisor of given input integers.

 **5. euclidGCD**
 
Implements Euclid's algorithm that computes, besides the greatest common divisor of integers a and b, the coefficients of Bézout's identity, that is, integers `x` and `y` such that;
	
	ax + by = gcd(a, b)
	
Returns a linear combination as an object containing x, y, and value such that;
	
	value: the value of ax + by ie the GCD.
	x: the coefficient x in ax + by
	y: the coefficient y in ax + by
	x > y always
	
In this case, `x` will always be the coefficient for the smaller integer and `y` will always be the coefficient for the bigger integer.
Example: `euclidGCD(7, 9)` returns `{value: 1, x: 4, y: -3}`

 **6. getPrimeFactors**
 
Breaks down a number into the set of prime numbers which multiply together to result in the original number.
Returns an array of the prime factors. 
Example; 9 = 3*3, `getPrimeFactors(9) = [3,3]`

 **7. rsa.ts**
 
Has a class that implements the RSA encryption algorithm.

**Class Variables**

 - **p**: A distinct random prime number.
 - **q**: Another distinct random prime number.
 - **n**:  The product of `p` and `q`.
 - **phi**: The `𝜑(n)`, given by the `getPhi` method.
 - **e**: the encryption exponent returned by the `computeEncryptionExponent`
   method.
 - **d**: The encryption exponent returned by the `computeDecryptionExponent`
   method. 
 - **publicKey**: A public key defined by the data type in **model.ts**    such
   that public key `PU = {e, n}`. It is returned by the method   
   `getPublicKey`.
 - **privateKey**: A private key defined by the data type in model.ts such
   that; public key `PR = {d, p, q}`. It is returned by the method
   `getPrivateKey`.

**Methods:**

 **1. constructor**
 
Initializes the object instance of the class, p and q should be provided as input parameters.

 **2. getPhi**
 
Takes in `p` and `q` and computes `𝜑(n) = (p − 1 )*( q − 1 )`;

 **3. getN**
 
Returns `n` as `p * q`.

 **4. computeEncryptionExponent**
 
Calculates the encryption exponent, such that; 

	1 < e < 𝜑(n) where 𝜑(n) is stored in the variable phi.
	e is relatively prime to 𝜑(n), ie gcd(e, 𝜑(n)) = 1
A random prime number `randE` is chosen as a candidate for exponent first. If the candidate `randE` is divisible by `𝜑(n)`, that is, `gcd(randE, 𝜑(n)) != 1`, it is incremented until it is no longer divisible by `𝜑(n)`.
`46819` was used as `randE` in this implementation.
Returns the encryption exponent stored as the class variable `e`.

 **5. computeDecryptionExponent**
 
Computes the decryption exponent `d`, the multiplicative inverse of `e modulo 𝜑(n)`. 

	d = (1 + k * 𝜑(n) ) / e  OR 
	e * d ( mod 𝜑(n)  ) = 1
`eucleadGCD(s, t)`, described above, returns a linear combination as an object in the form `{value, x, y}`.
The x obtained is used as a candidate for `d`, the coefficient of e in the linear combination of e and `𝜑(n)` that expresses the `eucleadGCD(e, 𝜑(n))`.
`d` should always be positive. If a negative value for candidate `d` is obtained, the candidate `d` is added to `𝜑(n)` until it is positive.

 **6. encrypt**
 
Takes in an integer as the plain message and a public key and enciphers the message using the function: 

	C = M^e mod n
	where; 
	C = the ciphertext.
	M = the input message.
	e and n are obtained from the public key.
	Returns C as the encrypted message.

 **7. decrypt**
 
Takes in an integer as the ciphertext and a private key and enciphers the message using the function: 

	M = C^d mod n
	where; 
	C = the ciphertext.
	M = the input message.
	n =  p * q
	d, p, and q are obtained from the private key
Returns `M` as the encrypted message.

 **8. getPublicKey**
 
Returns an object representation of the public key.

 **9. getPrivateKey**
 
Returns an object representation of the private key.

**attack.ts**

Has the runAttack function that performs an exhaustive search to get the private key.

**Methods:**

 **1. runAttack**
 
Takes in a public key and the encrypted message as input parameters.
The private key can be calculated if the `p` and `q` are obtained from the public key’s `n` value.
Since `n = p * q`, the length of the array obtained when `getPrimeFactors(n)` is run should be equal to 2, if not, then the attack has failed, or `n` is not valid.
Any of the two numbers obtained from the array returned by `getPrimeFactors(n)` can be used as `p` and `q`.
The guessed `p` and `q` are then used to obtain the private key and used to decipher the ciphertext.
The guessed message obtained is then returned for comparison later.

**index.ts**

This is the entry file used for testing and logging the problem.
