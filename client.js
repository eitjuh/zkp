// client.js
const elliptic = require('elliptic');
const crypto = require('crypto');
const fs = require('fs');
const BN = require('bn.js');

const ec = new elliptic.ec('secp256k1');

// User's password
const password = 'mysecretpassword';

// Derive a private key from the password
const passwordHash = crypto.createHash('sha256').update(password).digest();
const privateKey = ec.keyFromPrivate(passwordHash);

// Calculate the public key
const publicKey = privateKey.getPublic();

// Generate a random nonce (commitment)
const nonce = ec.genKeyPair();
const commitment = nonce.getPublic();

// Generate a challenge hash
const challenge = crypto.createHash('sha256').update(publicKey.encode('hex') + commitment.encode('hex')).digest();
const challengeBN = new BN(challenge, 16);

// Compute the response
const response = nonce.getPrivate().add(privateKey.getPrivate().mul(challengeBN)).umod(ec.curve.n);

// Log the values to be sent to the verifier
console.log('Public Key:', publicKey.encode('hex'));
console.log('Commitment:', commitment.encode('hex'));
console.log('Challenge:', challenge.toString('hex'));
console.log('Response:', response.toString('hex'));

// In a real application, send `publicKey`, `commitment`, `challenge`, and `response` to the verifier over the network
const dataToSend = {
  publicKey: publicKey.encode('hex'),
  commitment: commitment.encode('hex'),
  challenge: challenge.toString('hex'),
  response: response.toString('hex')
};

// Simulating sending data to verifier
fs.writeFileSync('data.json', JSON.stringify(dataToSend, null, 2));
