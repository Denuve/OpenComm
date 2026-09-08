import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.spacing.xl,
        paddingTop: THEME.spacing.xxl,
        paddingBottom: THEME.spacing.lg,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    greeting: {
        ...THEME.typography.largeTitle,

        color: THEME.colors.textPrimary,
    },

    subtitle: {
        ...THEME.typography.body,

        color: THEME.colors.textSecondary,

        marginTop: 4,
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: THEME.spacing.sm,
    },

    iconButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: THEME.colors.white,

        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,
    },

    icon: {
        fontSize: 18,
    },

    notificationDot: {
        position: 'absolute',

        top: 8,
        right: 8,

        width: 7,
        height: 7,

        borderRadius: 4,

        backgroundColor: THEME.colors.accent,
    },

    avatar: {
        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: THEME.colors.primary,

        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        color: THEME.colors.white,

        fontSize: 16,
        fontWeight: '700',
    },
});