import jwt from 'jsonwebtoken';
import { env } from './env.js';

export const createToken = (payload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
