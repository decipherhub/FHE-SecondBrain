## CFB(Cipher Feedback)

CFB mode makes a block cipher operate like a synchronous stream cipher. Since it functions as a stream cipher, padding is not required even if the data size does not align perfectly with the block size.

Because each block uses the previous ciphertext, encryption in CFB mode cannot be processed in parallel, similar to CBC.

While similar to CBC, CFB uses XOR with the encrypted feedback value. Unlike CBC, decryption in CFB mode can be performed in parallel.

<br>

### CFB mode Encrytion
![[block_cipher_CFB_Enc.png]]

$C_i = \begin{cases} IV, & i = 0 \\ E_K(C_{i-1}) \oplus P_i, & \text{otherwise} \end{cases}$

<br>

### CBC mode Decrytion
![[block_cipher_CFB_Dec.png]]

$P_i = E_K(C_{i-1}) \oplus C_i$

<br>

**Definitions**

- $P_i$: Plaintext block $i$
- $C_i$: Ciphertext block $i$
- $E_K$: Encryption function with key $K$
- $IV$: Initialization Vector
