import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { logger } from './config/logger';
import { errorHandler, HttpError, notFoundHandler } from './middleware/errorHandler';
import achievementsRouter from './routes/achievements';
import certificationsRouter from './routes/certifications';
import contactRouter from './routes/contact';
import projectsRouter from './routes/projects';
import skillsRouter from './routes/skills';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new HttpError(403, 'Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/certifications', certificationsRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/contact', contactRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`[server] Portfolio API listening on http://localhost:${PORT} (${NODE_ENV})`);
});
