// validator.js
const elliptic = require('elliptic');
const crypto = require('crypto');
const fs = require('fs');
const BN = require('bn.js');

const ec = new elliptic.ec('secp256k1');

// Read the data from the prover
const receivedData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const { publicKey, commitment, challenge, response } = receivedData;

// Convert received hex strings to elliptic curve key objects and BN
const publicKeyPoint = ec.keyFromPublic(publicKey, 'hex').getPublic();
const commitmentPoint = ec.keyFromPublic(commitment, 'hex').getPublic();
const challengeBN = new BN(challenge, 16);
const responseBN = new BN(response, 16);

// Recompute the expected commitment point
const recomputedCommitment = ec.g.mul(responseBN).add(publicKeyPoint.mul(challengeBN).neg());

// Validate the commitment
if (commitmentPoint.eq(recomputedCommitment)) {
  console.log('Proof is valid. The client knows the password.');
} else {
  console.log('Proof is invalid. The client does not know the password.');
}
