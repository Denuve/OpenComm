import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { styles } from './EventCard.style';

interface EventCardProps {
    event: {
        id: string;
        title: string;
        description?: string;
        max_participants: number;
        current_participants_count: number;
        target_gender: string;
        event_type: string;
        distance?: string;
    };

    onPress: () => void;
}

export const EventCard = ({
    event,
    onPress,
}: EventCardProps) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.82}
        >
            <View style={styles.headerRow}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {event.event_type}
                    </Text>
                </View>

                {event.distance && (
                    <Text style={styles.distance}>
                        📍 {event.distance}
                    </Text>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {event.title}
                </Text>

                {event.description ? (
                    <Text
                        style={styles.description}
                        numberOfLines={2}
                    >
                        {event.description}
                    </Text>
                ) : null}
            </View>

            <View style={styles.footerRow}>
                <View>
                    <Text style={styles.seatsLabel}>
                        Locuri
                    </Text>

                    <Text style={styles.seatsText}>
                        {event.current_participants_count} /{' '}
                        {event.max_participants}
                    </Text>
                </View>

                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Vezi detalii
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};