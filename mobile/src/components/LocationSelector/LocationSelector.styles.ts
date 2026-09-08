import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: THEME.spacing.xl,

        padding: THEME.spacing.md,

        backgroundColor: 'rgba(255,255,255,0.82)',

        borderRadius: THEME.radii.lg,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    locationIcon: {
        width: 40,
        height: 40,

        borderRadius: 20,

        backgroundColor: THEME.colors.primaryLight,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: THEME.spacing.md,
    },

    locationEmoji: {
        fontSize: 18,
    },

    label: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginBottom: 2,
    },

    city: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textPrimary,
    },

    radiusButton: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,

        backgroundColor: THEME.colors.background,

        borderRadius: THEME.radii.md,
    },

    radiusText: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.primary,
    },

    arrow: {
        fontSize: 22,

        color: THEME.colors.primary,

        marginLeft: 4,
        marginTop: -2,
    },
});