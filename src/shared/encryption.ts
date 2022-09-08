import { createCipheriv, createDecipheriv } from 'crypto';

export const encrypt = (
  text: string,
  key: Buffer,
  bytes: Buffer,
  algorithm = 'aes-256-ctr',
) => {
  const cipher = createCipheriv(algorithm, key, bytes);
  return Buffer.concat([cipher.update(text), cipher.final()]);
};

export const decrypt = async (
  encrypted: Buffer,
  key: Buffer,
  bytes: Buffer,
  algorithm = 'aes-256-ctr',
) => {
  const decipher = createDecipheriv(algorithm, key, bytes);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};
