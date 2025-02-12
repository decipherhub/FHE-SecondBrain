# SHA (Secure Hash Algorithm)

The **Secure Hash Algorithm (SHA)** is a family of cryptographic hash functions designed by the National Security Agency (NSA) and standardized by the National Institute of Standards and Technology (NIST). SHA functions take an input of arbitrary length and produce a fixed-length output called a **hash** (or **message digest**).

---

## 1. Overview

**Key security properties of SHA:**

1. **Preimage Resistance**  
   It is computationally infeasible, given a hash value, to find an original input message that produces this hash.
2. **Second Preimage Resistance**  
   It is computationally infeasible, given an input message, to find a different message with the same hash.
3. **Collision Resistance**  
   It is computationally infeasible to find two different messages that produce the same hash value.

The most widely used variants today include **SHA-256** and **SHA-512** (from the SHA-2 family), and **SHA-3**.

---

## 2. Hash Generation Process (Conceptual)

While SHA doesn’t involve keys (unlike [[RSA]]), the process of creating a hash from a message can be summarized as follows:

1. **Padding the Message**  
   - The original message is padded with a `1` bit, followed by enough `0` bits to reach a particular boundary.
   - This ensures the message length is congruent to a specified block size (e.g., 512 bits for SHA-256).

2. **Appending the Message Length**  
   - The 64-bit (for SHA-256) representation of the original message length is appended to the padded message.
   - This step helps prevent certain structural attacks and is essential for internal block processing.

3. **Initialization**  
   - SHA uses a set of **initial hash values** (also called initialization vectors).
   - For SHA-256, these are eight 32-bit words, denoted as `H0, H1, H2, ... H7`.

4. **Block Processing**  
   - The padded message is split into fixed-size blocks (512 bits for SHA-256).
   - A **compression function** processes each block using bitwise operations, modular arithmetic, and constants to update the hash state.

5. **Finalization**  
   - After processing all blocks, the final values of `H0, H1, ... H7` are concatenated to form the **digest**.
   - For SHA-256, this digest is **256 bits** (or 32 bytes).

6. **Output**  
   - The resulting fixed-size output is the **hash** (or **message digest**).

---

## 3. Usage in Verification

SHA doesn’t encrypt or decrypt but is used to verify **integrity**:

1. **Hash Creation (Sender)**  
   - The sender computes the hash of the message using SHA.
   - The resulting hash can be sent alongside the message or used in a digital signature scheme.

2. **Verification (Receiver)**  
   - The receiver calculates the hash of the received message.
   - If the computed hash matches the sender’s hash, it is highly likely the message was not altered.

---

## 4. Example with SHA-256

Let’s illustrate with a short message: `"HI"`.

1. **Message**: `"HI"`
   - ASCII values:  
     - `H` = `0x48`  
     - `I` = `0x49`
   - In hexadecimal, `"HI"` is `0x48 0x49`.

2. **Padding**  
   - SHA-256 operates on 512-bit blocks.
   - We append a `1` bit (`0x80`) and then enough `0` bits until the length is `448 mod 512`.
   - Finally, we append a 64-bit representation of the original message length (16 bits, since "HI" is 2 bytes).

3. **Block Processing**  
   - The message block is processed with the SHA-256 compression function.
   - This involves a series of bitwise operations, additions, and mixing with internal state variables.

4. **Hash Output**  
   - After processing, we get a 256-bit digest.  
   - For example (shown in shortened form):  
     ```
     SHA-256("HI") = d3755b0e86e2...c96b8ecdb
     ```
   - The full output would be 64 hexadecimal characters (32 bytes).

---

## 5. Summary

- **SHA** is a **one-way hash function** used for data integrity and message authentication.  
- **[[RSA]]** addresses confidentiality and authentication through **public-key encryption** and **[[Digital Signature]]s**, whereas SHA ensures the **integrity** of a message.  
- **SHA-2** (SHA-256, SHA-512) and **SHA-3** are standard and widely used in modern cryptographic applications.

Like [[RSA]] relies on factoring being hard, SHA relies on the infeasibility of finding collisions (two distinct messages producing the same hash) or preimages (an input that hashes to a specific target). Both RSA and SHA are fundamental to modern cryptography, but they solve different problems.
