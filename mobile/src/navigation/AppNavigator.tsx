import React from 'react';

import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { FeedScreen } from '../screens/Feed/FeedScreen';
import { EventDetailsScreen } from '../screens/EventDetails/EventDetailsScreen';

import { RootStackParamList } from './types';

const Stack =
    createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Feed"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
            />

            <Stack.Screen
                name="EventDetails"
                component={EventDetailsScreen}
            />
        </Stack.Navigator>
    );
};