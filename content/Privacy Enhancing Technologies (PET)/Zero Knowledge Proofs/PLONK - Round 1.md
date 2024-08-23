## 1. Wire polynomial 계산
증명자는 랜덤한 $(b_1, ..., b_9) \in \mathbb{F}$ 를 뽑는데, 이는 **blinding scalar** 라고도 부른다.
이를 이용해 wire polynomial $a(X), b(X), c(X)$ 를 다음과 같이 계산한다. 
$$
\begin{aligned}
a(X) = (b_1X + b_2)Z_H(X) + \sum_{i=1}^nw_iL_i(X) \\
b(X) = (b_3X + b_4)Z_H(X) + \sum_{i=1}^nw_{n+i}L_i(X) \\
c(X) = (b_5X + b_6)Z_H(X) + \sum_{i=1}^nw_{2n+i}L_i(X)
\end{aligned}
$$
위 식에서 $\sum_{i=1}^nw_iL_i(X)$ 은 각 left input의 벡터를 polynomial로 interpolate한 것이다. 반면, $(b_1X + b_2)Z_H(X)$ 은 불필요한 값을 추가하여 영지식성을 만족하기 위해 추가된 것으로, 실제 input witness를 역추적하지 못하게 하는 역할을 한다. 해당 식이 일차식으로 나타나는 이유는 일차식을 사용하는것이 무작위성에 더 도움이 되기 때문이다.

## 2. Commit
1에서 구한 wire polynomial을 바탕으로, $[a]_1 := [a(x)]_1, [b]_1 := [b(x)]_1, [c]_1 := [c(x)]_1$ 을 계산하여 round 1의 output으로 삼는다.
