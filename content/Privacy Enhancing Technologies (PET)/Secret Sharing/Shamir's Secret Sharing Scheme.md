# Shamir’s Secret Sharing Scheme

Shamir’s Secret Sharing scheme is an algorithm first proposed by Adi Shamir in 1979. This is a method for securely splitting and managing a secret, where the secret is divided into multiple shares, and only a subset of these shares is required to reconstruct the original secret. The minimum number of shares needed for reconstruction is called the threshold.

![image](https://github.com/user-attachments/assets/436cbfdf-8020-4962-80ca-7dbe595fed1c)

This scheme leverages the Lagrange interpolation theorem. Specifically, it uses the fact that $t$ points of a polynomial uniquely determine a polynomial with degree less than or equal to $t-1$.

Shamir’s Secret Sharing is a $(t, n)$-threshold scheme based on polynomial interpolation over finite fields. 

The secret $S$ is divided into n parts $(S_1, S_2, \ldots, S_n)$, each of which is referred to as a share. This method satisfies the following two conditions:

1. With $t$ or more shares $(S_i)$, the secret $S$ can be calculated. In other words, once $k$ shares are combined, the secret $S$ can be reconstructed in every combination.

2. With only $t-1$ or fewer shares $(S_i)$, it is impossible to fully determine the secret $S$. The secret cannot be reconstructed with less than $t$ shares.

In addition, if $n = t$, then all shares are required to reconstruct the secret $S$.

<br/>
Let’s assume the secret $S$ can be represented as an element $a_0$ in a finite field $GF(q)$, where $q$ is a value greater than the number of shares $n$ to be generated. In $GF(q)$, $k-1$ elements $(a_1, a_2, \ldots, a_{t-1})$ are randomly selected, and then a polynomial is constructed as follows:

$f(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + \cdots + a_{t-1}x^{t-1}$

We calculate $n$ points on this polynomial. For example, set $i = 1, 2, \ldots, n$ to find the point $(i, f(i))$. Each participant is given one point (a non-zero input to this polynomial and its corresponding output).

With any combination of $t$ of these points, the value $a_0$ can be determined through interpolation.

$a_0 = f(0) = \sum_{j=0}^{t-1} y_j \prod_{\substack{m=0 \\ m \neq j}}^{t-1} \frac{x_m}{x_m - x_j}$

In the polynomial, we have $t$ points in the form $(x_i, y_i)$. $f(0)$ corresponds to the first coefficient of the polynomial $f(x)$, which is $a_0$.

Therefore, when $t$ points are combined, $a_0$ can be calculated using this formula, allowing the reconstruction of the secret $S$.

