import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
    },

    greenBlob: {
        position: 'absolute',

        width: 300,
        height: 300,
        borderRadius: 150,

        backgroundColor: 'rgba(46, 90, 68, 0.08)',

        top: -130,
        right: -110,
    },

    terracottaBlob: {
        position: 'absolute',

        width: 250,
        height: 250,
        borderRadius: 125,

        backgroundColor: 'rgba(224, 122, 95, 0.07)',

        bottom: 40,
        left: -130,
    },

    smallGreenBlob: {
        position: 'absolute',

        width: 130,
        height: 130,
        borderRadius: 65,

        backgroundColor: 'rgba(46, 90, 68, 0.05)',

        top: 320,
        right: -50,
    },
});