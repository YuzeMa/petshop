const DEFAULT_PORT = 3000;
const DEFAULT_CORS_ORIGINS = 'http://localhost:5173';

export type EnvConfig = {
  port: number;
  corsAllowedOrigins: string[];
};

function parsePort(value: string | undefined): number {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid PORT: ${value}`);
  }

  return port;
}

function parseCorsOrigins(value: string | undefined): string[] {
  const raw = value ?? DEFAULT_CORS_ORIGINS;
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

export function loadEnv(): EnvConfig {
  return {
    port: parsePort(process.env.PORT),
    corsAllowedOrigins: parseCorsOrigins(process.env.CORS_ALLOWED_ORIGINS),
  };
}
