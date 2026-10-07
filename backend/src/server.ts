import { app } from './app';
import { env } from './config/env';
import { initializeDatabase } from './db/database';

void initializeDatabase().then(() => {
  app.listen(env.port, () => {
    console.log(`Smart home API listening on http://localhost:${env.port}`);
  });
}).catch((error: unknown) => {
  console.error('Unable to initialize database.', error);
  process.exitCode = 1;
});
