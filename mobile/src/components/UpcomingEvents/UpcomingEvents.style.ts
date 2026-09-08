import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginTop: THEME.spacing.md,
    },

    header: {
        marginHorizontal: THEME.spacing.xl,

        marginBottom: THEME.spacing.md,
    },

    title: {
        ...THEME.typography.subtitle,

        color: THEME.colors.textPrimary,
    },

    subtitle: {
        ...THEME.typography.caption,

        color: THEME.colors.textSecondary,

        marginTop: 3,
    },

    scrollContent: {
        paddingLeft: THEME.spacing.xl,
        paddingRight: THEME.spacing.xl,
    },
});