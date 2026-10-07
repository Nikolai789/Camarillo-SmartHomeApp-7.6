import type { Device, SensorReading } from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(body?.error ?? `Request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getDevices: () => request<Device[]>('/devices'),
  updateDeviceStatus: (id: number, status: boolean) =>
    request<Device>(`/devices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getSensorReadings: (deviceId?: number) =>
    request<SensorReading[]>(
      `/sensor-readings${deviceId === undefined ? '' : `?deviceId=${deviceId}`}`,
    ),
};
