import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

export const contactValidation: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters.')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required.')
    .isLength({ max: 160 })
    .withMessage('Email must be at most 160 characters.'),
  body('subject')
    .trim()
    .isLength({ min: 3, max: 140 })
    .withMessage('Subject must be between 3 and 140 characters.')
    .escape(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 4000 })
    .withMessage('Message must be between 10 and 4000 characters.')
    .escape(),
];

export function validateRequest(req: Request, res: Response, next: NextFunction): void {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((error) => error.msg);
    res.status(400).json({ error: 'Validation failed', errors });
    return;
  }
  next();
}
