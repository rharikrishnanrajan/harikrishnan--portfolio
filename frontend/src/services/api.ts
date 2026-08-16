import {
  ApiEnvelope,
  Certification,
  ContactPayload,
  ContactResponse,
  Project,
  SkillCategory,
} from '../types/portfolio';
import {
  seedCertifications,
  seedProjects,
  seedSkills,
} from '../data/seed';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:5000/api';
const REQUEST_TIMEOUT_MS = 4500;

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });

    const body = (await response.json().catch(() => ({}))) as T & { error?: string };

    if (!response.ok) {
      throw new ApiError(response.status, body.error ?? `Request failed with status ${response.status}`);
    }

    return body;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(0, 'The API request timed out.');
    }
    throw err;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const envelope = await requestJson<ApiEnvelope<Project[]>>('/projects');
    return envelope.data;
  } catch {
    return seedProjects;
  }
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const envelope = await requestJson<ApiEnvelope<SkillCategory[]>>('/skills');
    return envelope.data;
  } catch {
    return seedSkills;
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const envelope = await requestJson<ApiEnvelope<Certification[]>>('/certifications');
    return envelope.data;
  } catch {
    return seedCertifications;
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    await requestJson<{ status: string }>('/health');
    return true;
  } catch {
    return false;
  }
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const body = await requestJson<ContactResponse & { error?: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!body.success) {
    throw new ApiError(400, body.error ?? 'Unable to send message.');
  }

  return body;
}
