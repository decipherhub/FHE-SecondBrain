## 1. 몫 다항식 계산

Round 3에서 증명자는 transcript로부터 어떤 랜덤 $\alpha \in \mathbb{F}$를 뽑는데($\alpha \equiv \mathcal{H}(transcript)$), 이는 quotient challenge(몫 챌린지)라고도 불린다. 그 이름의 이유는 이 $\alpha$를 이용해서 다음과 같은 몫 다항식 $t(x)$ 를 계산하기 때문이다. 
$$
\begin{aligned}
t(X) = &\\ 
&(a(X)b(X)q_M(X) + a(X)q_L(X) + b(X)q_R(X) + c(X)q_O(X) + PI(X) + q_C(X)) \frac{1}{Z_H(X)} \\ 
&+ ((a(X) + \beta X + \gamma)(b(X) + \beta k_1 X + \gamma)(c(X) + \beta k_2 X + \gamma)z(X)) \frac{\alpha}{Z_H(X)} \\ 
&- ((a(X) + \beta \sigma_1(X) + \gamma)(b(X) + \beta \sigma_2(X) + \gamma)(c(X) + \beta \sigma_3(X) + \gamma)z(X\omega)) \frac{\alpha}{Z_H(X)} \\ 
&+ (z(X) - 1) L_1(X) \frac{\alpha^2}{Z_H(X)} \\
\end{aligned}
$$

### 단순화

괴상한 식이지만 다음과 같이 단순화해서 생각해 보자. 지금 증명자는 자신이 가진 witness로부터 만들어진 a(X), b(X), c(X), z(X) 가 다음의 세가지 statement를 만족한다는 것을 보이고 싶은 것이다.

1) Gate constraint를 만족한다. (이것을 $f_1 = 0$에 대응하자)
2) Copy constraint의 조건 (b)를 만족한다. (이것을 $f_2 = 0$에 대응하자)
3) Copy constraint의 조건 (a)를 만족한다. (이것을 $f_3 = 0$에 대응하자)

$f_i = 0$ 라는 표현은 모든 $a \in H$에 대해 $f_i(a) = 0$ 이 성립한다는 뜻으로 작성했다. 증명자는 이 세가지를 증명하기 위해 각각 $q_1 = f_1/Z_H$, $q_2 = f_2/Z_H$, $q_3 = f_3/Z_H$ 세가지 몫 다항식이 존재한다는 것을 증명할 수 있다. ($Z_H$의 정의에 의해 모든 $a \in H$에 대해 $Z_H(a) = 0$이 성립하므로)

그런데 세 몫 다항식의 존재를 따로따로 증명하는 대신, 그 셋을 합쳐서 하나의 몫 다항식으로 증명하는 방법도 있다. 아래와 같은 선형결합을 사용하는 것이다. $$q = {f_1 + \alpha f_2 + \alpha^2 f_3 \over Z_H}$$
여기서 $(1, \alpha, \alpha^2)$는 선형적으로 독립으로, 모든 $a \in H$에 대해 $f_1 + \alpha f_2 + \alpha^2 f_3 = 0$ 이 성립하는 유일한 경우는 $f_1=0, f_2=0, f_3=0$ 인 경우이다. 따라서 우리가 원하는 세 몫 다항식을 하나의 몫 다항식으로 성공적으로 합쳤다.


### 각 항의 의미

이제 다시 괴상한 식으로 돌아가 보자. 
$$
\begin{aligned}
t(X) = &\\ 
&(a(X)b(X)q_M(X) + a(X)q_L(X) + b(X)q_R(X) + c(X)q_O(X) + PI(X) + q_C(X)) \frac{1}{Z_H(X)} \\ 
&+ ((a(X) + \beta X + \gamma)(b(X) + \beta k_1 X + \gamma)(c(X) + \beta k_2 X + \gamma)z(X)) \frac{\alpha}{Z_H(X)} \\ 
&- ((a(X) + \beta \sigma_1(X) + \gamma)(b(X) + \beta \sigma_2(X) + \gamma)(c(X) + \beta \sigma_3(X) + \gamma)z(X\omega)) \frac{\alpha}{Z_H(X)} \\ 
&+ (z(X) - 1) L_1(X) \frac{\alpha^2}{Z_H(X)} \\
\end{aligned}
$$
이 식은 사실 위의 예시와 동일한 트릭을 이용하여 동일한 statement를 증명하고 있다. 이 식에서 $f_1, f_2, f_3$은 다음과 같이 구체화된다.
$$

$$
$$
\begin{aligned}
f_1(X) = &a(X)b(X)q_M(X) + a(X)q_L(X) + b(X)q_R(X) + c(X)q_O(X) + PI(X) + q_C(X) \\

f_2(X) = &(a(X) + \beta X + \gamma)(b(X) + \beta k_1 X + \gamma)(c(X) + \beta k_2 X + \gamma)z(X) \\
&- ((a(X) + \beta \sigma_1(X) + \gamma)(b(X) + \beta \sigma_2(X) + \gamma)(c(X) + \beta \sigma_3(X) + \gamma)z(X\omega) \\
f_3(X) = &(z(X) - 1) L_1(X)\\
\end{aligned}
$$

그리고 각 식이 의미하는 바는 다음과 같다.

- $f_1(X)$
	: 이 식이 모든 $a \in H$에 대해 0인지 체크하는 것은 gate constraint를 만족하는지 체크하는 것이다. (PI는 public input을 제대로 사용했는지 확인하는 [[Public Input Polynomial]])

- $f_2(X)$
	: 이 식이 모든 $a \in H$에 대해 0인지 체크하는 것은 copy constraint의 [[(Extended) Polynomial Protocol For Identifying Permutations |permutation check]] (b) 조건을 만족하는지 확인하는 것에 해당한다. $$(b) \quad Z(a)f'(a) =g'(a)Z(a \cdot g)$$
	: 잘 보면 $z(X)$로 묶인 앞쪽이 $f'(a) = f(a)+\beta \cdot i + \gamma$ 라는 것을 알 수 있고, $z(X\omega)$ 로 묶인 뒤쪽이 $g'(a)=g(a)+\beta \cdot \sigma(i) + \gamma$ 라는 것을 알 수 있다. (사실 PLONK에서는 이를 변형하여 $\beta$에 곱해지는 값으로 $i$가 아니라 $X$를 사용하며, $Z(X)$, 즉 $z(X)$도 그에 따라 변형해서 만들고 있다.) 그리고 $z(X)$는 $Z(X)$와 같은데, 앞부분의 $Z_H(X)$가 곱해지는 부분을 무시할 수 있기 때문이다. (해당 부분은 영지식성을 위해 붙은 것으로 보이며 지금은 soundness에 대한 논의이므로 무시할 수 있음, 마찬가지로 $Z_H(X)$의 정의에 의해)

- $f_3(X)$
	: 이 식이 모든 $a \in H$에 대해 0인지 체크하는 것은 copy constraint의 [[(Extended) Polynomial Protocol For Identifying Permutations |permutation check]] (a) 조건을 만족하는지 확인하는 것에 해당한다. $f_2(X)$를 논의할 때 이야기했듯이 $z(X)$가 $Z(X)$와 같다고 생각할 수 있기 때문이다.

따라서 몫 다항식 $t(X)$의 존재는 증명자가 증명하고 싶은 세가지 statement (Gate constraint, Copy constraint (a), Copy constraint (b))를 함축한다.

## 2. 몫 다항식 분할 및 커밋

$t(X)$의 차수는 최대 3n+5가 될 수 있는데, 우리는 SRS에 n+5개의 $w^i$만 가지고 있기 때문에 $t(X)$를 다음과 같이 세 개의 다항식으로 분할한다. $$t(X) = t'_{lo}(X) + X^{n}t'_{mid}(X) + X^{2n}t'_{hi}(X)$$
그 후 랜덤값 $b_{10}, b_{11}$을 뽑아 다음을 계산한다.
$$
\begin{aligned}
&t_{\text{lo}}(X) := t'_{\text{lo}}(X) + b_{10}X^n, \\
&t_{\text{mid}}(X) := t'_{\text{mid}}(X) - b_{10} + b_{11}X^n, \\
&t_{\text{hi}}(X) := t'_{\text{hi}}(X) - b_{11} 
\end{aligned}
$$
이 세 다항식에 대한 커밋 $([t_{lo}]_1, [t_{mid}]_1, [t_{hi}]_1)$가 라운드 3의 최종 output이 된다.