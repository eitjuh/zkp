# Zero-Knowledge Proof Password Verification

This project demonstrates a simple implementation of a zero-knowledge proof (ZKP) system for password verification. It allows a prover (client) to prove knowledge of a password to a verifier (validator) without revealing the password itself.

## What it does

The system consists of two main components:

1. **Client (Prover)**: Generates a proof of knowledge of the password.
2. **Validator (Verifier)**: Verifies the proof without learning the password.

The client uses the password to derive a private key, then generates a commitment, challenge, and response. The validator can verify the correctness of these values without ever seeing the original password.

## Prerequisites

- Node.js (v12.0.0 or higher recommended)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Run the client to generate the proof:
   ```
   node client.js
   ```
   This will create a `data.json` file containing the proof data.

2. Run the validator to verify the proof:
   ```
   node validator.js
   ```
   The validator will read the `data.json` file and output whether the proof is valid or not.

## Files

- `client.js`: Implements the prover's side of the ZKP system.
- `validator.js`: Implements the verifier's side of the ZKP system.
- `data.json`: Intermediate file used to pass data from the client to the validator.

## Security Note

This is a simplified implementation for educational purposes and should not be used in production environments without further security measures and peer review.

## License

This project is licensed under the ISC License. See the `package.json` file for details.