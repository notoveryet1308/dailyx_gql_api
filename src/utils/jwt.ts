import jwt from 'jsonwebtoken';
import config from "config"


const publicKey = Buffer.from(
  config.get("publicKey") as string,
  'base64'
).toString('ascii');

const privateKey =  Buffer.from(
  config.get("privateKey") as string,
  'base64'
).toString('ascii');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const token = jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
  console.log({ args: object, token });
  return token;
}

export function verifyJwt<T>(token: string): T {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
