import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: THEME.colors.background,
    },

    listContent: {
        paddingTop: THEME.spacing.sm,
        paddingBottom: 100,
    },

    sectionHeader: {
        marginHorizontal: THEME.spacing.xl,

        marginTop: THEME.spacing.md,
        marginBottom: THEME.spacing.sm,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sectionTitle: {
        ...THEME.typography.subtitle,

        color: THEME.colors.textPrimary,
    },

    seeAll: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.primary,
    },

    createButton: {
        position: 'absolute',

        right: THEME.spacing.xl,
        bottom: 24,

        height: 56,

        paddingHorizontal: THEME.spacing.xl,

        borderRadius: 28,

        backgroundColor: THEME.colors.accent,

        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: THEME.colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        elevation: 6,
    },

    createButtonIcon: {
        color: THEME.colors.white,

        fontSize: 24,

        marginRight: 6,
    },

    createButtonText: {
        ...THEME.typography.button,

        color: THEME.colors.white,
    },

    center: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: THEME.colors.background,
    },
});