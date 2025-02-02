## Intro
A block cipher is an encryption algorithm used in symmetric key encryption that encrypts plaintext in fixed-size blocks. The block size depends on the algorithm, but the length of the plaintext can be variable because block ciphers utilize modes of operation, which will be explained below. A block cipher can also be abstracted as a [[Pseudo-random Function]] where the message space is n bits and the key space is k bits.

![[block_cipher(1).png]]

## Design
![[block_cipher(2).png]]
The basic flow of block cipher encryption is as follows:

1. Expand the key into $r$ round keys via key expansion.
2. Apply each round key sequentially using the round function.
3. Output the ciphertext $c$.

The implementation of the round function and key expansion depends on the specific algorithm. Typically, in the round function, building blocks such as substitution, transposition, shift, and swap are used to satisfy [[Confusion and Diffusion]].

## Mode of Operation
If the length of the plaintext to be encrypted is longer than the block size, a mode of operation can be used. The mode of operation defines the methods to securely use a single key multiple times. There are two types of modes of operation:

| Confidentiality only                                                                                                           | Authenticated Encryption with Additional Data(AEAD)                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - [[ECB(Electric Codebook)]]<br>- [[CBC(Cipher-block Chaining)]]<br>- [[CFB(Cipher Feedback)]]<br>- [[OFB(Output Feedback)]]<br>- [[CTR(Counter)]] | - GCM(Galois counter)<br>- CCM(Counter with cipher block chaining message authentication code)<br>- SIV(Synthetic initialization vector)<br>- AES-GCM-SIV |

## Comparison with [[Stream cipher]]
|                  | [[Stream Cipher]]                     | Block Cipher                                          |
| ---------------- | ------------------------------------- | ----------------------------------------------------- |
| Processing Unit  | Bit/Byte                              | Block of data                                         |
| Key type         | Generated for each bit/byte           | Single key used for multiple rounds                   |
| Implementation   | Simpler, often used in hardware       | More complex, often used in software                  |
| Use Case         | Real-time applications, low latency   | File encryption, data at rest                         |
| Speed            | Typically faster                      | Typically slower                                      |
| Padding Required | Not required                          | Required if data does not fit block size              |
| Security         | Key reuse can lead to vulnerabilities | More secure with proper padding and mode of operation |
| Example          | RC4, Salsa20, ChaCha20                | AES, DES, Blowfish                                    |

