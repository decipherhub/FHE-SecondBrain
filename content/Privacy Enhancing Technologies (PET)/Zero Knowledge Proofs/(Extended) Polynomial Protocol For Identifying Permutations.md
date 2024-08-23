[[Polynomial Protocol For Identifying Permutations]]에서는 두 다항식들 간의 permutation check에 대해 다루었다. [PLONK paper](https://eprint.iacr.org/2019/953.pdf?ref=research.metastate.dev)는 이를 확장하여 여러 다항식의 permutation을 동시에 체크할 수 있는 방법을 설명하고 있다.

>[!Extended Polynomial Protocol For Identifying Permutations] 
>$f_1, f_2, ..., f_k \in \mathbb{F}_{<d}[X]$ 와 $g_1, g_2, ..., g_k \in (\mathbb{F}_{<d}[X])^k$에 대해, $(g_1, g_2, ..., g_k) = \sigma(f_1, f_2, ..., f_k)$ 인지를 확인할 수 있는 방법. ($\sigma: [kn] \rightarrow [kn]$)

## Protocol
**Preprocessed polynomials** :
먼저 다음과 같은 다항식들을 가지고 있다고 가정하자. 
$$
\begin{gathered}

S_{IDj}(g^i) = (j-1) \cdot n + i \space for \space each \space i\in[n] \\
S_{\sigma_j}(g^i) = \sigma((j-1) \cdot n + i) \space for \space each \space i\in[n] \\
S_{ID1},...S_{IDn}, S_{\sigma_1},..., S_{\sigma_n} \in \mathbb{F}_{<n}[X]



\end{gathered}
$$

**Input**:
$f_1, f_2, ..., f_k \in \mathbb{F}_{<n}[X]$ 와 $g_1, g_2, ..., g_k \in \mathbb{F}_{<n}[X]$

**Protocol**:
1. $V_{poly}$ 는 랜덤한 $\beta, \gamma \in \mathbb{F}$ 를 골라 $P_{poly}$에게 전송한다.
2. $f'_j:=f_j+\beta \cdot S_{IDj} + \gamma, g'_j := g_j+\beta \cdot S_{\sigma_j}+ \gamma$ 라고 하자. 즉, 다음이 성립한다. $$f'_j(g^i)=f_j(g^i)+\beta \cdot ((j-1) \cdot n + i) + \gamma, \space g_j'(g^i)=g_j(g^i)+\beta \cdot \sigma((j-1) \cdot n + i) + \gamma$$
3. 또한, $f', g' \in \mathbb{F}_{<kn}[X]$를 다음과 같이 정의하자.$$
	\begin{aligned}
	&f'(X) := \prod_{j \in [k]} f'_j(X) \\
	&g'(X) := \prod_{j \in [k]} g'_j(X)
	\end{aligned}
	$$
4. $P_{poly}$는 다음을 만족하는 $Z \in \mathbb{F}_{<n}[X]$를 계산한다. 	$$\begin{aligned}
	&Z(g)=1 \\
	&Z(g^i) = \prod_{1 \leq j <i} f'(g^j)/g'(g^j)
	\end{aligned}, \quad for\space i \in \{2, ..., n\}
	$$
5. $P_{poly}$는 $Z$ 를 $\mathcal{I}$ 에게 보낸다.
6. $V_{poly}$는 모든 $a \in H$에 대해, 다음이 성립하는지 확인하고, 성립하는 경우에만 $acc(accept)$를 리턴한다. $$\begin{aligned}
	&(a) \quad L_1(a)(Z(a)-1)=0 \\
	&(b) \quad Z(a)f'(a) =g'(a)Z(a \cdot g)
	\end{aligned}$$
기존과 달라진 부분은 $S_{ID}$ 및 $S_{\sigma_j}$의 정의와 $f', g'$의 정의이다. 
