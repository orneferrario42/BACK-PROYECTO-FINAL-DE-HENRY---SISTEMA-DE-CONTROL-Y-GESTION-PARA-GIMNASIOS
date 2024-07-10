import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const witIAConfig = {
  token: process.env.WIT_IA_TOKEN,
  witApiVersion: process.env.WIT_IA_API_VERSION,
  witBaseUrl: process.env.WIT_IA_BASE_URL,
};
