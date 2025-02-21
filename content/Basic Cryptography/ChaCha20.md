## Intro
ChaCha20 is a stream cipher developed by Daniel J. Bernstein. It is an improved version of Salsa20, which he previously designed, offering enhanced security and performance. ChaCha20 is widely used as a symmetric key cipher that balances speed and security, making it suitable for various protocols and applications, including TLS, SSH, VPN, and DNS encryption.

Unlike block ciphers such as [[AES]], ChaCha20 is a stream cipher that performs nonlinear transformations at the bit level. This characteristic allows it to operate efficiently in software without requiring hardware acceleration.

> [!Question] What is a Stream Cipher?
> A stream cipher is a symmetric key encryption method that encrypts data in a continuous stream of bits or bytes. It generates a keystream of the same length as the plaintext and encrypts data by performing an XOR operation with the plaintext. This approach enables fast and efficient encryption, making stream ciphers well-suited for real-time communication and wireless security, where low latency and high speed are essential. However, if the keystream is repeated, security vulnerabilities can arise, making the use of a unique nonce critical.
>
> For more details, refer to [[Stream cipher]].



## Characteristics of ChaCha20
ChaCha20 has the following characteristics:
1. **Stream Cipher**  
    Unlike block ciphers, which encrypt data in fixed-size blocks, ChaCha20 generates a key stream and encrypts plaintext by performing an XOR operation with it.
    
2. **High Speed and Simple Operations**  
    ChaCha20 utilizes Add, Rotate, and XOR (ARX) operations, making its computations simple and allowing it to operate with high efficiency.
    
3. **Enhanced Security with Nonce-Based Encryption**  
    Even when using the same encryption key, different nonces produce distinct key streams, enhancing security and preventing key stream reuse attacks.



## Design
The basic structure of ChaCha20 is as follows:

- **State size**: 512 bits, consisting of 16 32-bit words
- **Key size**: 256 bits
- **Nonce size**: 96 bits
- **Counter**: 32 bits

### Initial State Setup
ChaCha20 represents its 512-bit state as a **4×4 matrix of 16 32-bit words**. The state consists of:

- Four **32-bit constants**
- A **256-bit key** (eight 32-bit words)
- A **32-bit counter**
- A **96-bit nonce** (three 32-bit words)

During initialization, the state is set up using predefined constants and the given key, counter, and nonce.

### Quarter Round Function
The Quarter Round (QR) function is used to perform ARX (Add-Rotate-XOR) operations. This function is applied repeatedly over 20 rounds—hence the name ChaCha'20', which signifies the 20-round transformation process.
The 20 rounds are divided into Column Rounds and Diagonal Rounds.
1. **Column Rounds**
	During Column Rounds, each column in the 4×4 matrix undergoes the Quarter Round transformation.
	Given the 4×4 matrix representation of the ChaCha20 state:
	``` 
	0 1 2 3
	4 5 6 7
	8 9 10 11
	12 13 14 15
	```
	The Quarter Round is applied to the following **column-wise** groups:

	- **(0, 4, 8, 12)**
	- **(1, 5, 9, 13)**
	- **(2, 6, 10, 14)**
	- **(3, 7, 11, 15)**
2. **Diagonal Rounds**
	Diagonal Rounds apply the Quarter Round transformation to elements grouped diagonally in the 4×4 state matrix.

	Using the same matrix structure:
	``` 
	0 1 2 3
	4 5 6 7
	8 9 10 11
	12 13 14 15
	```
	The Quarter Round is applied to the following **diagonal-wise** groups:

	- **(0, 5, 10, 15)**
	- **(1, 6, 11, 12)**
	- **(2, 7, 8, 13)**
	- **(3, 4, 9, 14)**

In total, 20 rounds of Quarter Round transformations are performed, alternating between Column Rounds and Diagonal Rounds, ten times each, to generate the final key stream.

The ARX operation follows a sequence of modular addition, bitwise XOR, and bitwise rotation:

```
a += b; d ^= a; d <<<= 16;
c += d; b ^= c; b <<<= 12;
a += b; d ^= a; d <<<= 8;
c += d; b ^= c; b <<<= 7;
```
Each Quarter Round operates on four words from the state matrix. For example, in the first column-wise combination (0, 4, 8, 12):

- **0 → `a`**
- **4 → `b`**
- **8 → `c`**
- **12 → `d`**
#### Operation Breakdown
- `+=` represents **32-bit modular addition** (`mod 2³²`).
- `⊕=` represents **bitwise XOR**.
- `<<<=` denotes **left rotation** by the specified number of bits.
Through these transformations, each Quarter Round substantially changes the state, ensuring strong diffusion and security.



## ChaCha20 vs. AES
For more details on AES, refer to [[AES]].

Both AES and ChaCha20 are cryptographic algorithms that offer **high security**, but each has its unique advantages.
### Performance Considerations
AES benefits from hardware acceleration, such as AES-NI (AES New Instructions) in modern processors, making it significantly faster in environments where such optimizations are available. However, in software-only implementations, ChaCha20 generally outperforms AES in terms of speed and efficiency, especially on processors lacking dedicated cryptographic hardware.

### Security and Side-Channel Resistance
AES is known to be secure when properly implemented, and it has been validated for encrypting classified documents by the U.S. government. However, some implementations of AES are vulnerable to side-channel attacks, such as cache-timing attacks and power analysis. While these attacks require sophisticated conditions to be successful, they pose a potential risk if AES is not carefully implemented.

ChaCha20, in contrast, is designed to be naturally resistant to side-channel attacks, making it a preferred choice in environments where side-channel resistance is critical. Like AES, ChaCha20 is considered to be cryptographically secure and widely trusted.


## ChaCha20-Poly1305
ChaCha20-Poly1305 is an AEAD (Authenticated Encryption with Associated Data) scheme that combines the ChaCha20 cipher with the Poly1305 message authentication code (MAC). This encryption method provides confidentiality, integrity, and authentication simultaneously and is widely used across various protocols.

ChaCha20-Poly1305 is known to perform faster than AES-GCM in software-based environments, making it a preferred choice in systems without hardware acceleration.
> [!Question] Why is ChaCha20-Poly1305 needed?
> Encryption alone, as in ChaCha20, does not detect message tampering. To address this, a separate Message Authentication Code (MAC) is required.  
> However, if authentication is performed separately after encryption, an attacker may attempt to bypass the MAC verification or manipulate ciphertext integrity.  
> AEAD (Authenticated Encryption with Associated Data) prevents such attacks by integrating authentication with encryption. ChaCha20-Poly1305 is one of the most well-known AEAD encryption schemes.

### Poly1305
Poly1305 is an algorithm designed by Daniel J. Bernstein in 2005, the same cryptographer who developed ChaCha20.

It serves as a Message Authentication Code (MAC) that verifies the integrity of a message by generating a cryptographic tag.  
Poly1305 uses a 128-bit one-time key to prevent message forgery while providing a fast and efficient authentication mechanism.



## XChaCha20

XChaCha20 is an extended version of ChaCha20, a stream cipher that increases the nonce size from 96 bits to 192 bits. While the fundamental encryption mechanism remains identical to that of ChaCha20, the use of a longer nonce enhances security. This design prevents nonce reuse attacks and provides a safer environment for randomly generated nonces.

In the ChaCha20 encryption algorithm, avoiding nonce reuse is a crucial security requirement. However, in practical applications, a 96-bit nonce carries a risk of collision, leading to the following potential issues:
3. Risk of collisions when using random nonces  
	Although the probability of a collision when generating a 96-bit nonce randomly is extremely low, it is not entirely negligible. If a nonce is reused in ChaCha20, it can potentially lead to the direct leakage of the encryption key.
4. Difficulties in using long-term keys  
	When the same encryption key is used for an extended period, the risk of nonce duplication increases. Ensuring security when encrypting large volumes of data requires strict nonce management.

To address these concerns, XChaCha20 employs a 192-bit nonce, effectively eliminating the risk of collisions.



## Use cases
### TLS (Transport Layer Security)
* Google Chrome

### VPN (Virtual Private Network)
* WireGuard VPN

### Disk & Storage Encryption
* Google Adiantum