import { Router } from 'express';
import { listAchievements } from '../controllers/achievementsController';

const router = Router();

router.get('/', listAchievements);

export default router;
