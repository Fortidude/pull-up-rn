import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        trainingHeaderContainer: {
            backgroundColor: 'transparent',
            height: 48,
            width: '100%',
            flexDirection: 'row',
        },
        title: {
            flex: 1,
            fontSize: theme.fonts.fontH3Size - 1,
            fontWeight: '700',
            fontFamily: theme.fonts.mainFontFamily,
            alignSelf: 'center'
        },
        toggleButton: {
            flex: 1,
            alignItems: 'flex-end',
            alignSelf: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 18
        },
        toggleIcon: {
            marginTop: -5,
            marginRight: -12
        }
    };
}

export default getStyle;