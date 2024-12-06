# Post-Quantum Cryptography

## Definition

**Post-Quantum Cryptography (PQC)** refers to cryptographic algorithms designed to be secure against the potential threats posed by quantum computers. While classical computers operate on bits (0s and 1s), quantum computers use quantum bits or qubits, which can represent 0 and 1 simultaneously due to superposition. This capability allows quantum computers to solve certain mathematical problems exponentially faster than classical computers, rendering many of today's cryptographic algorithms vulnerable.

PQC aims to develop new cryptographic systems that can run on classical computers but are secure against both classical and quantum attacks. These algorithms are based on mathematical problems believed to be hard for quantum computers to solve efficiently.

## Quantum Computing and Cryptography

### Challenges with Current Cryptographic Algorithms

The public key cryptosystems currently in widespread use, such as [[RSA]], **Elliptic Curve Cryptography (ECC)**, and [[Diffie-Hellman]] **key exchange**, rely on the computational difficulty of certain mathematical problems:

- **Integer Factorization**: The basis for [[RSA]] encryption.
- **Discrete Logarithm Problem**: Used in [[Diffie-Hellman]] and ECC.

Quantum computers threaten these systems because of algorithms like **Shor's algorithm**, which can solve these problems in polynomial time, effectively breaking the security of these cryptosystems.

#### Shor's Algorithm

- **Developed by**: Peter Shor in 1994.
- **Capability**: Efficiently factors large integers and computes discrete logarithms.
- **Impact**: Can break [[RSA]], ECC, and other cryptosystems relying on these hard problems.

#### Grover's Algorithm

- **Developed by**: Lov Grover in 1996.
- **Capability**: Provides a quadratic speedup for unstructured search problems.
- **Impact**: Affects symmetric-key algorithms like [[AES]] by effectively halving the key length (e.g., a 256-bit key would offer 128 bits of security against quantum attacks).

### Implications

- **Data Security**: Encrypted data intercepted today could be stored and decrypted in the future once quantum computers become powerful enough—a threat known as "store now, decrypt later."
- **Urgency for Transition**: There is a need to transition to quantum-resistant algorithms before large-scale quantum computers become operational.

## Post-Quantum Cryptography

### Goals of Post-Quantum Cryptography

1. **Quantum Resistance**: Develop algorithms that are secure against both classical and quantum attacks.
2. **Performance**: Ensure that the new algorithms are efficient enough for practical use on existing hardware.
3. **Ease of Integration**: Design algorithms that can be integrated into current protocols and systems with minimal changes.
4. **Versatility**: Provide solutions for various cryptographic needs, including encryption, digital signatures, and key exchange.

### Categories of Post-Quantum Algorithms

Post-quantum cryptographic algorithms are based on mathematical problems believed to be resistant to quantum attacks. The main categories include:

1. **Lattice-Based Cryptography**

   - **Mathematical Basis**: Hard problems in lattice structures, such as the Shortest Vector Problem (SVP) and [[Learning With Errors (LWE)]].
   - **Features**:
     - Strong security proofs.
     - Efficiency and scalability.
     - Supports advanced functionalities like fully homomorphic encryption.

2. **Code-Based Cryptography**

   - **Mathematical Basis**: Error-correcting codes, particularly the difficulty of decoding a general linear code.
   - **Examples**: McEliece and Niederreiter cryptosystems.
   - **Features**:
     - Long-standing security record.
     - **Drawback**: Large key sizes.

3. **Multivariate Quadratic Equations**

   - **Mathematical Basis**: Solving systems of multivariate quadratic equations over finite fields.
   - **Features**:
     - Fast computation.
     - **Drawback**: Large public keys and complex implementations.

4. **Hash-Based Signatures**

   - **Mathematical Basis**: Security of cryptographic hash functions.
   - **Examples**: Lamport signatures, Merkle signature schemes, SPHINCS+.
   - **Features**:
     - Very strong security assumptions.
     - Stateless or stateful operations.
     - **Drawback**: Larger signature sizes.

5. **Isogeny-Based Cryptography**

   - **Mathematical Basis**: Hardness of finding isogenies between elliptic curves.
   - **Examples**: Supersingular Isogeny Key Exchange (SIKE).
   - **Features**:
     - Small key sizes.
     - Currently less mature and under active research.

6. **Symmetric-Key Quantum Resistance**

   - **Approach**: Doubling key sizes in symmetric algorithms to counteract Grover's algorithm.
   - **Examples**: Using AES-256 instead of AES-128.

## NIST Post-Quantum Cryptography Standardization Program

### Overview

The **National Institute of Standards and Technology** [NIST](https://www.nist.gov/) initiated the Post-Quantum Cryptography Standardization Program in 2016 to evaluate and standardize one or more quantum-resistant public-key cryptographic algorithms.

### Objectives

- **Identify Secure Algorithms**: Find algorithms that can withstand quantum attacks.
- **Standardization**: Develop new standards to replace vulnerable cryptographic algorithms.
- **Industry Adoption**: Encourage the integration of these algorithms into existing systems.

### Process

1. **Call for Proposals (2016)**

   - NIST invited submissions of quantum-resistant cryptographic algorithms.
   - Received 82 initial submissions.

2. **Evaluation Rounds**

   - **Round 1 (2017-2019)**: 69 candidates accepted for initial evaluation.
   - **Round 2 (2019-2020)**: Narrowed down to 26 candidates based on security and performance.
   - **Round 3 (2020-2022)**: Further reduced to 15 finalists (7 finalists and 8 alternates).

3. **Criteria for Evaluation**

   - **Security**: Resistance to classical and quantum attacks.
   - **Performance**: Computational efficiency, key and signature sizes.
   - **Implementation Considerations**: Ease of implementation, resistance to side-channel attacks.
   - **Algorithm Maturity**: Extent of analysis and peer review.

## NIST's Announcement of the First Winners in 2022

In July 2022, NIST announced the selection of four algorithms for standardization:

1. [CRYSTALS-Kyber](https://csrc.nist.gov/pubs/fips/203/ipd) (Public-Key Encryption/KEM)
2. [CRYSTALS-Dilithium](https://csrc.nist.gov/pubs/fips/204/ipd) (Digital Signature)
3. [FALCON](https://csrc.nist.gov/pubs/fips/205/ipd) (Digital Signature)
4. [SPHINCS+](https://csrc.nist.gov/CSRC/media/Presentations/SPHINCS/images-media/SPHINCS-Plus-April2018.pdf) (Digital Signature)

### CRYSTALS-Kyber

- **Type**: Public-Key Encryption and Key-Encapsulation Mechanism (KEM).
- **Basis**: Lattice-based, relying on the hardness of the [[Learning With Errors (LWE)]] problem.
- **Features**:
  - **Efficiency**: Offers a good balance between security and performance.
  - **Small Key Sizes**: Relatively compact public and private keys.
  - **Applications**: Suitable for general encryption needs, including securing internet traffic.

### CRYSTALS-Dilithium

- **Type**: [[Digital Signature]] Scheme.
- **Basis**: Lattice-based, using Module-LWE and Module-SIS problems.
- **Features**:
  - **Strong Security**: Based on well-studied hard lattice problems.
  - **Performance**: Efficient signing and verification processes.
  - **Applications**: Code signing, authentication protocols.

### FALCON

- **Type**: [[Digital Signature]] Scheme.
- **Basis**: Lattice-based, specifically [NTRU lattices](https://www.ntru.org/f/hps98.pdf).
- **Features**:
  - **Compact Signatures**: Smaller signature sizes compared to other lattice-based schemes.
  - **Efficient Verification**: Fast verification times.
  - **Applications**: Ideal for applications where bandwidth or storage is limited.

### SPHINCS+

- **Type**: [[Digital Signature]] Scheme.
- **Basis**: Hash-based, relying solely on the security of underlying hash functions.
- **Features**:
  - **Conservative Security**: Minimal assumptions beyond the hash function's security.
  - **Stateless Operation**: Simplifies implementation by avoiding the need to maintain state.
  - **Drawbacks**: Larger signature sizes and slower performance compared to lattice-based schemes.
  - **Applications**: Situations requiring high security assurances.

### Significance of the Selection

- **Diversity**: NIST chose algorithms from different families to mitigate the risk of a single point of failure.
- **Focus on Lattice-Based Cryptography**: The prominence of lattice-based algorithms underscores their importance in PQC.
- **Preparation for Transition**: Provides the industry with concrete options to begin transitioning to quantum-resistant cryptography.

## Conclusion

Post-Quantum Cryptography is a critical field addressing the imminent threat that quantum computing poses to current cryptographic systems. By developing and standardizing algorithms resistant to quantum attacks, PQC ensures the confidentiality, integrity, and authenticity of digital communications in the quantum era.

