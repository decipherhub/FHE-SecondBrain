## CTR(Counter)

Like OFB, CTR mode makes a block cipher function as a stream cipher.

It uses an incrementing counter value for each block, encrypts it, and then XORs the result with the plaintext to generate the ciphertext.

CTR mode supports parallel processing and does not require padding, making it highly efficient.

Since each block is processed independently, any corruption or modification of a ciphertext block does not affect other blocks.

<br>

### CTR mode Encrytion
![[block_cipher_CTR_Enc.png]]

$C_i = P_i \oplus E_K(\text{Nonce} \parallel \text{Counter}_i)$

$\text{Counter}_{i+1} = \text{Counter}_i + 1$

<br>

### CTR mode Decrytion
![[block_cipher_CTR_Dec.png]]

$P_i = C_i \oplus E_K(\text{Nonce} \parallel \text{Counter}_i)$

$\text{Counter}_{i+1} = \text{Counter}_i + 1$

<br>

**Definitions**

- $P_i$: Plaintext block $i$
- $C_i$: Ciphertext block $i$
- $E_K$: Encryption function with key $K$
