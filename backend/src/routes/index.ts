import { Router } from 'express';
import authRoutes from './auth.routes';
import pagesRoutes from './pages.routes';
import articlesRoutes from './articles.routes';
import evenementsRoutes from './evenements.routes';
import mediasRoutes from './medias.routes';
import utilisateursRoutes from './utilisateurs.routes';
import contactRoutes from './contact.routes';
import newsletterRoutes from './newsletter.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/pages', pagesRoutes);
router.use('/articles', articlesRoutes);
router.use('/evenements', evenementsRoutes);
router.use('/medias', mediasRoutes);
router.use('/utilisateurs', utilisateursRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);

export default router;
