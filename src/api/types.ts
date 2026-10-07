import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type Device = {
  id: number;
  name: string;
  type: string;
  icon: ComponentProps<typeof Ionicons>['name'];
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
