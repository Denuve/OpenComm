import React from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import type {
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {
    RootStackParamList,
} from '../../navigation/types';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'EventDetails'
>;

import { styles } from './EventDetailsScreen.style';

interface EventDetailsScreenProps {
    route?: {
        params?: {
            event?: {
                id: string;
                title: string;
                description?: string;
                max_participants: number;
                current_participants_count: number;
                target_gender: string;
                event_type: string;
                distance?: string;
            };
        };
    };
    navigation?: {
        goBack: () => void;
    };
}

export const EventDetailsScreen = ({
    route,
    navigation,
}: Props) => {
    const event = route?.params?.event ?? {
        id: '1',
        title: 'Board Games Night 🎲',
        description:
            'O seară relaxată de board games, oameni noi și distracție. Nu trebuie să fii expert — important e să vii cu chef de joc.',
        max_participants: 10,
        current_participants_count: 6,
        target_gender: 'Toți',
        event_type: 'Gaming',
        distance: '1.2 km',
    };

    const spotsLeft =
        event.max_participants -
        event.current_participants_count;

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.hero}>
                    <View style={styles.heroTopRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation?.goBack()
                            }
                        >
                            <Text style={styles.backIcon}>
                                ‹
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.shareButton}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.shareIcon}>
                                ↗
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroIcon}>
                        <Text style={styles.heroEmoji}>
                            🎲
                        </Text>
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {event.event_type}
                        </Text>
                    </View>

                    <Text style={styles.title}>
                        {event.title}
                    </Text>

                    <View style={styles.locationRow}>
                        <Text style={styles.locationIcon}>
                            📍
                        </Text>

                        <View>
                            <Text style={styles.locationTitle}>
                                Cluj-Napoca
                            </Text>

                            <Text style={styles.locationSubtitle}>
                                {event.distance ??
                                    'În apropiere'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>
                                📅
                            </Text>

                            <Text style={styles.infoLabel}>
                                Data
                            </Text>

                            <Text style={styles.infoValue}>
                                Azi
                            </Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>
                                🕖
                            </Text>

                            <Text style={styles.infoLabel}>
                                Ora
                            </Text>

                            <Text style={styles.infoValue}>
                                19:00
                            </Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoIcon}>
                                👥
                            </Text>

                            <Text style={styles.infoLabel}>
                                Participanți
                            </Text>

                            <Text style={styles.infoValue}>
                                {event.current_participants_count}/
                                {event.max_participants}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Despre eveniment
                        </Text>

                        <Text style={styles.description}>
                            {event.description ??
                                'Nu există o descriere pentru acest eveniment.'}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Cine poate participa?
                        </Text>

                        <View style={styles.audienceCard}>
                            <View style={styles.audienceIcon}>
                                <Text>👋</Text>
                            </View>

                            <View style={styles.audienceContent}>
                                <Text style={styles.audienceTitle}>
                                    {event.target_gender}
                                </Text>

                                <Text style={styles.audienceSubtitle}>
                                    Toată lumea este binevenită
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Locuri disponibile
                        </Text>

                        <View style={styles.capacityCard}>
                            <View style={styles.capacityTop}>
                                <Text style={styles.capacityText}>
                                    {event.current_participants_count}{' '}
                                    persoane înscrise
                                </Text>

                                <Text style={styles.capacityRemaining}>
                                    {spotsLeft > 0
                                        ? `${spotsLeft} locuri`
                                        : 'Complet'}
                                </Text>
                            </View>

                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progress,
                                        {
                                            width: `${Math.min(
                                                (event.current_participants_count /
                                                    event.max_participants) *
                                                    100,
                                                100
                                            )}%`,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.bottomLabel}>
                        Participă la eveniment
                    </Text>

                    <Text style={styles.bottomSpots}>
                        {spotsLeft > 0
                            ? `${spotsLeft} locuri rămase`
                            : 'Eveniment complet'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.joinButton,
                        spotsLeft <= 0 &&
                            styles.joinButtonDisabled,
                    ]}
                    activeOpacity={0.85}
                    disabled={spotsLeft <= 0}
                    onPress={() =>
                        console.log(
                            'Participă la:',
                            event.title
                        )
                    }
                >
                    <Text style={styles.joinButtonText}>
                        {spotsLeft > 0
                            ? 'Participă'
                            : 'Complet'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};