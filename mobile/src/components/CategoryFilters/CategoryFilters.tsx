import React, { useState } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native';

import { styles } from './CategoryFilters.style';

const FILTERS = [
    'Pentru tine',
    'Azi',
    'Mâine',
    'Weekend',
    '🎵 Muzică',
    '🏃 Sport',
    '🎮 Gaming',
];

export const CategoryFilters = () => {
    const [selected, setSelected] = useState('Pentru tine');

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {FILTERS.map((filter) => {
                const isSelected = selected === filter;

                return (
                    <TouchableOpacity
                        key={filter}
                        activeOpacity={0.8}
                        onPress={() => setSelected(filter)}
                        style={[
                            styles.filter,
                            isSelected && styles.filterSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                isSelected && styles.filterTextSelected,
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};