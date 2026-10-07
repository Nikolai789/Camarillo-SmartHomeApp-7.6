import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3000),
  databaseFile: path.resolve(process.cwd(), process.env.DATABASE_FILE ?? './data/smarthome.sqlite'),
  clientOrigin: process.env.CLIENT_ORIGIN ?? '*',
};
