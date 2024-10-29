## 1. KZG polynomial commitment scheme

One of the most widely used polynomial commitment schemes is the KZG commitment scheme. The scheme was originally published in 2010 by Kate, Zaverucha, and Goldberg.

Let $G_1$ and $G_2$ be two elliptic curve groups of order $p$, and a non-trivial bilinear mapping $e : G_1$ x $G_2 → G_T$.

Let $g_1 \in G_1$ and $g_2 \in G_2$ be generators.

We define $[x]_1 := g_1^x$ and $[x]_2 := g_2^x$, where $x \in 𝔽_p$. 

**Structured Reference String(SRS)**

The SRS is generated as a set of public parameters required for proof generation and verification of a polynomial. It typically consists of elements like $(g, g^{\alpha}, g^{\alpha^2}, \ldots, g^{\alpha^d})$, where $g$ is a generator of a particular group and $\alpha$ is a secret value. The parameter $d$ is determined by the polynomial's degree.


**Trusted setup** 

A trusted setup selects a random secret $s \in 𝔽_p$.

For a polynomial with a maximum degree $d$, the setup releases $[s^i]_1$ and $[s^i]_2$ for $i = 0,1,...,d$.

**Commitment**

For a polynomial $P(x) = \sum_{i=0}^d p_i x^i$, the commitment $C$ is calculated as:

$C = [P(s)]_1 = g_1^{P(s)} = \prod_{i=0}^d ([s^i]_1)^{p_i}$


To prove that the polynomial $P(x)$ evaluates to $b$ at $x = a$, the prover constructs a quotient polynomial:

$q(x) = {{P(x) - P(a)} \over {x - a}}$ (where $b = P(a)$)

The proof $\pi$ is then calculated as $\pi = [q(s)]_1 = g_1^{q(s)}$.

Given a commitment $C = [P(s)]_1$, an evaluation $P(a) = b$, and a proof $\pi = [q(s)]_1$. 

According to the Schwartz-Zippel lemma, if two polynomials agree on a sufficiently large number of points, they are likely equal. In this context, we can express:

$P(s) - b = q(s)(s-a)$

Using the bilinear pairing function $e$, the verifier can check if:

$e([P(s)]_1 - [b]_1, [1]_2) = e([q(s)]_1, [s]_2 - [a]_2)$

This becomes:
- $e([P(s)]_1 - [b]_1, [1]_2) = e(g_1^{P(s)-b}, g_2^1) = {e(g_1, g_2)}^{P(s)-b}$
- $e([q(s)]_1, [s]_2 - [a]_2) = e(g_1^{q(s)}, g_2^{s-a}) = e(g_1, g_2)^{q(s)(s-a)}$

Therefore, $e(g_1, g_2)^{(P(s) - b)} = e(g_1, g_2)^{q(s)(s - a)}$

Thus, $P(s) - b = q(s)(s - a)$

This equation holds if and only if $P(a) = b$, due to the properties of the pairing function and the structure of $q(x)$.