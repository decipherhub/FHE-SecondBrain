## Intro
The Feistel Cipher is a cryptographic structure that divides the input into left and right blocks, repeatedly applying a round function to one block and combining its output with the other block.
Typically, all elements of an encryption process must be invertible, as decryption requires reversing the encryption steps to recover the plaintext. However, the Feistel Cipher uniquely employs both invertible and non-invertible components.

The primary reason the Feistel Cipher can utilize non-invertible elements lies in its design, which is based on the XOR operation.
> [!Question] The Invertibility of XOR
> Due to the "self-inverse" property of XOR, performing the same XOR operation during the decryption phase restores the original data.
> * Self-inverse property: A⊕B⊕B=A

As a result, the Feistel Cipher allows for more flexible designs compared to Non-Feistel Ciphers. Additionally, the use of non-invertible components simplifies management by making the encryption and decryption processes identical.

A well-known example of a Feistel Cipher is [[DES]] (Data Encryption Standard). In contrast, a prominent example of a Non-Feistel Cipher is [[AES]] (Advanced Encryption Standard).


## Design
### 1-Round Feistel Structure
![[Feistel_cipher(1).png]]

The left side represents the encryption process, while the right side shows the decryption process.

#### Encryption Process

In the encryption process, the plaintext input $p = (L_0 \parallel R_0)$ is divided into $L_0$​ and $R_0$​. A function $F$ takes the key $k$ and $R_0$​ as its input. Then, $L_0$​ is XORed with the output of $F(k, R_0)$, producing the left half of the ciphertext $L_1$. Meanwhile, $R_0$​ remains unchanged and becomes the right half of the ciphertext $R_1$​.

The encryption process can be represented mathematically as follows:
$$
L_1 = L_0 \oplus F(k, R_0)
$$
$$
R_1 = R_0
$$

#### Decryption Process

In the decryption process, the input ciphertext $c = (L'_0|R'_0) = (L_1|R_1)$ is divided into $L'_0$​ and $R'_0$.
$L'_0$ is XORed with $F(k, R'_0)$, resulting in the left half of the plaintext $L'_1$. Similarly, $R'_0$ remains unchanged and becomes the right half of the plaintext $R'_1$.

The decryption process can be represented mathematically as follows:
$$
L'_1 = L'_0 \oplus F(k, R'_0)
$$$$
R'_1 = R'_0
$$

#### Observations

As you may have noticed, the encryption and decryption processes are identical except for their inputs and outputs being reversed.

Encryption:
$$c = p \oplus (F(k, R_0) \parallel 0)$$
Decryption: 
$$c \oplus (F(k, R'_0) \parallel 0) \\ = p \oplus (F(k, R_0) \parallel 0) \oplus (F(k, R'_0) \parallel 0) \\ = p \oplus (F(k, R_0) \parallel 0) \oplus (F(k, R'_0) \parallel 0) \\ = p \oplus 0 = p$$
As mentioned in the [[#Intro]], the self-inverse property of the XOR operation ensures that $F(k, R'_0)$ is canceled out during decryption. This means the decryption process works correctly even without requiring the inverse function $F^{-1}$, allowing the use of non-invertible components in the Feistel Cipher.

#### Limitations of a 1-Round Feistel Structure

Analyzing the 1-round Feistel Cipher reveals a critical drawback: the right half of the plaintext, $R_0$, directly becomes the right half of the ciphertext, $R_1$, without undergoing any transformation. This exposes half of the plaintext in the ciphertext, significantly compromising security.

To address this issue, Feistel Cipher structures are designed with multiple rounds. In a multi-round Feistel Cipher, the left and right halves are swapped at the end of each round, effectively ensuring that all parts of the plaintext are processed. However, this design requires more rounds compared to Non-Feistel Ciphers to achieve the same level of security.

### 다중 라운드 페이스텔 구조
![[Feistel_cipher(2).png]]
The diagram above illustrates a Feistel structure with multiple rounds, as opposed to a single round.

#### Encryption Process

Unlike the single-round Feistel structure, in a multi-round Feistel Cipher, the right half of the plaintext ($R_0$) does not directly become the right half of the ciphertext ($R_1$). Instead, it becomes the left half of the output ($L_1$). Additionally, the XOR computation that previously resulted in $L_1$ in the single-round structure now determines $R_1$. In other words, the outputs of the left and right halves are swapped after each round.
In the second round, $L_1$ undergoes further encryption, ensuring that both $L_0$ and $R_0$ are processed through the encryption rounds.

The encryption process can be expressed as follows:
$$L_1 = R_0$$
$$
R_1 = L_0 \oplus F(k_1, R_0)
$$
$$
L_2 = L_1 \oplus F(k_2, R_1)
$$
$$
R_2 = R_1
$$

#### Decryption Process

The decryption process mirrors the encryption process, with the only difference being the reverse order of the keys used during the computation.
$$
L'_1 = R'_0 = R_2 = R_1
$$
$$
R'_1 = L'_0 \oplus F(k_2, R'_0) = L_2 \oplus F(k_2, R_1)
$$
$$
= L_1 \oplus F(k_2, R_1) \oplus F(k_2, R_1) = L_1 = R_0
$$
$$
L'_2 = L'_1 \oplus F(k_1, R'_1) = R_1 \oplus F(k_1, R_0)
$$
$$
= L_0 \oplus F(k_1, R_0) \oplus F(k_1, R_0) = L_0
$$
$$
R'_2 = R'_1 = R_0
$$

> [!Note] 
> A Feistel Cipher with two rounds provides the same level of security as a single round of a Non-Feistel Cipher. Therefore, Feistel Ciphers generally require a greater number of rounds to achieve comparable security.

