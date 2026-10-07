import { Router } from 'express';
import { getSensorReadings, postSensorReading } from '../controllers/sensorReadingController';

export const sensorReadingRoutes = Router();
sensorReadingRoutes.get('/', getSensorReadings);
sensorReadingRoutes.post('/', postSensorReading);
