import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './Feedheader.styles';

interface FeedHeaderProps {
    userName: string;
}

export const FeedHeader = ({
    userName,
}: FeedHeaderProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.topRow}>
                <View>
                    <Text style={styles.greeting}>
                        Bună, {userName} 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Ce se întâmplă în jurul tău?
                    </Text>
                </View>

                <View style={styles.actions}>

                    <TouchableOpacity
                        style={styles.iconButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.icon}>
                            🔔
                        </Text>

                        <View style={styles.notificationDot} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.avatar}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.avatarText}>
                            A
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
};