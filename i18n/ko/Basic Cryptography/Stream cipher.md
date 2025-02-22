## 소개

스트림 암호는 평문의 각 비트나 바이트를 키 스트림의 해당 비트나 바이트를 사용하여 순차적으로 하나씩 암호화하는 방법입니다. 이러한 접근 방식은 고정 크기의 데이터 블록을 암호화하는 [[Block cipher]]와는 다릅니다. 스트림 암호는 고속 암호화가 필요하고 데이터가 연속적인 스트림으로 전송되는 시나리오에서 자주 사용됩니다.

## 설계

![[stream_cipher(1).png]]

TODO(yuki)

## 스트림 암호의 유형

### 동기식 스트림 암호 (Synchronous Stream Ciphers)

동기식 스트림 암호에서는 키 스트림이 평문과 암호문과 독립적으로 생성됩니다. 키 스트림(의사 난수 열)을 생성하기 위한 내부 상태를 유지하며 새로운 내부 상태를 생성하는 데 사용됩니다. 

평문을 올바르게 복호화하려면 송신자와 수신자가 암호화 및 복호화 시 키 스트림이 일치하도록 동기화되어야 합니다. 전송 오류로 인해 비트가 손실되거나 잘못된 비트가 추가되면, 그 시점부터 복호화가 실패하며 재동기화가 필요합니다.

### 비동기식 스트림 암호 (Asynchronous Stream Ciphers)

비동기식 스트림 암호에서는 키 스트림이 이전 내부 상태가 아닌 이전 암호문 비트를 기반으로 생성됩니다. 따라서 전송 중 비트가 변경되거나 손실되면 복호화의 일부만 실패하게 됩니다. 

## [[Block cipher]]와의 비교

[[Block cipher#Comparison with Stream cipher]]을 참조하세요.