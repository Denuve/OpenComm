import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.spacing.xl,

        paddingVertical: THEME.spacing.lg,

        gap: THEME.spacing.sm,
    },

    filter: {
        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.sm,

        borderRadius: THEME.radii.pill,

        backgroundColor: 'rgba(255,255,255,0.8)',

        borderWidth: 1,
        borderColor: THEME.colors.borderSoft,
    },

    filterSelected: {
        backgroundColor: THEME.colors.primary,

        borderColor: THEME.colors.primary,
    },

    filterText: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.textSecondary,
    },

    filterTextSelected: {
        color: THEME.colors.white,
    },
});