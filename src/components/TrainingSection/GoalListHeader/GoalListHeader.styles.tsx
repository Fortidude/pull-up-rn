import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        trainingHeaderContainer: {
            backgroundColor: 'transparent',
            height: 48,
            marginTop: 15,
            marginBottom: 5,
            width: '100%',
            flexDirection: 'row',
            // borderColor: 'red',
            // borderWidth: 1
        },
        title: {
            fontSize: theme.fonts.fontH3Size - 1,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
            alignSelf: 'center',
            fontWeight: '700',
            flex: 1,
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
            marginRight: -13
        }
    };
}

export default getStyle;