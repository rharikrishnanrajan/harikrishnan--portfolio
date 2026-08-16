import { Request, Response } from 'express';
import { seedCertifications } from '../data/seed';
import { ApiResponse, Certification } from '../types/portfolio';

export async function listCertifications(_req: Request, res: Response): Promise<void> {
  const payload: ApiResponse<Certification[]> = { data: seedCertifications, source: 'seed' };
  res.json(payload);
}
