import { decrypt, encrypt } from './encryption';
import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';

describe('encryption', () => {
  const pwd = 'very good password';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('returns a value that can be decrypted', async () => {
    const bytes = randomBytes(16);
    const key = (await promisify(scrypt)(pwd, 'salt', 32)) as Buffer;
    const encrypted = encrypt('text1', key, bytes);
    const decrypted = await decrypt(encrypted, key, bytes);
    expect(decrypted.toString()).toEqual('text1');
  });
});
