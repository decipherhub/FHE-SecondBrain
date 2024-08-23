## 1. Permutation polynomial 계산
증명자는 transcript로부터 랜덤한 $(\beta, \gamma) \in \mathbb{F}$를 뽑는데, 이는 permutation challenge라고도 불린다. 그 이름의 이유는 이를 이용하여 permutation check에 사용되는 permutation polynomial $z(X)$가 계산되기 때문이다.
$$
\beta = \mathcal{H}(transcript, 0), \gamma = \mathcal{H}(transcript, 1)
$$
또한 
이로부터 다음과 같은 permutation polynomial $z(X)$를 계산한다.
$$
\begin{aligned}
z(X) = &(b_7X^2 + b_8X + b_9)Z_H(X) \\
&+ L_1(X) \\
&+ \sum_{i=1}^{n-1}(L_{i+1}(X)\prod_{j=1}^i{(w_j+\beta w^j + \gamma)(w_{n+j}+\beta k_1 w^j + \gamma)(w_{2n+j}+\beta k_2 w^j + \gamma) \over (w_{j}+\sigma^*(j)\beta + \gamma)(w_{n+j}+\sigma^*(n+j)\beta + \gamma)(w_{j}+\sigma^*(2n+j)\beta + \gamma)})
\end{aligned}
$$
첫번째 줄은 [[PLONK - Round 2|Round2]]과 마찬가지로 영지식성을 위해 추가된 부분이다. 두번째 줄과 세번째 줄은 [[(Extended) Polynomial Protocol For Identifying Permutations|permutation check]] 에서 $Z(X)$가 만들어지는 과정을 약간 변형한 것이다. 기본적으로 $X=\omega$에서 1, 그 이후로는 누적 곱이 되는 induction 과정은 동일하지만, 항들의 형태가 약간 달라졌다. (아마 효율성을 위해)

## 2. Commit
1에서 계산한 permutation polynomial을 다음과 같이 커밋한다.
$$[z]_1 := [z(x)]_1$$




