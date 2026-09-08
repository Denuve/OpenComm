import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './LocationSelector.styles';

export const LocationSelector = () => {
    return (
        <View style={styles.container}>

            <View style={styles.locationInfo}>
                <View style={styles.locationIcon}>
                    <Text style={styles.locationEmoji}>
                        📍
                    </Text>
                </View>

                <View>
                    <Text style={styles.label}>
                        Locația ta
                    </Text>

                    <Text style={styles.city}>
                        Cluj-Napoca
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.radiusButton}
                activeOpacity={0.8}
            >
                <Text style={styles.radiusText}>
                    10 km
                </Text>

                <Text style={styles.arrow}>
                    ›
                </Text>
            </TouchableOpacity>

        </View>
    );
};