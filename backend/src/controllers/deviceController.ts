import type { Request, Response } from 'express';
import { listDevices, updateDeviceStatus } from '../services/deviceService';

export function getDevices(_request: Request, response: Response) {
  response.json(listDevices());
}

export function patchDevice(request: Request, response: Response) {
  const id = Number(request.params.id);
  const { status } = request.body as { status?: unknown };

  if (!Number.isInteger(id) || typeof status !== 'boolean') {
    response.status(400).json({ error: 'A valid device id and boolean status are required.' });
    return;
  }

  const device = updateDeviceStatus(id, status);
  if (!device) {
    response.status(404).json({ error: 'Device not found.' });
    return;
  }

  response.json(device);
}
