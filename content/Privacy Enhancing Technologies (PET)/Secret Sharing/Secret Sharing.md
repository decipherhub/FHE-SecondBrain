# Secret Sharing Scheme
<br/>

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

## Shamir’s Secret Sharing Scheme

Shamir’s Secret Sharing scheme is an algorithm first proposed by Adi Shamir in 1979. This is a method for securely splitting and managing a secret, where the secret is divided into multiple shares, and only a subset of these shares is required to reconstruct the original secret. The minimum number of shares needed for reconstruction is called the threshold.

![image](https://github.com/user-attachments/assets/436cbfdf-8020-4962-80ca-7dbe595fed1c)

This scheme leverages the Lagrange interpolation theorem. Specifically, it uses the fact that $k$ points of a polynomial uniquely determine a polynomial with degree less than or equal to $k-1$.

Shamir’s Secret Sharing is a $(k, n)$-threshold scheme based on polynomial interpolation over finite fields. 

The secret $S$ is divided into n parts $(S_1, S_2, \ldots, S_n)$, each of which is referred to as a share. This method satisfies the following two conditions:

1. With $k$ or more shares $(S_i)$, the secret $S$ can be calculated. In other words, once $k$ shares are combined, the secret $S$ can be reconstructed in every combination.

2. With only $k-1$ or fewer shares $(S_i)$, it is impossible to fully determine the secret $S$. The secret cannot be reconstructed with less than $k$ shares.

In addition, if $n = k$, then all shares are required to reconstruct the secret $S$.

<br/>
Let’s assume the secret $S$ can be represented as an element $a_0$ in a finite field $GF(q)$, where $q$ is a value greater than the number of shares $n$ to be generated. In $GF(q)$, $k-1$ elements $(a_1, a_2, \ldots, a_{k-1})$ are randomly selected, and then a polynomial is constructed as follows:

$f(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + \cdots + a_{k-1}x^{k-1}$

We calculate $n$ points on this polynomial. For example, set $i = 1, 2, \ldots, n$ to find the point $(i, f(i))$. Each participant is given one point (a non-zero input to this polynomial and its corresponding output).

With any combination of $k$ of these points, the value $a_0$ can be determined through interpolation.

$a_0 = f(0) = \sum_{j=0}^{k-1} y_j \prod_{\substack{m=0 \\ m \neq j}}^{k-1} \frac{x_m}{x_m - x_j}$

In the polynomial, we have $k$ points in the form $(x_i, y_i)$. $f(0)$ corresponds to the first coefficient of the polynomial $f(x)$, which is $a_0$.

Therefore, when $k$ points are combined, $a_0$ can be calculated using this formula, allowing the reconstruction of the secret $S$.

<br/>

## Linear Secret Sharing Scheme (LSSS)

The Linear Secret Sharing Scheme(LSSS) is a cryptographic method that divides a secret into multiple parts, known as "shares." These shares are distributed among participants, and only specific groups of participants, when combined, can reconstruct the original secret.

A key property of LSSS is linearity, meaning that any linear combination of several valid shares results in another valid share. (For example, by linearly combining share1 and share2, a new valid share can be created.) This linearity allows for flexible design of access structures. The access structure defines the combinations of participants that can reconstruct the secret, and in LSSS, it ensures that only specific groups of participants can restore the secret together.

In conclusion, LSSS is a secure encryption method that allows secret information to be safely shared and controlled under specific conditions. It forms the foundation for many popular MPC(Multi-Party Computation) protocols, incorporating algorithms like Shamir or additive sharing.

