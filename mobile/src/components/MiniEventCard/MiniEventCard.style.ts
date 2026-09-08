import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    card: {
        width: 250,

        backgroundColor: THEME.colors.white,

        borderRadius: THEME.radii.xl,

        padding: THEME.spacing.lg,

        marginRight: THEME.spacing.md,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,

        shadowColor: THEME.colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,

        elevation: 3,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: THEME.spacing.md,
    },

    badge: {
        backgroundColor: THEME.colors.accentLight,

        paddingHorizontal: THEME.spacing.sm,
        paddingVertical: 5,

        borderRadius: THEME.radii.pill,
    },

    badgeText: {
        ...THEME.typography.caption,

        color: THEME.colors.accent,

        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },

    time: {
        ...THEME.typography.caption,

        color: THEME.colors.primary,
    },

    title: {
        ...THEME.typography.subtitle,

        color: THEME.colors.textPrimary,

        minHeight: 44,

        marginBottom: THEME.spacing.md,
    },

    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginBottom: THEME.spacing.md,
    },

    meta: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,
    },

    bottomRow: {
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,

        paddingTop: THEME.spacing.md,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    remaining: {
        ...THEME.typography.caption,

        color: THEME.colors.primary,
    },

    arrow: {
        fontSize: 18,

        color: THEME.colors.primary,
    },
});