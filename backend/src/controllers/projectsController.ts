import { Request, Response } from 'express';
import { seedProjects } from '../data/seed';
import { ApiResponse, Project } from '../types/portfolio';

export async function listProjects(_req: Request, res: Response): Promise<void> {
  const payload: ApiResponse<Project[]> = { data: seedProjects, source: 'seed' };
  res.json(payload);
}

export async function getProjectBySlug(
  req: Request,
  res: Response
): Promise<void> {
  const { slug } = req.params;
  const project = seedProjects.find((item) => item.slug === slug);

  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }

  res.json({ data: project, source: 'seed' });
}
