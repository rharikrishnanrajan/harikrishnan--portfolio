import { Router } from 'express';
import { listCertifications } from '../controllers/certificationsController';

const router = Router();

router.get('/', listCertifications);

export default router;
