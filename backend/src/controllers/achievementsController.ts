import { Request, Response } from 'express';
import { seedAchievements } from '../data/seed';
import { Achievement, ApiResponse } from '../types/portfolio';

export async function listAchievements(_req: Request, res: Response): Promise<void> {
  const payload: ApiResponse<Achievement[]> = { data: seedAchievements, source: 'seed' };
  res.json(payload);
}
