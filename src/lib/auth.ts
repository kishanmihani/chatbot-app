// lib/auth.ts
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const signToken = (payload: object) =>
  jwt.sign(payload, SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
