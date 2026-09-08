import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import {
    useNavigation,
} from '@react-navigation/native';

import type {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type {
    RootStackParamList,
} from '../../navigation/types';

import { SocialEvent } from '../../types/event';
import { fetchEvents } from '../../services/api';

import { EventCard } from '../../components/EventCard/EventCard';
import { FeedBackground } from '../../components/FeedBackground/FeedBackground';
import { FeedHeader } from '../../components/FeedHeader/FeedHeader';
import { LocationSelector } from '../../components/LocationSelector/LocationSelector';
import { NearbySummary } from '../../components/NearbySummary/NearbySummary';
import { CategoryFilters } from '../../components/CategoryFilters/CategoryFilters';
import { UpcomingEvents } from '../../components/UpcomingEvents/UpcomingEvents';

import { THEME } from '../../constants/theme';

import { styles } from './FeedScreen.styles';

type FeedNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        'Feed'
    >;

export const FeedScreen = () => {
    const [events, setEvents] = useState<SocialEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigation =
        useNavigation<FeedNavigationProp>();

    const loadEvents = async () => {
        try {
            setLoading(true);

            const data = await fetchEvents();

            setEvents(data);
        } catch (error) {
            console.error(
                '❌ Eroare în FeedScreen:',
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const onRefresh = async () => {
        try {
            setRefreshing(true);

            const data = await fetchEvents();

            setEvents(data);
        } catch (error) {
            console.error(
                '❌ Eroare la refresh:',
                error
            );
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <FeedBackground />

                <ActivityIndicator
                    size="large"
                    color={THEME.colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FeedBackground />

            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={
                    styles.listContent
                }

                ListHeaderComponent={
                    <>
                        <FeedHeader userName="Alex" />

                        <LocationSelector />

                        <NearbySummary />

                        <CategoryFilters />

                        <UpcomingEvents />

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Evenimente pentru tine
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.7}
                            >
                                <Text style={styles.seeAll}>
                                    Vezi toate
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }

                renderItem={({ item }) => (
                    <EventCard
                        event={{
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            max_participants:
                                item.max_participants,
                            current_participants_count:
                                item.current_participants_count,
                            target_gender:
                                item.target_gender,
                            event_type:
                                item.event_type,
                            distance: '2.4 km',
                        }}
                        onPress={() =>
                            navigation.navigate('EventDetails',
                                {
                                    event: item,
                                })
                        }
                    />
                )}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={
                            THEME.colors.primary
                        }
                        colors={[
                            THEME.colors.primary,
                        ]}
                    />
                }

                ListEmptyComponent={
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: THEME.colors.textSecondary,
                                marginTop: 40,
                            }}
                        >
                            Nu există evenimente
                            disponibile.
                        </Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.createButton}
                activeOpacity={0.85}
                onPress={() =>
                    console.log(
                        'Create event'
                    )
                }
            >
                <Text
                    style={styles.createButtonIcon}
                >
                    +
                </Text>

                <Text
                    style={styles.createButtonText}
                >
                    Creează
                </Text>
            </TouchableOpacity>
        </View>
    );
};