import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            borderTopColor: theme.borders.borderLightColor,
            borderTopWidth: theme.borders.borderWidth,
            height: 44,
            width: '100%',
            flexDirection: 'row'
        },
        leftButton: {
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            text: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
            }
        },
        betweenButtons: {
            width: theme.borders.borderWidth,
            backgroundColor: theme.borders.borderLightColor
        },
        rightButton: {
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            text: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
                fontWeight: '400',
                color: theme.colors.main
            }
        }
    };
}

export default getStyle;
