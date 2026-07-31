import express from 'express';
import { ENV } from './config/env';
import { securityMiddlewares } from './middlewares/security.middleware';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';
import { BackupService } from './services/backup.service';

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middlewares (Helmet, CORS, Rate Limit)
app.use(securityMiddlewares);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Bimera Express Backend',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', routes);

// Backup trigger route (Admin)
app.post('/api/admin/backups/trigger', async (req, res, next) => {
  try {
    const backup = await BackupService.triggerDatabaseBackup();
    res.json({ message: 'Sauvegarde déclenchée avec succès.', backup });
  } catch (err) {
    next(err);
  }
});

// Global Error Handler
app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`[Bimera Backend] Listening on port ${ENV.PORT} in ${ENV.NODE_ENV} mode.`);
});
