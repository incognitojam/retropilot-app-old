import { verify as verifyToken } from 'jsonwebtoken';

export type Secret =
  | string
  | Buffer
  | { key: string | Buffer; passphrase: string };

export async function verify(token: string, key: Secret) {
  try {
    const result = verifyToken(token.replace('JWT ', ''), key, { algorithms: ['RS256'], ignoreNotBefore: true });
    return result;
  } catch (error) {
    // TODO: log error?
    return null;
  }
}
