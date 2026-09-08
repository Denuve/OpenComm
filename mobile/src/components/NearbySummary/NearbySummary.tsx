import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './NearbySummary.style';

export const NearbySummary = () => {
    return (
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                    🔥
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    24 de evenimente în jurul tău
                </Text>

                <Text style={styles.subtitle}>
                    8 evenimente au loc în următoarele 24h
                </Text>
            </View>

            <Text style={styles.arrow}>
                →
            </Text>

        </View>
    );
};