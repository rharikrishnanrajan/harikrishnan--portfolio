const isProduction = process.env.NODE_ENV === 'production';

type Level = 'info' | 'warn' | 'error';

function format(level: Level, message: string): string {
  return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  info: (message: string): void => {
    if (!isProduction) console.log(format('info', message));
  },
  warn: (message: string): void => {
    console.warn(format('warn', message));
  },
  error: (message: string): void => {
    console.error(format('error', message));
  },
};
