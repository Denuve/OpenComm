import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },

    content: {
        paddingBottom: 120,
    },

    hero: {
        height: 220,

        backgroundColor: THEME.colors.primary,

        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,

        paddingHorizontal: THEME.spacing.xl,
        paddingTop: THEME.spacing.xxl,

        alignItems: 'center',
    },

    heroTopRow: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    backButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: 'rgba(255,255,255,0.14)',

        justifyContent: 'center',
        alignItems: 'center',
    },

    backIcon: {
        color: THEME.colors.white,

        fontSize: 32,
        lineHeight: 34,

        marginTop: -3,
    },

    shareButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: 'rgba(255,255,255,0.14)',

        justifyContent: 'center',
        alignItems: 'center',
    },

    shareIcon: {
        color: THEME.colors.white,

        fontSize: 22,
    },

    heroIcon: {
        width: 96,
        height: 96,

        borderRadius: 48,

        backgroundColor: 'rgba(255,255,255,0.14)',

        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 18,
    },

    heroEmoji: {
        fontSize: 46,
    },

    main: {
        paddingHorizontal: THEME.spacing.xl,

        paddingTop: THEME.spacing.xxl,
    },

    badge: {
        alignSelf: 'flex-start',

        backgroundColor: THEME.colors.accentLight,

        paddingHorizontal: THEME.spacing.md,
        paddingVertical: 6,

        borderRadius: THEME.radii.pill,

        marginBottom: THEME.spacing.md,
    },

    badgeText: {
        ...THEME.typography.caption,

        color: THEME.colors.accent,

        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },

    title: {
        ...THEME.typography.largeTitle,

        color: THEME.colors.textPrimary,

        marginBottom: THEME.spacing.lg,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingBottom: THEME.spacing.xl,

        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.borderSoft,
    },

    locationIcon: {
        fontSize: 20,

        marginRight: THEME.spacing.md,
    },

    locationTitle: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textPrimary,
    },

    locationSubtitle: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginTop: 2,
    },

    infoGrid: {
        flexDirection: 'row',

        gap: THEME.spacing.sm,

        marginTop: THEME.spacing.xl,
    },

    infoCard: {
        flex: 1,

        backgroundColor: THEME.colors.white,

        borderRadius: THEME.radii.lg,

        padding: THEME.spacing.md,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,
    },

    infoIcon: {
        fontSize: 18,

        marginBottom: THEME.spacing.sm,
    },

    infoLabel: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginBottom: 2,
    },

    infoValue: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textPrimary,
    },

    section: {
        marginTop: THEME.spacing.xxl,
    },

    sectionTitle: {
        ...THEME.typography.subtitle,

        color: THEME.colors.textPrimary,

        marginBottom: THEME.spacing.md,
    },

    description: {
        ...THEME.typography.body,

        color: THEME.colors.textSecondary,

        lineHeight: 22,
    },

    audienceCard: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: THEME.colors.white,

        borderRadius: THEME.radii.lg,

        padding: THEME.spacing.md,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,
    },

    audienceIcon: {
        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: THEME.colors.primaryLight,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: THEME.spacing.md,
    },

    audienceContent: {
        flex: 1,
    },

    audienceTitle: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textPrimary,
    },

    audienceSubtitle: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginTop: 2,
    },

    capacityCard: {
        backgroundColor: THEME.colors.white,

        borderRadius: THEME.radii.lg,

        padding: THEME.spacing.lg,

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,
    },

    capacityTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: THEME.spacing.md,
    },

    capacityText: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textPrimary,
    },

    capacityRemaining: {
        ...THEME.typography.caption,

        color: THEME.colors.primary,
    },

    progressBackground: {
        height: 8,

        borderRadius: 4,

        backgroundColor: THEME.colors.primaryLight,

        overflow: 'hidden',
    },

    progress: {
        height: '100%',

        borderRadius: 4,

        backgroundColor: THEME.colors.primary,
    },

    bottomBar: {
        position: 'absolute',

        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: THEME.colors.white,

        borderTopWidth: 1,
        borderTopColor: THEME.colors.borderSoft,

        paddingHorizontal: THEME.spacing.xl,
        paddingVertical: THEME.spacing.md,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    bottomLabel: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,
    },

    bottomSpots: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.primary,

        marginTop: 2,
    },

    joinButton: {
        backgroundColor: THEME.colors.accent,

        paddingHorizontal: THEME.spacing.xxl,
        paddingVertical: THEME.spacing.md,

        borderRadius: THEME.radii.lg,
    },

    joinButtonDisabled: {
        backgroundColor: THEME.colors.textLight,
    },

    joinButtonText: {
        ...THEME.typography.button,

        color: THEME.colors.white,
    },
});