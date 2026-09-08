import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: THEME.colors.cardBg,

        borderRadius: THEME.radii.xl,

        padding: THEME.spacing.lg,

        marginHorizontal: THEME.spacing.xl,
        marginBottom: THEME.spacing.md,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,

        shadowColor: THEME.colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,

        elevation: 3,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: THEME.spacing.md,
    },

    badge: {
        alignSelf: 'flex-start',

        backgroundColor: THEME.colors.primaryLight,

        paddingHorizontal: THEME.spacing.md,
        paddingVertical: 5,

        borderRadius: THEME.radii.pill,
    },

    badgeText: {
        ...THEME.typography.caption,

        color: THEME.colors.primary,

        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },

    distance: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,
    },

    content: {
        marginBottom: THEME.spacing.lg,
    },

    title: {
        ...THEME.typography.title,

        color: THEME.colors.textPrimary,

        marginBottom: 6,
    },

    description: {
        ...THEME.typography.body,

        color: THEME.colors.textSecondary,

        lineHeight: 20,
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,

        paddingTop: THEME.spacing.md,
    },

    seatsLabel: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginBottom: 2,
    },

    seatsText: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.primary,
    },

    button: {
        backgroundColor: THEME.colors.accent,

        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.sm,

        borderRadius: THEME.radii.md,
    },

    buttonText: {
        ...THEME.typography.button,

        color: THEME.colors.white,
    },
});