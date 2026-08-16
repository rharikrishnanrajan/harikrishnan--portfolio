import { Request, Response } from 'express';
import { seedSkills } from '../data/seed';
import { ApiResponse, SkillCategory } from '../types/portfolio';

export async function listSkills(_req: Request, res: Response): Promise<void> {
  const payload: ApiResponse<SkillCategory[]> = { data: seedSkills, source: 'seed' };
  res.json(payload);
}
