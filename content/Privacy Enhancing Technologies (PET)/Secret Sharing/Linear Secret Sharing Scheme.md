# Linear Secret Sharing Scheme (LSSS)

The **Linear Secret Sharing Scheme (LSSS)** is a cryptographic method that divides a secret into multiple parts, known as *shares*. These shares are distributed among several participants, and the secret can only be reconstructed when a specific group of participants come together. This design ensures that only authorized subsets of participants can access the original secret.

<br/>

## Access Structure

The **access structure** defines the specific combinations of participants that are allowed to reconstruct the secret. LSSS implements this access structure through linear operations, enabling secure sharing of the secret information and controlling its reconstruction to authorized groups only.

- Let $\mathcal{P} = {P_1, P_2, \ldots, P_n}$ be a set of participants.

- $\Gamma \subseteq 2^{{P_1, P_2, \ldots, P_n}}$: A collection of subsets of participants authorized to reconstruct the secret.


## Linearity

The core property of LSSS is **linearity**, which allows valid shares to be combined to reconstruct the secret or to generate new valid shares. For example, the linear combination of share1 and share2 can produce a new valid share. This linearity provides flexibility in designing access structures and enables simple and efficient secret reconstruction through basic operations.

As a result, LSSS is widely used as a foundational cryptographic method in various Multi-Party Computation (MPC) protocols, such as Shamir's Secret Sharing or additive sharing.

<br/>

## Core Components and Processes**

- **Secret:** $s \in \mathbb{Z}_p$
- **Random Values:** $r_2, r_3, \ldots, r_d \in \mathbb{Z}_p$

- **Column Vector:** $\vec{v} = (s, r_2, \ldots, r_d)$
- **Share Calculation:** $\lambda_i = \langle M_i, \vec{v} \rangle = M_i \cdot \vec{v}$
- **Share Distribution:** Each participant $P_i$ receives their share $\lambda_i$.
- **Linear Reconstruction:** $s = \sum_{i \in S} \omega_i \lambda_i$
    
    Here, $S \in \Gamma$ is the set of participants authorized to reconstruct the secret $s$.
    
- **Condition:** $\sum_{i \in S} \omega_i M_i = (1, 0, \ldots, 0)$

<br/>

Shares are calculated as linear functions of the secret and random values. This process begins by constructing a vector containing the secret and the random values, which is then multiplied by a pre-defined generator matrix. Each participant receives their share as the result of this computation.

Individual shares do not reveal any information about the secret. However, participants in an authorized set can collaborate and perform a linear combination of their shares to recover the secret. During reconstruction, the random values cancel out, and mathematically designed weights ensure that only the secret is extracted.

This mechanism makes LSSS both secure and efficient for secret sharing and reconstruction.

<br/>
<br/>

### Linear (t, n) Secret Sharing Scheme:

Linear $(t, n)$ secret sharing scheme is a special type of secret sharing scheme where all the n shares of the secret satisfy a linear relationship.

A $(t, n)$ secret sharing scheme is a linear secret sharing scheme when the n shares, $v_1, v_2, \ldots, v_n$ can be presented as in Equation

$(v_1, v_2, \ldots, v_n) = (k_1, k_2, \ldots, k_t) H,$

where H is a public $t \times n$ matrix whose any $t \times t$ submatrix is not singular. The vector $(k_1, k_2, \ldots, k_t)$ is randomly chosen by the dealer.

<br/>

We can see that [[Shamir’s Secret Sharing Scheme]] is a linear scheme. Let

$f(x) = a_0 + a_1x + a_2x^2 + \cdots + a_{t-1}x^{t-1}.$

The shares $v_i = f(i), i = 1, 2, \ldots, n$ can be presented as in Equation

$(v_1, v_2, \ldots, v_n) = (a_0, a_1, a_2, \ldots, a_{t-1}) H,$

where $h_{i,j} = j^i$ ($h_{i,j}$ denotes the entry at $i$-th row and $j$-th column of matrix $H$).