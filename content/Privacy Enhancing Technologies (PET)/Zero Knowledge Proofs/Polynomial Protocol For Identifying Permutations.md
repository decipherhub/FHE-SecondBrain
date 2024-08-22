Permutation check란 두 벡터 $a=(a_1, a_2, ... a_n), b=(b_1, b_2, ... b_n)$와 permutation $\sigma: [n] \rightarrow [n]$ 이 존재할 때 다음이 성립하는지 확인하는 것이다. $$i\in [n], b_i = a_{\sigma(i)}$$
먼저 군 $H: \{g^i\}_{i \in [n]}$의 [[Lagrange basis]] $L_i(X)$를 통해 두 벡터의 polynomial interpolation을 구해 보자. $$\begin{aligned}f=\sum_i^na_i​⋅L_i​(X) \\ g=\sum_i^nb_i​⋅L_i​(X) \end{aligned}$$이 두 다항식의 permutation check, 즉 $g(g^i)=f(g^{\sigma(i)})$를 증명하면 두 벡터 $a, b$의 permutation check도 증명된다. 따라서 지금부터는 두 다항식의 permutation check를 증명하는 프로토콜에 대해 알아보자.

## Protocol
**Preprocessed polynomials** :
먼저 다음과 같은 다항식들을 가지고 있다고 가정하자. 
$$\begin{gathered}

S_{ID}(g^i) = i \space for \space each \space i\in[n] \\
S_\sigma(g^i) = \sigma(i) \space for \space each \space i\in[n] \\
S_{ID}, S_\sigma \in \mathbb{F}_{<n}[X]



\end{gathered}
$$

**Inputs** : $$f, g \in \mathbb{F}_{<n}[X]$$
**Protocol** :
1. $V_{poly}$ 는 랜덤한 $\beta, \gamma \in \mathbb{F}$ 를 골라 $P_{poly}$에게 전송한다.
2. $f':=f+\beta \cdot S_{ID} + \gamma, g' := g+\beta \cdot S_\sigma+ \gamma$ 라고 하자. 즉, 다음이 성립한다. $$f'(g^i)=f(g^i)+\beta \cdot i + \gamma, \space g'(g^i)=g(g^i)+\beta \cdot \sigma(i) + \gamma$$
3. $P_{poly}$는 다음을 만족하는 $Z \in \mathbb{F}_{<n}[X]$를 계산한다. 	$$\begin{aligned}
	&Z(g)=1 \\
	&Z(g^i) = \prod_{1 \leq j <i} f'(g^j)/g'(g^j)
	\end{aligned}, \quad for\space i \in \{2, ..., n\}
	$$
4. $P_{poly}$는 $Z$ 를 $\mathcal{I}$ 에게 보낸다.
5. $V_{poly}$는 모든 $a \in H$에 대해, 다음이 성립하는지 확인하고, 성립하는 경우에만 $acc(accept)$를 리턴한다. $$\begin{aligned}
	&(a) \quad L_1(a)(Z(a)-1)=0 \\
	&(b) \quad Z(a)f'(a) =g'(a)Z(a \cdot g)
	\end{aligned}$$

>[! Note] 
>$f,g\in \mathbb{F}_{<d}​[X]$라고 하자. $g \neq \sigma(f)$인 경우, 위의 프로토콜에서 $P_{poly}$​의 어떤 전략에 대해서도 $V_{poly}$​가 "acc"(승인)를 출력할 확률은 $\text{negl}(\lambda)$이다. (negligible function, 무시 가능하다)

*위 결론의 soundness에 대한 증명이 알고싶은 경우, PLONK paper "Lemma 5.2" 참고

## Verify의 의미
마지막 5번 단계에서 검증자가 (a)조건과 (b)조건을 검증한다. Soundness를 증명하기 전에 **느낌**을 잡기 위해 각 조건이 무엇을 의미하는지 살펴보자.

**$(a)$: Base Case**
- 먼저 $(a) \space L_1(a)(Z(a)-1)=0$ 를 살펴보면, $L_1(a)$는 $a=g^1$ 일 때에만 1이고, 나머지 경우 모두 0이다. 따라서 $(a)$ 조건은 $Z(g) = 1$ 인가를 검사하는 목적이라고 할 수 있다. (나머지 경우는 trivial하게 0이므로)

**$(b)$: Induction Step**
다음으로 $(b) \space Z(a)f'(a) =g'(a)Z(a \cdot g)$ 는 $a \in H$에 대해 평가되므로 아래와 같이 정리된다. ($H: \{g^i\}_{i \in [n]}$)
$$
\begin{aligned}
Z(g^i)f'(g^i) &=g'(g^i)Z(g^{i+1}) \\
Z(g^{i+1}) &= Z(g^i){f'(g^i) \over g'(g)} \\
 &= \prod_{1 \leq j \leq i}{f'(g^i) \over g'(g^i)} \\
\end{aligned}
$$
이는 증명자가 3단계에서 $Z$ 를 만든 과정과 동일하다. 해당 식이 $a = g^n$에서 평가된다면, 다음과 같이 정리된다. $$
\begin{aligned}
Z(g^{n+1}) &= \prod_{i=1}^n{f'(g^i) \over g'(g^i)} = Z(g) =1 \\
\end{aligned}
$$
즉 $f'(g), f'(g^2), ... f'(g^{n-1})$ 과 $g'(g), g'(g^2), ..., g'(g^{n-1})$ 이 서로 상쇄된다는 뜻이므로, permutation이 확인되었다고 할 수 있다.

## Soundness 증명
앞서 느낌적인 느낌으로 permutation을 확인할 수 있다는 사실을 배웠지만, 실제로는 더 강한 보장이 필요하다. 즉, $f$의 permutation이 아닌 함수 $g$를 가지고 위 프로토콜을 통과해서는 안된다는 사실이 필요하다.

>[! Note] 
>$f,g\in \mathbb{F}_{<d}​[X]$라고 하자. $g \neq \sigma(f)$인 경우, 위의 프로토콜에서 $P_{poly}$​의 어떤 전략에 대해서도 $V_{poly}$​가 "acc"(승인)를 출력할 확률은 $\text{negl}(\lambda)$이다. (negligible function, 무시 가능하다)

위 Lemma는 프로토콜의 1단계에서 "**랜덤한**" $\beta, \gamma \in \mathbb{F}$ 를 뽑았고 **$\mathbb{F}$는 충분히 크다**는 사실로부터 [[Schwartz-Zippel Lemma]]를 적용하면 증명할 수 있다. 즉 고차다항식이 (충분히 큰 도메인에서 추출된) 임의의 점에서 0이 될 확률은 극도로 낮기 때문에, 아래 식이 우연히 성립할 확률도 매우 낮다.
$$
\begin{gathered}
\prod_{i=1}^n{f'(g^i)} = \prod_{i=1}^n{g'(g^i)} \\
(f'(g^i)=f(g^i)+\beta \cdot i + \gamma, \space g'(g^i)=g(g^i)+\beta \cdot \sigma(i) + \gamma)
\end{gathered}$$
따라서 $g \neq \sigma(f)$인 경우 높은 확률로 $\prod_{i=1}^n{f'(g^i)} \neq \prod_{i=1}^n{g'(g^i)}$ 도 참이다. 이 때 귀류법을 사용해서 $(a), (b)$ 체크 과정을 통과한다고 가정하자. 그렇다면 아래와 같이 모순이 발생한다. $$
\begin{aligned}
&Z(g^{n+1}) = \prod_{i=1}^n{f'(g^i) \over g'(g^i)} \neq 1 \\
&Z(g) =1 \\
&Z(g^{n+1}) = Z(g)
\end{aligned}$$
*보다 자세한 증명이 알고싶은 경우, PLONK paper "Lemma 5.2" 및 "**Claim A.1.**" 참고
