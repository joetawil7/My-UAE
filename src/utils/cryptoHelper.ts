/* eslint-disable new-cap */
/* eslint-disable no-bitwise */
import * as elliptic from 'elliptic';
import * as Crypto from 'expo-crypto';
import * as aesjs from 'aes-js';
import jsSHA from 'jssha';

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = global.Buffer || require('buffer').Buffer;

const ec: elliptic.ec = new elliptic.ec('secp256k1');

const generateKeyPair = (): { publicKey: string; privateKey: string } => {
  const randomness = Crypto.getRandomBytes(32);
  const keyPair = ec.keyFromPrivate(randomness);
  const privateKey = keyPair.getPrivate('hex');
  const publicKey = keyPair.getPublic().encodeCompressed('hex');

  return { privateKey, publicKey };
};

const encryptMessage = (
  privateKeySender: string,
  publicKeyRecipient: string,
  message: string
): string => {
  const privateKeyBuffer = Buffer.from(privateKeySender, 'hex');
  const publicKeyBuffer = Buffer.from(publicKeyRecipient, 'hex');
  const sharedKey = getSharedKey(privateKeyBuffer, publicKeyBuffer);
  const encryptedMessage = encrypt(sharedKey.publicKey, Buffer.from(message));
  return encryptedMessage.toString('hex');
};

const decryptMessage = (
  privateKeyRecipient: string,
  publicKeySender: string,
  encryptedMessage: string
): string => {
  const privateKeyBuffer = Buffer.from(privateKeyRecipient, 'hex');
  const publicKeyBuffer = Buffer.from(publicKeySender, 'hex');

  const sharedKey = getSharedKey(privateKeyBuffer, publicKeyBuffer);

  const decryptedMessage = decrypt(
    sharedKey.privateKey,
    Buffer.from(encryptedMessage, 'hex')
  );

  const decryptedText = utf8FromBytes(decryptedMessage);
  return decryptedText;
};

const getSharedKey = (
  privateKeySender: Buffer,
  publicKeyRecipient: Buffer
): { privateKey: Buffer; publicKey: Buffer } => {
  const sharedSecret = deriveSharedSecret(privateKeySender, publicKeyRecipient);
  const sharedPrivateKey = kdf(sharedSecret, 32);
  const sharedPublicKey = Buffer.from(
    ec.keyFromPrivate(sharedPrivateKey).getPublic('array')
  );
  return { privateKey: sharedPrivateKey, publicKey: sharedPublicKey };
};

const deriveSharedSecret = (privateKey: Buffer, publicKey: Buffer): Buffer => {
  const keyA = ec.keyFromPrivate(privateKey);
  const keyB = ec.keyFromPublic(publicKey);
  const sharedSecret = keyA.derive(keyB.getPublic());

  return Buffer.from(sharedSecret.toArray());
};

const kdf = (secret: Buffer, outputLength: number): Buffer => {
  let ctr = 1;
  let written = 0;
  let result = Buffer.from('');
  while (written < outputLength) {
    const ctrs = Buffer.from([ctr >> 24, ctr >> 16, ctr >> 8, ctr]);
    const hashResult = hashSHA256(Buffer.concat([ctrs, secret]));
    result = Buffer.concat([result, hashResult]);
    written += 32;
    ctr += 1;
  }
  return result;
};

const encrypt = (publicKeyTo: Buffer, msg: Buffer) => {
  const ephemeralPrivateKey = Buffer.from(Crypto.getRandomBytes(32));
  const ephemeralPublicKey = Buffer.from(
    ec.keyFromPrivate(ephemeralPrivateKey).getPublic('array')
  );

  const sharedPx = deriveSharedSecret(ephemeralPrivateKey, publicKeyTo);

  const hash = kdf(sharedPx, 64);
  const iv = Buffer.from(Crypto.getRandomBytes(16));
  const encryptionKey = Buffer.from(hash.subarray(0, 32));

  const macKey = hashSHA256(Buffer.from(hash.subarray(32, 64)));

  const cipherText = aesCtrEncrypt(encryptionKey, iv, msg);

  const dataToMac = Buffer.from([...iv, ...cipherText]);
  const HMAC = hmacSha256S(macKey, dataToMac);

  return Buffer.from([...ephemeralPublicKey, ...iv, ...cipherText, ...HMAC]);
};

const hashSHA256 = (data: Buffer): Buffer => {
  const shaObj = new jsSHA('SHA-256', 'ARRAYBUFFER');
  shaObj.update(data);
  const hashResult = Buffer.from(shaObj.getHash('UINT8ARRAY'));
  return hashResult;
};

const hmacSha256S = (key: Buffer, msg: Buffer): Buffer => {
  const shaObj = new jsSHA('SHA-256', 'ARRAYBUFFER', {
    hmacKey: { value: key, format: 'UINT8ARRAY' },
  });
  shaObj.update(msg);
  const hmac = shaObj.getHash('UINT8ARRAY');
  return Buffer.from(hmac);
};

const aesCtrEncrypt = (key: Buffer, counter: Buffer, data: Buffer) => {
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
  const encryptedBytes = aesCtr.encrypt(data);

  return encryptedBytes;
};

const aesCtrDecrypt = (key: Buffer, counter: Buffer, data: Buffer): Buffer => {
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
  const decryptedBytes = aesCtr.decrypt(data);
  return Buffer.from(decryptedBytes);
};

const decrypt = (privateKey: Buffer, encrypted: Buffer) => {
  const metaLength = 1 + 64 + 16 + 32;
  if (encrypted.length <= metaLength) {
    throw new Error('Invalid cipher text. Data is too small');
  }

  if (!(encrypted[0] >= 2 && encrypted[0] <= 4)) {
    throw new Error('Not valid cipher text.');
  }

  const ephemeralPublicKey = Buffer.from(encrypted.subarray(0, 65));
  const cipherTextLength = encrypted.length - metaLength;
  const iv = Buffer.from(encrypted.subarray(65, 65 + 16));
  const cipherAndIv = Buffer.from(
    encrypted.subarray(65, 65 + 16 + cipherTextLength)
  );
  const cipherText = Buffer.from(cipherAndIv.subarray(16));
  const msgMac = Buffer.from(encrypted.subarray(65 + 16 + cipherTextLength));

  const px = deriveSharedSecret(privateKey, ephemeralPublicKey);
  const hash = kdf(px, 64);
  const encryptionKey = Buffer.from(hash.subarray(0, 32));
  const macKey = hashSHA256(Buffer.from(hash.subarray(32, 64)));
  const dataToMac = Buffer.from(cipherAndIv);
  const hmacGood = hmacSha256S(macKey, dataToMac);

  if (!hmacGood.equals(msgMac)) {
    throw new Error('Incorrect MAC');
  }

  return aesCtrDecrypt(encryptionKey, iv, cipherText);
};

const utf8FromBytes = (utf8Bytes: Buffer) => {
  let unicodeStr = '';
  for (let pos = 0; pos < utf8Bytes.length; ) {
    const flag = utf8Bytes[pos];
    let unicode = 0;
    if (flag >>> 7 === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    } else if ((flag & 0xfc) === 0xfc) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 5] & 0x3f;
      unicodeStr += String.fromCodePoint(unicode);
      pos += 6;
    } else if ((flag & 0xf8) === 0xf8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 4] & 0x3f;
      unicodeStr += String.fromCodePoint(unicode);
      pos += 5;
    } else if ((flag & 0xf0) === 0xf0) {
      unicode = (utf8Bytes[pos] & 0xf) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 3] & 0x3f;
      unicodeStr += String.fromCodePoint(unicode);
      pos += 4;
    } else if ((flag & 0xe0) === 0xe0) {
      unicode = (utf8Bytes[pos] & 0x1f) << 12;
      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 2] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;
    } else if ((flag & 0xc0) === 0xc0) {
      unicode = (utf8Bytes[pos] & 0x3f) << 6;
      unicode |= utf8Bytes[pos + 1] & 0x3f;
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
};

export const cryptoHelpers = {
  generateKeyPair,
  encryptMessage,
  decryptMessage,
};
