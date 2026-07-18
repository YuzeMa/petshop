import dotenv from 'dotenv';
import { createApp } from './app.js';
import { loadEnv } from './config/env.js';

dotenv.config({ override: false });
const config = loadEnv();
const app = createApp(config);

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
