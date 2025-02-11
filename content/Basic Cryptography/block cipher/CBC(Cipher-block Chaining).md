## CBC(Cipher-block Chaining)

In CBC mode, each plaintext block is XORed with the previous ciphertext block before being encrypted.

As a result, each ciphertext block depends on all the plaintext blocks processed up to that point.

If the previous block is not encrypted, the next block cannot be encrypted, so encryption must be performed sequentially, making parallel processing impossible. Similarly, decryption cannot be performed in parallel.

By setting the IV (Initialization Vector) randomly, even if the same plaintext or key is used, different ciphertexts can be generated.

<br>

### CBC mode Encrytion
![[block_cipher_CBC_Enc.png]]


$C_i = E_K(P_i \oplus C_{i-1})$

$C_0 = IV$


<br>

### CBC mode Decrytion
![[block_cipher_CBC_Dec.png]]


$P_i = D_K(C_i) \oplus C_{i-1}$

$C_0 = IV$

<br>

**Definitions**

- $P_i$: Plaintext block $i$
- $C_i$: Ciphertext block $i$
- $E_K$: Encryption function with key $K$
- $D_K$: Decryption function with key $K$
- $IV$: Initialization Vector