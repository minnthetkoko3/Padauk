import { randomBytes, createHmac } from 'crypto';

const SECRET = "PADAUK";

// Function to generate a random string
export const generateRandomString = (): string => {
  return randomBytes(128).toString('base64');
};

// Function to create an authentication hash
export const Authentication = (salt: string, password: string): string => {
  if (typeof SECRET === 'undefined') {
    throw new Error('SECRET is undefined');
  }
  return createHmac('sha256', SECRET)
    .update(`${salt}/${password}`)
    .digest('hex');
};
