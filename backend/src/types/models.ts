export type Device = {
  id: number;
  name: string;
  type: string;
  icon: string;
  status: boolean;
};

export type SensorReading = {
  id: number;
  temperature: number;
  humidity: number;
  light: number;
  device_id: number | null;
  recorded_at: string;
};
