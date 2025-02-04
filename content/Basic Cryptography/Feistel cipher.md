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

먼저 암호화 과정을 살펴보겠다.
암호화 과정에서 입력으로 들어오는 평문  $p = (L_0 \parallel R_0)$는 $L_0$와 $R_0$로 나뉘어진다.
함수 $F$는 키 $k$와 $R_0$을 입력으로 받는다.
$L_0$은 위에서 언급한 함수 $F(k, R_0)$와 XOR되어 암호문의 왼쪽 절반인 $L_1$이 된다. $R_0$는 그대로 암호문의 오른쪽 절반인 $R_1$이 된다.

이러한 암호화 과정을 수식으로 나타내면 다음과 같다:

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
위의 그림은 라운드가 한 번이 아닌 페이스텔 구조를 나타낸 것이다.

1라운드 페이스텔 구조와는 다르게, 다중 라운드 페이스텔 구조의 암호화 과정에서는 첫 번째 라운드의 오른쪽 절반인 $R_0$가 그대로 $R_1$이 되는 것이 아니라 출력의 왼쪽 절반인 $L_1$이 된다. 또한, 1라운드 페이스텔 구조에서 XOR 연산이 이루어졌던 계산값이 $L_1$이 아닌 $R_1$이 된다. 즉, 1라운드 페이스텔 구조의 좌우 결과가 뒤바뀌는 것이다.
두 번째 라운드에서는 $L_1$이 암호화 과정을 거치기 때문에 결과적으로 평문 $L_0$과 $R_0$이 모두 암호화 과정을 거친다.
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

복호화 과정 또한 암호화 과정과 동일하여 입력되는 키의 순서만 역으로 바뀐다.
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
> 페이스텔 구조 2라운드는 비페이스텔 구조 1라운드와 같은 안전성을 갖는다. 따라서 상대적으로 더 많은 라운드 수가 필요하다.

