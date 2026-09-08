import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { styles } from './MiniEventCard.style';

interface MiniEventCardProps {
    title: string;
    eventType: string;
    time: string;
    distance: string;
    participants: number;
    maxParticipants: number;
    onPress: () => void;
}

export const MiniEventCard = ({
    title,
    eventType,
    time,
    distance,
    participants,
    maxParticipants,
    onPress,
}: MiniEventCardProps) => {
    const remaining = maxParticipants - participants;

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View style={styles.topRow}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {eventType}
                    </Text>
                </View>

                <Text style={styles.time}>
                    {time}
                </Text>
            </View>

            <Text
                style={styles.title}
                numberOfLines={2}
            >
                {title}
            </Text>

            <View style={styles.metaRow}>
                <Text style={styles.meta}>
                    📍 {distance}
                </Text>

                <Text style={styles.meta}>
                    👥 {participants}/{maxParticipants}
                </Text>
            </View>

            <View style={styles.bottomRow}>
                <Text style={styles.remaining}>
                    {remaining > 0
                        ? `${remaining} locuri rămase`
                        : 'Complet'}
                </Text>

                <Text style={styles.arrow}>
                    →
                </Text>
            </View>
        </TouchableOpacity>
    );
};