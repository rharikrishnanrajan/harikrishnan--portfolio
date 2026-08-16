import { Request, Response } from 'express';
import { logger } from '../config/logger';
import { ContactMessage } from '../types/portfolio';

const messages: (ContactMessage & { id: string })[] = [];

export async function createContactMessage(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, subject, message } = req.body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const contactMessage: ContactMessage & { id: string } = {
      id,
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      status: 'unread',
    };

    messages.push(contactMessage);
    logger.info(`[contact] Message received from ${name} <${email}> [${id}]: ${subject}`);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully.',
      id,
    });
  } catch (err) {
    logger.error(`[contact] Failed to process message: ${(err as Error).message}`);
    res.status(500).json({
      error:
        'Your message could not be processed at this time. Please try again later or email rharikrishnanrajan@gmail.com directly.',
    });
  }
}
