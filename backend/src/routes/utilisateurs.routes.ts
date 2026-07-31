import { Router } from 'express';
import { UtilisateursController } from '../controllers/utilisateurs.controller';
import { authenticateToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, requireRole(['ADMIN']), UtilisateursController.getUsers);
router.get('/pending', authenticateToken, requireRole(['ADMIN']), UtilisateursController.getPendingUsers);
router.patch('/:id/approve', authenticateToken, requireRole(['ADMIN']), UtilisateursController.approveUser);
router.patch('/:id/reject', authenticateToken, requireRole(['ADMIN']), UtilisateursController.rejectUser);
router.patch('/:id/role', authenticateToken, requireRole(['ADMIN']), UtilisateursController.updateUserRole);

export default router;
