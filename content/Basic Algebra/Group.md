# Group

Given a [[Binary Operation]] $*$ : $G \times G \rightarrow G$ on a set $G$, the pair $(G, *)$ is defined as a group if it satisfies the following conditions:

1.  $*$ is associative.
2.  There exists an identity element $e \in G$.
3.  For each element $a \in G$, there exists an inverse element $a^{-1} \in G$.

### Example

- $GL_{2}(\mathbb{R})$ is the set of all invertible 2×2 matrices, and with matrix multiplication, it forms a group.

<br/>

**Additional Information**

- Commutativity: For $ \forall a, b \in G$, $a * b = b * a$
- Associativity: For $ \forall a, b, c \in G$, $(a * b) * c = a * (b * c)$
- Identity: $\exists e \in G$ s.t. $\forall a in G$, $a * e = e * a = a$
- Inverse: For $\forall a in G$, $\exists a^{-1} \in G$ s.t. $a * a^{-1} = a^{-1} * a = e

<br/>

# Abelian Group

A group $G$ under $*$ is an abelian group if $*$ is commutative.

### Example

- $(\mathbb{R}, +)$ is an abelian group.
- $(\mathbb{R}^*, \cdot)$ is an abelian group. ($\mathbb{R}^* = \mathbb{R} \ {0}$)
- $(\mathbb{R}, \cdot)$ is **NOT** a group. Because there is no inverse to 0.
- $(\mathbb{N}, +)$ is **NOT** a group. Because there is no identity and inverse.