import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './FeedBackground.style';

export const FeedBackground = () => {
    return (
        <View pointerEvents="none" style={styles.container}>
            <LinearGradient
                colors={[
                    '#FCFBF9',
                    '#F9F8F5',
                    '#F6F5F0',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            />

            <View style={styles.greenBlob} />
            <View style={styles.terracottaBlob} />
            <View style={styles.smallGreenBlob} />
        </View>
    );
};