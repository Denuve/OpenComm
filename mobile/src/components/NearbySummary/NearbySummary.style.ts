import { StyleSheet } from 'react-native';

import { THEME } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: THEME.spacing.xl,
        marginTop: THEME.spacing.xl,

        padding: THEME.spacing.lg,

        borderRadius: THEME.radii.xl,

        backgroundColor: THEME.colors.primary,

        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: THEME.colors.primary,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,

        elevation: 4,
    },

    iconContainer: {
        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: 'rgba(255,255,255,0.15)',

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: THEME.spacing.md,
    },

    icon: {
        fontSize: 20,
    },

    content: {
        flex: 1,
    },

    title: {
        ...THEME.typography.bodyMedium,

        color: THEME.colors.white,

        marginBottom: 3,
    },

    subtitle: {
        ...THEME.typography.caption,

        color: 'rgba(255,255,255,0.72)',
    },

    arrow: {
        color: THEME.colors.white,

        fontSize: 22,

        marginLeft: THEME.spacing.sm,
    },
});