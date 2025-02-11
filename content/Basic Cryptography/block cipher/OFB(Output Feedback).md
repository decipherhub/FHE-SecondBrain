## OFB(Output Feedback)

OFB mode makes a block cipher operate like a synchronous stream cipher.

Unlike CBC or CFB, it performs encryption using only the encrypted feedback values, independent of the previous ciphertext or plaintext.

Both encryption and decryption can be processed in parallel.

<br>

### OFB mode Encrytion
![[block_cipher_OFB_Enc.png]]

$C_i = P_i \oplus E_K(I_i)$

$I_i = E_K(I_{i-1})$

$I_0 = IV$

<br>

### OFB mode Decrytion
![[block_cipher_OFB_Dec.png]]

$P_i = C_i \oplus E_K(I_i)$

$I_i = E_K(I_{i-1})$

$I_0 = IV$

<br>

**Definitions**

- $P_i$: Plaintext block $i$
- $C_i$: Ciphertext block $i$
- $E_K$: Encryption function with key $K$
- $I_i$: Input block $i$
- $IV$: Initialization Vector
