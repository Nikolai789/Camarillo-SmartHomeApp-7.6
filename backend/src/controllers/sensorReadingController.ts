import type { Request, Response } from 'express';
import { createSensorReading, listSensorReadings } from '../services/sensorReadingService';

export function getSensorReadings(request: Request, response: Response) {
  const deviceId = request.query.deviceId === undefined ? undefined : Number(request.query.deviceId);
  const limit = request.query.limit === undefined ? 50 : Number(request.query.limit);

  if ((deviceId !== undefined && !Number.isInteger(deviceId)) || !Number.isInteger(limit)) {
    response.status(400).json({ error: 'deviceId and limit must be integers.' });
    return;
  }

  response.json(listSensorReadings(deviceId, limit));
}

export function postSensorReading(request: Request, response: Response) {
  const { temperature, humidity, light, deviceId } = request.body as Record<string, unknown>;
  const values = [temperature, humidity, light];

  if (!values.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    response.status(400).json({ error: 'temperature, humidity, and light must be finite numbers.' });
    return;
  }

  if (deviceId !== undefined && deviceId !== null && (!Number.isInteger(deviceId) || (deviceId as number) < 1)) {
    response.status(400).json({ error: 'deviceId must be a positive integer or null.' });
    return;
  }

  const reading = createSensorReading({
    temperature: temperature as number,
    humidity: humidity as number,
    light: light as number,
    deviceId: deviceId as number | null | undefined,
  });
  response.status(201).json(reading);
}
