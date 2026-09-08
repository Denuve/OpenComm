import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { MiniEventCard } from '../MiniEventCard/MiniEventCard';

import { styles } from './UpcomingEvents.style';

interface UpcomingEvent {
    id: string;
    title: string;
    eventType: string;
    time: string;
    distance: string;
    participants: number;
    maxParticipants: number;
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
    {
        id: '1',
        title: 'Board Games Night 🎲',
        eventType: 'Gaming',
        time: 'Azi · 19:00',
        distance: '1.2 km',
        participants: 6,
        maxParticipants: 10,
    },
    {
        id: '2',
        title: 'Running în parc 🏃',
        eventType: 'Sport',
        time: 'Azi · 20:00',
        distance: '2.4 km',
        participants: 8,
        maxParticipants: 12,
    },
    {
        id: '3',
        title: 'Drinks & Social 🍹',
        eventType: 'Social',
        time: 'Mâine · 18:30',
        distance: '3.1 km',
        participants: 4,
        maxParticipants: 8,
    },
];

export const UpcomingEvents = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>
                        Începe curând ⚡
                    </Text>

                    <Text style={styles.subtitle}>
                        Nu rata evenimentele din apropiere
                    </Text>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {UPCOMING_EVENTS.map((event) => (
                    <MiniEventCard
                        key={event.id}
                        {...event}
                        onPress={() =>
                            console.log(
                                'Upcoming event:',
                                event.title
                            )
                        }
                    />
                ))}
            </ScrollView>
        </View>
    );
};