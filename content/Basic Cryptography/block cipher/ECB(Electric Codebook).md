## ECB(Electric Codebook)

ECB is a method that divides a message into multiple blocks and encrypts each block individually.

Since encryption and decryption operations are independent of each other, they can be processed in parallel.

However, because all blocks use the same encryption key, it is vulnerable to security risks.

<br>

### ECB mode Encrytion
![[block_cipher_ECB_Enc.png]]

- Divide the plaintext $P$ into fixed block sizes (e.g., 128 bits).
- Represent each block as $P_1, P_2, \dots, P_n$.
- Encryption: $C_i = E_K(P_i)$
- Combine all ciphertext blocks in order to generate the final ciphertext $C$.

<br>

### ECB mode Decrytion
![[block_cipher_ECB_Dec.png]]

- Divide the ciphertext $C$ into fixed block sizes.
- Represent each block as $C_1, C_2, \dots, C_n$.
- Decryption: $P_i = D_K(C_i)$
- Combine the decrypted plaintext blocks to generate the final plaintext $P$.


<br>

**Definitions**

- $E_K$: Encryption function with key $K$
- $D_K$: Decryption function with key $K$
