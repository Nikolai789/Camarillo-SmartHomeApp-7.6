import { getDatabase, persistDatabase } from '../db/database';
import type { Device } from '../types/models';

type DeviceRow = Omit<Device, 'status'> & { status: number };

const toDevice = (row: DeviceRow): Device => ({ ...row, status: row.status === 1 });

export function listDevices(): Device[] {
  const result = getDatabase().exec('SELECT id, name, type, icon, status FROM devices ORDER BY id');
  const [table] = result;
  return (table?.values ?? []).map((values) => toDevice({
    id: values[0] as number, name: values[1] as string, type: values[2] as string,
    icon: values[3] as string, status: values[4] as number,
  }));
}

export function updateDeviceStatus(id: number, status: boolean): Device | undefined {
  const database = getDatabase();
  database.run('UPDATE devices SET status = ? WHERE id = ?', [status ? 1 : 0, id]);
  const result = database.exec('SELECT id, name, type, icon, status FROM devices WHERE id = ?', [id]);
  const values = result[0]?.values[0];
  if (!values) return undefined;
  persistDatabase();
  return toDevice({ id: values[0] as number, name: values[1] as string, type: values[2] as string,
    icon: values[3] as string, status: values[4] as number });
}
