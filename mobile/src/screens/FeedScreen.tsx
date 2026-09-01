import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { SocialEvent } from '../types/event';
import { fetchEvents } from '../services/api';

export const FeedScreen = () => {
    const [events, setEvents] = useState<SocialEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const loadEvents = async () => {
        try {
            console.log('🔄 Începe încărcarea evenimentelor...');
            const data = await fetchEvents();
            console.log('✅ Date primite:', data);
            setEvents(data);
        } catch (error) {
            console.error('❌ Eroare în FeedScreen:', error);
        } finally {
            console.log('⏹️ Oprește starea de loading.');
            setLoading(false);
        }

    };

    useEffect(() => {
        loadEvents();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const data = await fetchEvents();
        setEvents(data);
        setRefreshing(false);
    };

    const renderEventCard = ({ item }: { item: SocialEvent }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.badge}>{item.event_type.toUpperCase()}</Text>
                <Text style={styles.seats}>
                    {item.current_participants_count} / {item.max_participants} locuri
                </Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.details}>
                Varsta: {item.max_age} | Gen: {item.target_gender}
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0066CC" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderEventCard}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<Text style={styles.empty}>Nu exista evenimente disponibile.</Text>}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    badge: { backgroundColor: '#E1F5FE', color: '#0288D1', fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 12 },
    seats: { color: '#666', fontSize: 13, fontWeight: '600' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    details: { color: '#888', fontSize: 13 },
    empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});