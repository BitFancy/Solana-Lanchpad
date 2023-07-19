import { randomBytes } from 'crypto';
import { enc, SHA256 } from 'crypto-js';

export function generateCodeVerifier() {
  const codeVerifier = randomBytes(32).toString('base64').replace(/[^a-zA-Z0-9]+/g, '').slice(0, 43);
  return codeVerifier;
}

export function generateCodeChallenge(codeVerifier) {
  const hash = SHA256(codeVerifier).toString(enc.Base64);
  const codeChallenge = hash.replace(/[^a-zA-Z0-9_-]/g, '').replace(/=+$/, '');
  return codeChallenge;
}
