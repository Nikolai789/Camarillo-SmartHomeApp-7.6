import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIoT } from '../context/IoTContext';

export default function SensorsScreen() {
  const { sensors, loading, error } = useIoT();
  const values = sensors ?? { temperature: null, humidity: null, light: null };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sensors</Text>
      <Text style={styles.subtitle}>Monitor your environment</Text>
      {loading && <Text>Loading sensor readings...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <SensorCard icon="thermometer-outline" name="Temperature"
        value={values.temperature === null ? '--' : `${values.temperature}°C`}
        description="Current room temperature" />
      <SensorCard icon="water-outline" name="Humidity"
        value={values.humidity === null ? '--' : `${values.humidity}%`}
        description="Current relative humidity" />
      <SensorCard icon="sunny-outline" name="Light Level"
        value={values.light === null ? '--' : `${values.light} lux`}
        description="Current ambient light" />
    </ScrollView>
  );
}

function SensorCard({
  icon,
  name,
  value,
  description,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  name: string;
  value: string;
  description: string;
}) {
  return (
    <View style={styles.sensorCard}>
      <View style={styles.sensorHeader}>
        <Ionicons name={icon} size={30} />
        <Text style={styles.sensorName}>{name}</Text>
      </View>
      <Text style={styles.sensorValue}>{value}</Text>
      <Text style={styles.sensorDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 5, marginBottom: 25 },
  error: { color: '#b00020', marginBottom: 12 },
  sensorCard: { padding: 20, borderRadius: 15, backgroundColor: '#cedaf4', marginBottom: 15 },
  sensorHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sensorName: { fontSize: 17, fontWeight: 'bold' },
  sensorValue: { fontSize: 32, fontWeight: 'bold', marginTop: 20 },
  sensorDescription: { fontSize: 13, marginTop: 5 },
});
