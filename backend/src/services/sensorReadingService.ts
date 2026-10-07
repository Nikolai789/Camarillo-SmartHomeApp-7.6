import { getDatabase, persistDatabase } from '../db/database';
import type { SensorReading } from '../types/models';

export type NewSensorReading = {
  temperature: number;
  humidity: number;
  light: number;
  deviceId?: number | null;
};

export function listSensorReadings(deviceId?: number, limit = 50): SensorReading[] {
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 200);
  const database = getDatabase();
  const query = deviceId === undefined
    ? 'SELECT id, temperature, humidity, light, device_id, recorded_at FROM sensor_readings ORDER BY recorded_at DESC LIMIT ?'
    : 'SELECT id, temperature, humidity, light, device_id, recorded_at FROM sensor_readings WHERE device_id = ? ORDER BY recorded_at DESC LIMIT ?';
  const result = database.exec(query, deviceId === undefined ? [safeLimit] : [deviceId, safeLimit]);
  return (result[0]?.values ?? []).map((values) => ({
    id: values[0] as number, temperature: values[1] as number, humidity: values[2] as number,
    light: values[3] as number, device_id: values[4] as number | null, recorded_at: values[5] as string,
  }));
}

export function createSensorReading(input: NewSensorReading): SensorReading {
  const database = getDatabase();
  database.run('INSERT INTO sensor_readings (temperature, humidity, light, device_id) VALUES (?, ?, ?, ?)',
    [input.temperature, input.humidity, input.light, input.deviceId ?? null]);
  const id = database.exec('SELECT last_insert_rowid()')[0].values[0][0] as number;
  const values = database.exec(
    'SELECT id, temperature, humidity, light, device_id, recorded_at FROM sensor_readings WHERE id = ?',
    [id],
  )[0]?.values ?? [];
  persistDatabase();
  const row = values[0];
  return { id: row[0] as number, temperature: row[1] as number, humidity: row[2] as number,
    light: row[3] as number, device_id: row[4] as number | null, recorded_at: row[5] as string };
}
