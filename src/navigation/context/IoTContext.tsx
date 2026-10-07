import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../api/client';
import type { Device, SensorReading } from '../../api/types';

type SensorData = Pick<SensorReading, 'temperature' | 'humidity' | 'light'>;

type IoTContextType = {
  devices: Device[];
  sensors: SensorData | null;
  loading: boolean;
  error: string | null;
  toggleDevice: (id: number, value: boolean) => Promise<void>;
  refresh: () => Promise<void>;
};

const IoTContext = createContext<IoTContextType | undefined>(undefined);

export function IoTProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [sensors, setSensors] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [nextDevices, readings] = await Promise.all([
        api.getDevices(),
        api.getSensorReadings(),
      ]);
      setDevices(nextDevices);
      const latest = readings[0];
      setSensors(latest ? {
        temperature: latest.temperature,
        humidity: latest.humidity,
        light: latest.light,
      } : null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load smart home data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggleDevice = useCallback(async (id: number, value: boolean) => {
    setError(null);
    try {
      const updatedDevice = await api.updateDeviceStatus(id, value);
      setDevices((current) => current.map((device) => (
        device.id === updatedDevice.id ? updatedDevice : device
      )));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update device.');
    }
  }, []);

  return (
    <IoTContext.Provider value={{ devices, sensors, loading, error, toggleDevice, refresh }}>
      {children}
    </IoTContext.Provider>
  );
}

export function useIoT() {
  const context = useContext(IoTContext);
  if (!context) {
    throw new Error('useIoT must be used inside IoTProvider');
  }
  return context;
}
