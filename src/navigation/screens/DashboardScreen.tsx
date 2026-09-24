import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Pressable, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useIoT } from '../context/IoTContext';

type DrawerParamList = {
    Dashboard: undefined;
    Sensors: undefined;
    Devices: undefined;
    Settings: undefined;
};


export default function DashboardScreen() {

    const { devices, sensors } = useIoT();
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.greeting}>
                Good day
            </Text>

            <Text style={styles.title}>
                IoT Dashboard
            </Text>

            <View style={styles.sensorRow}>

                <View style={styles.sensorCard}>
                    <View style={styles.sensorHeader}>
                        <Ionicons
                            name="thermometer-outline"
                            size={22}
                            color="#000000"
                        />

                        <Text style={styles.sensorLabel}>
                            Temperature
                        </Text>
                    </View>

                    <Text style={styles.sensorValue}>
                        {sensors.temperature}°C
                    </Text>
                </View>

                <View style={styles.sensorCard}>
                    <View style={styles.sensorHeader}>
                        <Ionicons
                            name="water-outline"
                            size={22}
                            color="#020202"
                        />

                        <Text style={styles.sensorLabel}>
                            Humidity
                        </Text>
                    </View>

                    <Text style={styles.sensorValue}>
                        {sensors.humidity}%
                    </Text>
                </View>

            </View>

            <Text style={styles.sectionTitle}>
                Device Status
            </Text>

            {devices.map((device) => (

                <View
                    key={device.id}
                    style={styles.deviceCard}
                >

                    <View style={styles.deviceInfo}>

                        <Ionicons
                            name={device.icon}
                            size={28}
                            style={styles.deviceIcon}
                        />

                        <View>
                            <Text style={styles.deviceName}>
                                {device.name}
                            </Text>
                            <Text style={styles.deviceType}>
                                <Text style={styles.deviceState}>
                                    {device.status ? 'ON' : 'OFF'}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            ))}

            
            <Pressable
                style={styles.deviceTip}
                onPress={() => navigation.navigate('Devices')}
            >
                <Text style={styles.deviceTipText}>
                    update device status in the <span style={{ fontWeight: 'bold', color: '#0285ff', textDecoration: 'underline' }}>Devices</span> tab
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,   
    },

    greeting: {
        fontSize: 14,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5,
    },

    sensorRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 25,
    },

    sensorCard: {
        flex: 1,
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 3,
    },

    sensorLabel: {
        fontSize: 14,
        color: '#0c0c0c',
        fontWeight: 'bold',
    },

    sensorValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0c0c0c',
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
    },

    deviceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 3,
        marginBottom: 15,
    },

    deviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    deviceIcon: {
        fontSize: 28,
        marginRight: 12,
    },

    deviceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    deviceType: {
        fontSize: 13,
        marginTop: 3,
    },

    deviceStatus: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    sensorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    deviceTip: {
        marginTop: 5,
    },

    deviceTipText: {
        fontSize: 14,
        color: '#555',
        alignSelf: 'center',
    },

    deviceState: {
        fontSize: 14,
        marginTop: 5,
    },
});