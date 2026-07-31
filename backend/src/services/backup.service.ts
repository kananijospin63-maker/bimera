import { prisma } from '../config/db';

export class BackupService {
  static async triggerDatabaseBackup() {
    const filename = `backup-bimera-${Date.now()}.sql`;
    try {
      // Stub for actual database dump trigger
      console.log(`[BackupService] Starting database dump: ${filename}`);

      const mockSize = Math.floor(Math.random() * 5000000) + 1000000;

      const log = await prisma.backupLog.create({
        data: {
          filename,
          status: 'SUCCESS',
          size: mockSize,
        },
      });

      return log;
    } catch (error) {
      console.error('[BackupService] Backup failed:', error);
      await prisma.backupLog.create({
        data: {
          filename,
          status: 'FAILED',
          size: 0,
        },
      });
      throw error;
    }
  }

  static async getBackupLogs() {
    return prisma.backupLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }
}
