
## Intro
PKI (Public Key Infrastructure) is an infrastructure system that uses public key cryptography to securely exchange information in electronic environments and protect the identity and data of users. PKI is a comprehensive infrastructure that encompasses a series of policies, procedures, software, hardware, cryptographic techniques, and more, carried out between an organization responsible for issuing and managing certificates (Certificate Authority, CA) and the user (or organization) that operates the pair of public and private keys.

In general, in symmetric key cryptosystems, users must use a pre-shared secret value to exchange keys. Alternatively, protocols such as Diffie-Hellman key exchange can be applied without a pre-shared secret value, but there is a possibility of exposure to man-in-the-middle attacks, so it is not considered a completely safe method. Another approach involves using a Key Distribution Center (KDC) to share a secret key, which relies on a trusted third party. However, as the number of users or system terminals increases and the variety of secret keys grows, there is a greater likelihood that the system could become overloaded during key management and distribution.

On the other hand, if a public key cryptosystem is applied, users do not necessarily have to go through a trusted authority, and they only need to manage their own private key securely. As a result, it becomes relatively simple and safe to design a key exchange protocol.



## Publish the Public Key
In a public key cryptosystem, the most important aspect is to securely publish the public key. For example, suppose Bob has published his public key on the internet. Alice can obtain Bob’s public key from the internet in order to send him a message. However, if there is no way for Alice to verify that the public key she obtained truly belongs to Bob, a problem arises. If a malicious attacker disguises their own public key as though it were Bob’s, then any message Alice sends would go to the attacker instead of Bob, posing a serious security threat.

### Publishing Public Keys through a Trusted Server
To address the issue described above, one can consider publishing the public key in a secure environment via a trusted server. This trusted server verifies that Bob’s public key indeed belongs to Bob, making it very difficult for an attacker to pass off their own public key as Bob’s. For this to work, Bob must prove to the server that he really is Bob before registering his public key. Once the server verifies Bob’s identity, Bob’s public key is officially registered. This allows users to safely obtain Bob’s public key through the trusted server.  
However, one drawback of this method is the potential server overload if many users attempt to access it simultaneously.

### Public Key Certification via Certificates
Another way to address public key authentication is to use **certificates**. Bob can have his public key certified by a **Certificate Authority (CA)**. Then, whenever Bob shares his public key with someone, he can also provide the certificate. Because the certificate includes the CA’s digital signature, it is nearly impossible for an attacker to forge.  
As a result, when Alice receives Bob’s public key along with the certificate, she can verify the certificate to trust that the key genuinely belongs to Bob. Moreover, even when many users access the key at the same time, the bottleneck that could overload a single server is greatly reduced, thereby mitigating potential system overload.



## Components
### CA, Certificate Authority
* A trusted entity responsible for issuing, managing, and revoking certificates.
- Verifies the identity of users and issues digital certificates accordingly.
- Users send their public key and identity information (e.g., ID) to the Certificate Authority (CA). Since the private key is held only by the user and is not sent to the CA, there is no risk of the private key being exposed through the CA.

### RA, Registration Authority
* Acts on behalf of the CA by verifying user identities and validating certificate issuance requests.

### Certificate
* An electronic document that includes a public key, the owner’s identity, the issuing authority, and the valid period, among other information.
- The **X.509** standard format is the most commonly used.



## X.509
A certificate contains not only the public key owner’s information but also various other data, such as the certificate’s valid period and the Certificate Authority’s digital signature. As certificates became widely used, a need arose for a standardized set of criteria, leading to the establishment of the X.509 public key certificate standard, which is now the most widely utilized.

The X.509 format is as follows:

| Field                     |
| ------------------------- |
| Version                   |
| Serial Number             |
| Algorithm ID              |
| Issuer                    |
| Validity period           |
| Subject name              |
| Subject Public Key Info   |
| Issuer Unique Identifier  |
| Subject Unique Identifier |
| Extensions                |
| Certificate Signature     |
- **Version**: The version of the certificate
- **Serial Number**: A unique number allowing the certificate to be distinctly identified
- **Algorithm ID**: The algorithm (e.g., RSA, DSA) used by the Certificate Authority to sign the certificate
- **Issuer**: The name of the Certificate Authority
- **Validity period**: The period during which the certificate is valid
- **Subject name**: The entity that owns the public key
- **Subject Public Key Info**: The public key itself and the algorithm used
- **Issuer Unique Identifier**: An optional field enabling multiple issuers to use the same issuer name
- **Subject Unique Identifier**: An optional field enabling multiple subjects to use the same subject name
- **Extensions**: Optional object identifiers for strings, dates, or data structures, etc.
- **Certificate Signature**: A digital signature generated by the Certificate Authority on the hash of the above information



## Operation Principle
### Certificate Issuance
1. The user verifies their identity through the RA.
2. Once the RA completes the identity verification, it requests certificate issuance from the CA.
3. The CA either instructs the user to generate a public/private key pair or generates it on the user’s behalf and then proceeds with the issuance process.
4. The CA signs the digital certificate and issues it to the user.

### Certificate Usage
Let us assume Alice wants to communicate with Bob using Bob’s public key.
1. Bob provides his certificate to Alice to establish secure communication.
2. Alice verifies the validity of Bob’s certificate.
3. If the certificate is valid, Alice uses Bob’s public key to send an encrypted message.
4. Bob decrypts the message with his private key.

### Certificate Revocation and Renewal
1. If necessary, the CA revokes the certificate. A revoked certificate is marked as invalid via the CRL or OCSP.
> [!Question] What are **CRL** and **OCSP**?
> A CRL (Certificate Revoked List) is a list of certificates that have been revoked before their expiration date. It is created and managed by the Certificate Authority.
> OCSP (Online Certificate Status Protocol) checks the status of a certificate by responding to individual requests from verifiers. When there are many revoked certificates, the size of the CRL can become large, making an OCSP-based system generally more efficient.
2. Before the certificate’s validity period expires, one can request a new issuance and receive a renewed certificate.



## Trust Models Among Certification Authorities
Because it is practically impossible for a single Certification Authority (CA) to authenticate the public keys of all users, various CAs exist according to each country or purpose. Therefore, CAs require a model that allows certificates issued by other CAs to be recognized without additional certificate issuance. Two representative models in this context are the **Hierarchical Model** and the **Mesh Model**.

### Hierarchical Model
This model places a **root CA** at the topmost level so that a tiered certification structure is possible.
- In a **hierarchical model**, the CA in an upper level issues certificates to the CA directly below it.
- The root CA, located at the highest level, issues a certificate to itself using a **self-signing** method.
- This model is generally suited for relatively smaller-scale groups.

### Mesh Model
When the network is large and complex, the **mesh model** is more appropriate.
- In this model, multiple root CAs issue certificates to each other, establishing **mutual trust**.
- Unlike the hierarchical model, which requires a vertical trust relationship, the mesh model is based on a **horizontal trust relationship**. If there are $n$ root CAs, the number of cross-certificates needed is $\frac{n(n-1)}{2}$.