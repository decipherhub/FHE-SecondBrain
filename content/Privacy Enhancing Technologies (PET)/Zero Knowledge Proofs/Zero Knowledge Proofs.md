## What is Zero-Knowledge Proof?

영지식증명(Zero-Knowledge Proof)이란 특정 명제가 참/거짓이라는 사실을 증명할 때, 어떠한 정보도 노출하지 않고 그 명제를 증명하는 방법이다.

다음 예시는 Alice가 Bob에게 자신의 두 개의 공의 색이 다르다는 것을 ZKP를 통해 증명하는 과정이다.
![[zkp(1).png]]
Alice는 빨간색과 초록색의 공을 가지고있지만 Bob은 적록색맹이라 두 공의 색을 구분하지 못한다. 이때, Alice는 두 공의 색깔 정보를 밥에게 노출시키지 않고 오직 “두 공의 색이 다르다”라는 명제만 증명하려고 한다.![[zkp(2).png]]
Bob은 빨간색공과 초록색공을 각각 오른손과 왼손에 들고 Alice가 볼 수 없는 방으로 가지고 들어가서, 그 공의 위치를 바꾼다.

![[zkp(3).png]]

그리고 Bob은 Alice에게 두 공의 위치가 바뀌었는지 물어본다. 그러면 Alice는 공의 색이 서로 달라져있으므로 쉽게 바뀌었다고 답할 수 있다. 그러나 Bob의 입장에서는 여전히 Alice가 의심스러울 수 있다. 왜냐하면 Bob은 공의 위치를 바꾸든지 안바꾸든지 두가지의 경우밖에 없기 때문에, Alice가 공의 위치가 바뀌었는지 맞출 수 있는 확률은 50%이기 때문이다.

그런데 Bob이 이러한 시행을 10번을 시행하면 Alice가 10번 모두 맞출확률은 $1/2^{10}$로 0.1% 이하의 확률로 줄어들게된다. 20번정도만 시행해도 그것을 모두 맞추는 확률은 백만분의 일 이하로, 사실상 거의 불가능하다고 할 수 있다. 이런 방식으로 Alice는 Bob에게 두 공의 색깔을 알리지 않고 자신이 가진 두개의 공이 서로 다른 색깔이라는 사실을 증명할 수 있다.

>용어정리 
>- Secrete: 노출되지않아야하는 정보(공의 색깔정보: 초록, 빨강) 
>- Prover: Secrete을 알고있다고 증명하려는 사람(Alice)
>- Verifier: Prover가 Secrete을 알고있는지 확인하려는 사람(Bob) 
>- Challenge: Prover가 Secrete을 알고있는지 검증하기 위해 Verifier가 내는 문제(공 바꾸기)

## Needs of the SNARK

90년대에 성능이 느린 개인 컴퓨터 대신 성능이 좋은 슈퍼컴퓨터가 연산을 처리하도록 위임해야했는데, 이때 슈퍼컴퓨터가 올바른 연산을 수행했는지 검증하기 위해 proof system에 대한 필요성이 언급되었다. 하지만 개인 컴퓨터 능력의 향상으로 인해 연산을 위임할 필요성이 없어졌다.

현재 다시 proving system이 주목받는 이유는 이더리움 L1과같은 연산이 느린 네트워크의 연산을 unreliable한 GPU에 연산을 위임할 때 해당 연산의 유효성을 판단하기 위함이다.

이때 데이터의 익명성을 보장하는 것을 ZKness 라고 하고, 빠르고 효율적으로 검증할 수 있는 성질을 Succinct라고 한다.

zkSNARK use cases

- Scalability: Outsourcing computation → 여러 트렌젝션들을 오프체인에서 연산한 결과를 succinct한 proof로 전달하면 L1은 해당 proof를 검증하는 것으로 비용을 줄일 수 있다.(zkRollup)
- Privacy: Private transactions on public blockchain(Tornado cash, Zcash, Iron Fish, Aleo)
- Compliance: Espresso, Raposa

## 영지식증명의 활용

영지식증명은 여러 분야에서 사용할 수 있지만 현재 가장 활발하게 활용되는 분야는 블록체인이고 그 중에서 블록체인에서의 Privacy, 그리고 그것들의 Scaling에 많이 사용되고 있다.

영지식증명을 Privacy에 적용하는 예시로는 Membership proof가 있는데, Merkle Tree에 등록되어있는 멤버를 leaf node의 정보를 제공하지 않고 해당 머클트리의 멤버임을 증명할 수 있다. 가장 대표적인 프로토콜로는 Semaphore가 있고 Merkle proof를 이용해 private transaction을 할 수 있는 Zcash 등이 있다.

한편, Scaling에 영지식증명을 활용하는 대표적인 예로는 Rollup이 있다. 예를들어 ECDSA로 서명을 하는 블록체인에 zk-Rollup을 사용하면 일일히 서명을 검증할 필요 없이 블록단위로 한번에 검증이 가능하기 때문에 컴퓨팅 자원이 훨씬 적게 소모되고 연산도 빨라진다.

이러한 방식으로 영지식증명을 활용해 여러 분야, 특히 블록체인에서 프라이버시를 더욱 안전하게 지키고 스케일업을 할 수 있다.

### Index
- [[ZK-SNARK]]
- [[Quadratic Arithmetic Program]]
- [[Polynomial theorem]]
- [[KZG commitment]]
- [[Pinocchio protocol]]
- [[Groth16]]
- [[zkEVM]]