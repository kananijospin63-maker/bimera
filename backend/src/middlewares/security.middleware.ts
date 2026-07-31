import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { ENV } from '../config/env';

export const securityMiddlewares = [
  helmet({
    contentSecurityPolicy: false, // Customized for API / frontend integration
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
  cors({
    origin: [ENV.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard.' },
  }),
];
