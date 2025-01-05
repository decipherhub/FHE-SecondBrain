
## Intro
DES is a symmetric key block cipher that uses the same key for both encryption and decryption, processing data in fixed-size blocks.
> [!note]
> DES encrypts 64-bit plaintext using a 56-bit key to produce a 64-bit ciphertext.

## History
In 1973, the National Bureau of Standards (NBS) in the United States recognized the need for a standardized encryption method and called for proposals for what would become the DES (Data Encryption Standard). In 1977, NBS selected a modified version of an encryption algorithm called Lucifer, developed by IBM, to become DES.
The National Security Agency (NSA) made modifications to Lucifer, including reducing the key length from 128 bits to 56 bits and altering the structure of the S-Box. This led to speculation that the U.S. intelligence agencies could more easily decrypt messages encrypted with DES. Despite these suspicions, DES went on to become the most widely used block cipher worldwide for 30 years after its publication.
When DES was first introduced in the 1970s, a 56-bit key length provided adequate security. However, with advancements in computing, DES is no longer considered secure. In the late 1990s, distributed.net and the EFF DES cracker (Deep Crack) successfully demonstrated how feasible it was to brute-force DES keys, highlighting the vulnerability of the 56-bit key length. The EFF built Deep Crack, which was capable of breaking DES encryption in less than a day. These demonstrations underscored that DES was no longer suitable for secure communication.
To address these limitations, multiple DES techniques were introduced, notably Triple DES (3DES), which applies DES three times and provides 112 bits of security, making it more robust.
In 2005, NIST officially retired simple DES. Triple DES was also deprecated in 2019, and its usage was prohibited by the end of 2023, except for processing already encrypted data. Today, DES has been replaced by the more secure and powerful [[AES]].

## Design
High-level description of DES is as following:

1. Initial Permutation (IP)
2. 16 Rounds of Feistel function and Swap
	* Feistel Function
		* Expansion P-Box
		* XOR with Round Key
		* S-Box Substitution
		* P-Box Permutation
	* Swap
3. Inverse Initial Permutation (IP⁻¹)
4. Key Scheduling
	* Parity Bit Drop (PC-1)
	* Shift
	* Compression P-Box (PC-2)

### Initial Permutation (IP)
The first step applied when 64-bit plaintext is input is the **Initial Permutation (IP)**, where the bits are rearranged based on a predefined permutation.

| IP  |     |     |     |     |     |     |     |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 58  | 50  | 42  | 34  | 26  | 18  | 10  |  2  |
| 60  | 52  | 44  | 36  | 28  | 20  | 12  |  4  |
| 62  | 54  | 46  | 38  | 30  | 22  | 14  |  6  |
| 64  | 56  | 48  | 40  | 32  | 24  | 16  |  8  |
| 57  | 49  | 41  | 33  | 25  | 17  |  9  |  1  |
| 59  | 51  | 43  | 35  | 27  | 19  | 11  |  3  |
| 61  | 53  | 45  | 37  | 29  | 21  | 13  |  5  |
| 63  | 55  | 47  | 39  | 31  | 23  | 15  |  7  |

The permuted input takes bit 58 of the original input as its first bit, bit 50 as its second bit, and continues in this manner, ending with bit 7 as its final bit. This permuted block then serves as the input to a key-dependent computation, which is described below.

### 16 Rounds of Feistel function and Swap
DES consists of a total of 16 rounds, each divided into two stages: the **Mixer** stage and the **Swapper** stage.

1. **Mixer Stage**: In this stage, the 32-bit right half and the round key are used to calculate the F function value, which is then XORed with the 32-bit left half. This can be represented by the following formula: $$ R_i = L_{i-1} \oplus F(R_{i-1}, k_i) $$
2. **Swapper Stage**: In the swapper stage, the value computed from the XOR operation is placed on the right, while the original 32-bit right half is moved to the left. This can be expressed as: $$ L_i = R_{i-1} $$
Thus, the i-th round can be represented as follows.
$$ L_i = R_{i-1} $$
$$ R_i = L_{i-1} \oplus F(R_{i-1}, k_i) $$

#### Feistel function
##### Expansion P-Box
The **Expansion P-Box** is a process that permutes the order of the bits of a 32-bit input value while expanding the output to 48 bits.
The method for expanding the input value is as follows:
![[DES(1).png]]
1. Divide the 32-bit input value into 8 parts, each consisting of 4 bits.
2. Expand each 4-bit part to 6 bits according to predefined rules.

##### XOR with Round Key
After the 32-bit input value is expanded to 48 bits, it is XORed with a 48-bit round key.
The 16 round keys are generated from the 56-bit secret key of DES, which is explained in detail in the [[#Key Scheduling]] section.

##### S-Box Substitution
The 48-bit output value from the XOR operation is reduced to 32 bits using substitution tables. In DES, these substitution tables are called **S-Boxes**, and their operation is as follows:
1. Divide the 48-bit input value into 8 parts, each consisting of 6 bits.
2. Feed each 6-bit segment into one of the 8 S-Boxes in sequence.
3. Each S-Box takes a 6-bit input and produces a 4-bit output.

| S-Box 1 |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  |
| :-----: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|    0    | 14  | 04  | 13  | 01  | 02  | 15  | 11  | 08  | 03  | 10  | 06  | 12  | 05  | 09  | 00  | 07  |
|    1    | 00  | 15  | 07  | 04  | 14  | 02  | 13  | 10  | 03  | 06  | 12  | 11  | 09  | 05  | 03  | 08  |
|    2    | 04  | 01  | 14  | 08  | 13  | 06  | 02  | 11  | 15  | 12  | 09  | 07  | 03  | 10  | 05  | 00  |
|    3    | 15  | 12  | 08  | 02  | 04  | 09  | 01  | 07  | 05  | 11  | 03  | 14  | 10  | 00  | 06  | 13  |

| S-Box 2 | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0       | 15  | 1   | 8   | 14  | 6   | 11  | 3   | 4   | 9   | 7   | 2   | 13  | 12  | 0   | 5   | 10  |
| 1       | 3   | 13  | 4   | 7   | 15  | 2   | 8   | 14  | 12  | 0   | 1   | 10  | 6   | 9   | 11  | 5   |
| 2       | 0   | 14  | 7   | 11  | 10  | 4   | 13  | 1   | 5   | 8   | 12  | 6   | 9   | 3   | 2   | 15  |
| 3       | 13  | 8   | 10  | 1   | 3   | 15  | 4   | 2   | 11  | 6   | 7   | 12  | 0   | 5   | 14  | 9   |

|S-Box 3|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|10|0|9|14|6|3|15|5|1|13|12|7|11|4|2|8|
|1|13|7|0|9|3|4|6|10|2|8|5|14|12|11|15|1|
|2|13|6|4|9|8|15|3|0|11|1|2|12|5|10|14|7|
|3|1|10|13|0|6|9|8|7|4|15|14|3|11|5|2|12|

|S-Box 4|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|7|13|14|3|0|6|9|10|1|2|8|5|11|12|4|15|
|1|13|8|11|5|6|15|0|3|4|7|2|12|1|10|14|9|
|2|10|6|9|0|12|11|7|13|15|1|3|14|5|2|8|4|
|3|3|15|0|6|10|1|13|8|9|4|5|11|12|7|2|14|

|S-Box 5|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|2|12|4|1|7|10|11|6|8|5|3|15|13|0|14|9|
|1|14|11|2|12|4|7|13|1|5|0|15|10|3|9|8|6|
|2|4|2|1|11|10|13|7|8|15|9|12|5|6|3|0|14|
|3|11|8|12|7|1|14|2|13|6|15|0|9|10|4|5|3|

|S-Box 6|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|12|1|10|15|9|2|6|8|0|13|3|4|14|7|5|11|
|1|10|15|4|2|7|12|9|5|6|1|13|14|0|11|3|8|
|2|9|14|15|5|2|8|12|3|7|0|4|10|1|13|11|6|
|3|4|3|2|12|9|5|15|10|11|14|1|7|6|0|8|13|

|S-Box 7|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|4|11|2|14|15|0|8|13|3|12|9|7|5|10|6|1|
|1|13|0|11|7|4|9|1|10|14|3|5|12|2|15|8|6|
|2|1|4|11|13|12|3|7|14|10|15|6|8|0|5|9|2|
|3|6|11|13|8|1|4|10|7|9|5|0|15|14|2|3|12|

|S-Box 8|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|13|2|8|4|6|15|11|1|10|9|3|14|5|0|12|7|
|1|1|15|13|8|10|3|7|4|12|5|6|11|0|14|9|2|
|2|7|11|4|1|9|12|14|2|0|6|10|13|15|3|5|8|
|3|2|1|14|7|4|10|8|13|15|12|9|0|3|5|6|11|

The **S-Box** is the only nonlinear component in DES that provides confusion. The rule for substituting the 6-bit input value into a 4-bit output is as follows:
1. The first and sixth bits of the 6-bit input are concatenated to determine the row. These two bits form a binary value of 00, 01, 10, or 11, corresponding to a decimal value between 0 and 3 to select the row.
2. The remaining 4 bits determine the column, forming a decimal value between 0 and 15 to select the column.

##### P-Box Permutation
After the [[#S-Box Substitution]], the resulting 32-bit output value is permuted using the **P-Box**.

| P-Box |     |     |     |     |     |     |     |
| :---: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  16   | 07  | 20  | 21  | 29  | 12  | 28  | 17  |
|  01   | 15  | 23  | 26  | 05  | 18  | 31  | 10  |
|  02   | 08  | 24  | 14  | 32  | 27  | 03  | 09  |
|  19   | 13  | 30  | 06  | 22  | 11  | 04  | 25  |

### Inverse Initial Permutation (IP⁻¹)
Also known as the **Final Permutation**, this is the final step in the DES encryption process. It is the inverse of the [[#Initial Permutation (IP)]], meaning that it restores the positions of the bits that were rearranged during the initial permutation back to their original order.

| IP⁻¹ |     |     |     |     |     |     |     |
| :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  40  | 08  | 48  | 16  | 56  | 24  | 64  | 32  |
|  39  | 07  | 47  | 15  | 55  | 23  | 63  | 31  |
|  38  | 06  | 46  | 14  | 54  | 22  | 62  | 30  |
|  37  | 05  | 45  | 13  | 53  | 21  | 61  | 29  |
|  36  | 04  | 44  | 12  | 52  | 20  | 60  | 28  |
|  35  | 03  | 43  | 11  | 51  | 19  | 59  | 27  |
|  34  | 02  | 42  | 10  | 50  | 18  | 58  | 26  |
|  33  | 01  | 41  | 09  | 49  | 17  | 57  | 25  |
> [!note]
> The **Initial Permutation (IP)** and **Inverse Initial Permutation (IP⁻¹)** are inverses of each other, both taking a 64-bit input and producing a 64-bit output.

### Key Scheduling
The **Key Scheduling** process takes a 64-bit input value and generates 16 round keys, each 48 bits in length.

#### Parity Bit Drop (PC-1)
The secret key for DES is input as a 64-bit value, but the bits at positions 8, 16, 24, etc., are parity bits (specifically, **odd parity bits** for the remaining 7 bits) and are not part of the actual DES key. (Thus, DES uses a 56-bit key, not a 64-bit one!)
In the first step of key scheduling, these parity bits are removed, and the remaining 56 bits are permuted to generate the output value.
The **Parity Bit Drop Table (PC-1)** is as follows:

| 57  | 49  | 41  | 33  | 25  | 17  | 09  | 01  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 58  | 50  | 42  | 34  | 26  | 18  | 10  | 02  |
| 59  | 51  | 43  | 35  | 27  | 19  | 11  | 03  |
| 60  | 52  | 44  | 36  | 63  | 55  | 47  | 39  |
| 31  | 23  | 15  | 07  | 62  | 54  | 46  | 38  |
| 30  | 22  | 14  | 06  | 61  | 53  | 45  | 37  |
| 29  | 21  | 13  | 05  | 28  | 20  | 12  | 04  |

#### Shift
The **Shift** step divides the 56-bit input into a **left 28-bit part** and a **right 28-bit part**, and then **cyclically shifts** each 28-bit part to the left by 1 or 2 bits. In rounds 1, 2, 9, and 16, a 1-bit shift is performed, while in all other rounds, a 2-bit shift is used, as shown in the table below.

| Round  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  | 16  |
| :----: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Shifts |  1  |  1  |  2  |  2  |  2  |  2  |  2  |  2  |  1  |  2  |  2  |  2  |  2  |  2  |  2  |  1  |

#### Compression P-Box (PC-2)
The **Compression P-Box (PC-2)** step takes a 56-bit input value and reduces it to a 48-bit output.

| 14  | 17  | 11  | 24  | 01  | 05  | 03  | 28  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 15  | 06  | 21  | 10  | 23  | 19  | 12  | 04  |
| 26  | 08  | 16  | 07  | 27  | 20  | 13  | 02  |
| 41  | 52  | 31  | 37  | 47  | 55  | 30  | 40  |
| 51  | 45  | 33  | 48  | 44  | 49  | 39  | 56  |
| 34  | 53  | 46  | 42  | 50  | 36  | 29  | 32  |
