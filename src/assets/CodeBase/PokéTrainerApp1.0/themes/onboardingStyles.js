import { StyleSheet, } from 'react-native';

// palette is kept as a separate variable to make it easy to change colours
export const themePalette = {
    primary: '#440e62',
    primaryDarker: '#310649',
    primaryLighter: '#872cba',
    alternate: '#ded000',
    grey: '#aaaaaa',
    greyDarker: '#888888',
    greyLighter: '#cccccc'
}

export const onbStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    imageSection: {
        flex: 3,
        marginTop: 10
    },

    featImage: {
        aspectRatio: 1,
        width: '100%',
    },

    copySection: {
        flex: 3,
    },

    uiSection: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonContainer: {
        width: '50%',
        paddingLeft: 15,
        paddingRight: 15,
    }
});