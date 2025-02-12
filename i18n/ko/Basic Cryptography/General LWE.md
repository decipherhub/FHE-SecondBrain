## GLWE: general LWE - Secret Key Encryption

LWE와 RLWE을 일반화한 종류의 암호문이다. 

1. secret key generation :
    $\vec{S}=(S_0,\dots, S_{k-1})\in \mathcal{R}^k \\ \text{where R: uniform binary distribution}$

2. encryption :
    $q,p: \text{positive integers}\\ q: \text{ciphertext modulus}\\p: \text{plaintext modulus}\\ \Delta(=q/p): \text{scaling factor}$  <br>
    - $(A_0, \dots, A_{k-1},B)\in GLWE_{S,\sigma}(\Delta M)\subseteq \mathcal{R}_q^{k+1}\\A_i: \text{sampled uniformly random from Rq}\\$
    - $B = \sum_{i=0}^{k-1} A_i \cdot S_i + \Delta M + E \in \mathcal{R}_q \\(R_q: \text{coefficients sampled from gaussian distribution } \chi_\sigma)$ <br>
    A 부분은 주로 mask, B 부분은 body라고 불린다. 다항식 $\Delta M$은 message M의 encoding으로도 불린다.<br>
    최종적으로 secret key $\vec{S}=(S_0,\dots, S_{k-1})\in \mathcal{R}^k$ 하에서 encrypt된 cipher text  $(A_0, \dots, A_{k-1},B)\in GLWE_{S,\sigma}(\Delta M)\subseteq \mathcal{R}_q^{k+1}$를 얻을 수 있다. 
    <br>
3. Decryption :
    - $B - \sum_{i=0}^{k-1} A_i \cdot S_i = \Delta M + E \in \mathcal{R}_q$
    - $M = \left\lfloor \frac{\Delta M + E}{\Delta} \right\rfloor.$<br>
    message M은 $\Delta$와 곱해지며 $\Delta M + E$의 MSB부분에, E는 LSB 부분에 생성됨을 확인할 수 있으며, $\left|E\right|<\Delta/2 $라면 decryption을 통한 원본 message의 복원이 가능하다. 
