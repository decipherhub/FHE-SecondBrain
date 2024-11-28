# Secure Multi-Party Computation (MPC)

## Definition

Secure multi-party computation(MPC) is a technology that enables multiple participants to collaborate and perform specific tasks without revealing their individual data. In the process, the privacy of their inputs and the correctness of the output are guaranteed. This allows tasks to be performed without exposing private information and without the need for  a trusted third party. 

<img width="331" alt="1" src="https://github.com/user-attachments/assets/43801111-b635-49c0-820b-684cc2828aff">


## Introduction

In other words, MPC is a technology that enables multiple parties to collaboratively perform a computation without exposing their private information. This allows each participant to obtain a set calculation result together without revealing their data to others. The participants agree on a particular task or computation to perform, and then cooperate using the MPC protocol to obtain the result. By using encryption and secret sharing, privacy and security can be ensured during the computation process.

### Advanced Explanation

SMPC uses cryptographic primitives like secret sharing (e.g. Shamir), homomorphic encryption (e.g. Paillier, ElGamal), and zero-knowledge proofs (e.g., zk-SNARKs, zk-STARKs) to enable a given number (n) of participants each with private data $(d_1, d_2, \ldots, d_n)$ to compute a public function $F(d_1, d_2, \ldots, d_n)$ on that data, without knowing information about the inputs of other participants.


**Example 1:**

We can think of a sample use case of managing the private keys of an Ethereum account:

- A set of participants is each given a segment of the secret key.

- Using an MPC protocol, they can input their segments and run the protocol to execute the signature function.

This method means that no single participant can sign a transaction their own. To signature, all or a sufficient number of participants must each input their secret key segments, and no participant has enough information to reconstruct the secret key.


**Example 2:**

![ex2](https://github.com/user-attachments/assets/6cbeea4d-ed95-4071-a775-98b5af799196)

Let's assume that three colleagues—Alice, Bob, and Cynthia—want to know their average hourly wage but don’t want to share their own salary with each other.

- **Step 1**: Split their hourly wage into four amounts.
- **Step 2**: Keep one of these amounts and share one with each other and a trusted third party.
- **Step 3**: Each participant calculates the average of the received numbers.
- **Step 4**: Share and sum the averages to provide the average hourly wage. This way, everyone knows the average, but no one knows each other's individual hourly wage.

This example uses a relatively simple additive secret-sharing technique, but a more advanced mathematical [example](https://eprint.iacr.org/2017/1234.pdf) can also be explored.


**Example 3:**

![ex3](https://github.com/user-attachments/assets/6e6b3e50-0018-44d5-b7a0-d342fd29f857)

- Four parties hold the data needed to compute the common function F using their respective private data (A, B, C, D).
[party 0 (holding data A), party 1 (holding data B), party 2 (holding data C), and party 3 (holding data D)]
- For example, party 0 splits private data A into random shares a0, a1, a2, and a3.
- The shares are distributed to party 0, party 1, party 2, and party 3, respectively.
- Each party receives the random shares of all parties and uses them to compute the local function G.
- The results(= local outputs) computed by each party are combined with the computational results of other parties to obtain the final answer to the function F(A, B, C, D).

No party can determine another party's private data using the random shares received from others. In addition, each party can obtain the correct result, ensuring data integrity during the computation process.



## Use Cases
One of the primary applications of MPC is the secure aggregation of data from different data owners. For example, when multiple organizations need to perform joint data analysis or derive insights from various datasets, MPC can be used to ensure that each party's data remains private throughout the process. This is particularly useful in scenarios where data privacy is crucial, such as healthcare, finance, and collaborative research. By using MPC, organizations can collaborate and derive valuable insights without compromising data privacy and security.

**Privacy-Preserving Machine Learning**

Privacy can be enhanced during the machine learning training and inference phases. Multiple parties can collaboratively train a model without disclosing their individual datasets. In the inference phases, clients can receive model outputs without exposing their input data or the server’s model.

**Threshold Cryptography**

Companies can enhance key protection by distributing key shares across multiple secure environments. This reduces the risk of key compromise, as no single location holds the entire private key. An adversary would need to breach all environments to access the complete key, thereby enhancing security.

**Collaborative Data Analysis**

Multiple parties can combine and analyze datasets without disclosing their private information. This enables data analysis while preserving privacy and maintaining confidentiality.



## Advantages
1. **Privacy Assurance:** MPC ensures that sensitive data remains private, with computations carried out without exposing individual inputs.
2. **Data Security:** As data is not exposed in plaintext, it helps prevent data breaches and leaks.
3. **Regulatory Compliance:** MPC aids in complying with data protection regulations, ensuring that sensitive data is not shared or exposed.
4. **Collaborative Analysis:** Multiple entities can collaborate on data analysis projects without compromising their proprietary data.



## Protocol Scope

The MPC protocol can be classified into two main categories based on the functions they are designed to perform.

#### Specialized Protocols

These are designed and optimized for specific functionality and are built around a specific task, such as Private Set Intersection(PSI) or voting. By leveraging the specific structure of the function, these protocols can provide significant performance improvements.

#### Generic Protocols

These protocols can compute any function that can be represented as a fixed-size circuit. An example is Yao’s Garbled Circuits protocol, which can be applied to a wide range of problems.


## Secure Protocol Requirements

We can use the following properties to help us define an ideal secure protocol:

- **Privacy:** No party should learn anything more than the function output.
- **Correctness:** Each party is guaranteed to receive the correct output.
- **Independence of Inputs:** Every party can decide its input independently of other parties.
- **Guaranteed Output Delivery:** No party can prevent other parties from receiving the function output.
- **Fairness:** If one party receives the function output, every party will receive the output.

These conditions guarantee the correctness of the output and ensure that no party can disrupt the process or gain an unfair advantage.

#### Input Integrity

In MPC, participants can input any value, which means they could potentially influence the result by providing incorrect inputs (manipulating the process). To mitigate this, mechanisms like requiring signed inputs verified can be used, though this can increase computational costs.

#### Result Information

The outcome could reveal information about the inputs or participants.
<br/><br/>
Therefore, additional measures are needed to ensure input integrity and protect the output from giving away information.


## SMPC For Web3

#### MPC-Based Web3 Wallets

![w1](https://github.com/user-attachments/assets/d8ccbce7-cf2d-40ad-83d3-719ec1294acf)

In an MPC-compatible blockchain environment, the private keys of a Web3 wallet can be divided(sharded) among multiple parties. To execute any function, a minimum number of participants holding key shards must collaborate, thereby enhancing the security and control of wallet operations.

For example, custodians use MPC-based Web3 wallets to secure digital assets and sign transactions. They split the private key into multiple parts and use MPC to sign transactions.


#### MPC vs. Multisig Wallets

![m2](https://github.com/user-attachments/assets/220ab54d-1484-4619-9e42-fdf71bd094d6)

Similar to the multi-signature signing process, MPC can play a key role in enabling multiple entities to jointly secure tokenized assets.

- **Multi-sig wallet**: Relies on multiple private keys to sign transactions.
- **MPC wallet**: Splits a single key into multiple parts and distributes them among custodians.
