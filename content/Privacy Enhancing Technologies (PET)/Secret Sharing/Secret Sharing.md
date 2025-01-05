## What is secret sharing?

Secret sharing is an approach that distributes a secret value by using shares, which do not reveal any information about the secret itself. The secret value can only be reconstructed when all shares or a sufficient number of shares are combined.


**Example:**

Let's look at how **Additive Secret Sharing** works with an example involving three participants and an addition operation. In this scheme, the secret is divided into m parts, and the secret can only be reconstructed when all parts are combined.

**Secret Splitting**

- Choose a secret value.
    - $S = 1337$
- Choose $m - 1$ random numbers as shares.
    - $m = 3$
    - $S_1 = 220$
    - $S_2 = 540$
- Calculate the final share $S_3$.
    - $S = S_1 + S_2 + S_3$
    - $S_3 = S - (S_1 + S_2) = 1337 - (220 + 540) = 577$

Let’s split another secret to perform an addition:
- $T = 1440$
    - $T_1 = 118$
    - $T_2 = 330$
    - $T_3 = 992$

**Share Distribution**

Distribute the shares to the participants.
- Participant 1: $S_1$ and $T_1$
- Participant 2: $S_2$ and $T_2$
- Participant 3: $S_3$ and $T_3$

**Perform Operation**

Each participant can perform the addition locally.
- $R_1 = S_1 + T_1 = 220 + 118 = 338$
- $R_2 = S_2 + T_2 = 540 + 330 = 870$
- $R_3 = S_3 + T_3 = 577 + 992 = 1569$

**Secret Reconstruction**

Reconstruct the result from the shares:
- $R = S + T$
- $R = (S_1 + S_2 + S_3) + (T_1 + T_2 + T_3) = (S_1 + T_1) + (S_2 + T_2) + (S_3 + T_3)$
- $R = 338 + 870 + 1569 = 2777$

<br/>

The overall secret value $R$ is obtained as the sum of two secret values, $S$ and $T$.

Each participant performs individual operations using only their own share, and in the final step, all results are combined to reconstruct the final secret.

In the previous steps, each participant operates solely on their own share, so no information about the input values is exposed.

<br/>

### Index
- [[Shamir's Secret Sharing Scheme]]
- [[Linear Secret Sharing Scheme]]

