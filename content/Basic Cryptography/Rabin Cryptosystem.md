
## Intro
Rabin cryptosystem is a **public-key cryptosystem** proposed by Michael O. Rabin in 1979.  
It achieves security based on the hardness of integer factorization of large numbers and features a core mechanism where, given a plaintext mmm, the encryption operation is performed in the form $m^2 \bmod n$.



## Historical Background
### Emergence of Public-Key Cryptography and Subsequent Developments
> [!Question] What is public-key cryptography?
> **Public-key cryptography** is a branch of cryptography in which the sender and the receiver use different keys for encryption and decryption. Unlike traditional symmetric-key cryptography, public-key cryptography employs a “public key” that is disclosed to everyone and a “private key” known only to its owner. While anyone can use the public key to encrypt a message, only the holder of the private key can decrypt it, significantly reducing the burden of securely exchanging keys in advance.
> 
> For more details, see [[Asymmetric key encryption]].

- In 1976, Diffie and Hellman first introduced the concept of “public-key cryptography” to the world.
- In 1978, Rivest, Shamir, and Adleman proposed **RSA**, which quickly gained prominence.
- Shortly thereafter, in 1979, **Michael O. Rabin** introduced the **Rabin cryptosystem**, which, while similar to RSA, incorporates a distinct mathematical structure.



## Mathematical Background
### Difficulty of Factoring Large Integers
As with most public-key cryptosystems, the Rabin cryptosystem also relies on the hardness of factoring a large integer $n$.
* During key generation, two large primes $p$ and $q$ are selected, and then $n= is computed.
* Because it is believed to be very difficult to find $p$ and $q$ given only $n$, this serves as the basis for security.
$p$ and $q$
### Modular Squaring and Modular Square Roots
* In the Rabin cryptosystem, the ciphertext is formed as $c = m^2 \mod n$.
* Decryption then involves solving the equation $\sqrt{c} \mod n$.
* Although finding $\sqrt{c} \mod n$ without knowing the factorization of $n$ is hard, the private key holder (who knows $p$ and $q$) can compute it efficiently using the Chinese Remainder Theorem (CRT).

### Chinese Remainder Theorem (CRT)
* During decryption, given $p$ and $q$,  compute $c_p = c \mod p$ and $c_q = c \mod q$, and then find $\sqrt{c_p} \mod p$ and $\sqrt{c_q} \mod q$.
* Finally, use the CRT to combine these results and recover the decrypted plaintext $m$.



## Rabin Algorithm
Unlike the RSA cryptosystem, which typically selects a public exponent $1<e<φ(n)$ for encryption, the Rabin cryptosystem fixes the public exponent at $e=2$. As a result, its encryption process can be faster than RSA due to the smaller exponent.

### Key Generation
1. Choose two distinct primes $p$ and $q$ of the form $4k + 3$ ,for some integer $k \in \mathbb{Z}$.
2. Compute $n=p×q$.
3. The private key is $(p, q)$, and the public key is $n$.

In summary, the key elements in the Rabin cryptosystem are:
* Public Key: $n$
* Private Key: $(p, q)$

### Encryption
1. Given a plaintext $m \in \mathbb{Z_n}$ and the public key $n$.
2. Compute the ciphertext:
	$$
	c≡m^2(\mod n)
	$$

### Decryption
1. Using the private key $(p, q)$, compute:
	$$
	c_p=c\mod p
	$$
	$$
	c_q=c\mod q
	$$
2. Solve the corresponding quadratic congruences for $c_p$ and $c_q$:
	$$
	a_1​≡c_p^{{p+1}/4}​​\mod p
	$$
	$$
	a_2≡-c_p^{{p+1}/4}​​\mod p
	$$
	$$
	b_1≡c_q^{{q+1}/4}​​\mod q
	$$
	$$
	b_2≡-c_q^{{q+1}/4}​​\mod q
	$$
3. Use the Chinese Remainder Theorem (CRT) to combine these results:
	$$
	m_1=CRT(a_1, b_1, p, q)
	$$
	$$
	m_2=CRT(a_1, b_2, p, q)
	$$
	$$
	m_3=CRT(a_2, b_1, p, q)
	$$
	$$
	m_4=CRT(a_2, b_2, p, q)
	$$
4. One of the values among $m_1, m_2, m_3, m_4$ is the actual plaintext.



## Comparison of Rabin Cryptosystem and RSA
The Rabin cryptosystem appears structurally similar to RSA—indeed, one might view Rabin as a special case of RSA where the public exponent is $e=2$. However, because 2 is not coprime to $φ(n)$, the Rabin cryptosystem is not formally a subset of RSA.

While the security of Rabin is equivalent to the integer factorization problem, RSA's security has only been shown to be no harder than factorization (i.e., it is not proven to be exactly equivalent).

Moreover, unlike RSA—which produces a unique output during decryption—the Rabin cryptosystem can yield up to four possible plaintext candidates. Thus, an additional step is required to identify the correct plaintext among those four candidates.

Another key difference lies in the vulnerability to chosen-ciphertext attacks. Under such an attack, it is theoretically possible for an adversary to recover the entire private key in Rabin. In contrast, for textbook RSA, while an attacker can learn a given plaintext, no known attack fully recovers the private key.

In conclusion, although Rabin has a clean theoretical underpinning that attracts academic interest, it has seen comparatively less adoption in industry and standardization than RSA. The practical limitations—chiefly the need to handle multiple decryption outputs and the associated complexity of secure padding—mean it is not widely deployed in production environments.