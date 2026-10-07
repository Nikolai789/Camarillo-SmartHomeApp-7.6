import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { deviceRoutes } from './routes/deviceRoutes';
import { sensorReadingRoutes } from './routes/sensorReadingRoutes';

export const app = express();

app.use(cors({ origin: env.clientOrigin === '*' ? true : env.clientOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/api/devices', deviceRoutes);
app.use('/api/sensor-readings', sensorReadingRoutes);
app.use(errorHandler);
