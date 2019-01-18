import { ThemeInterface } from 'src/assets/themes';
import { StyleSheet } from 'react-native';

const width = 375;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            position: 'absolute',
            height: width,
            width: width * 0.75,
            borderRadius: 15,
            flexDirection: 'column',
            alignItems: 'center'
        },

        bellContanier: {
            position: 'absolute',
            top: 0,
            height: 200,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },

        textContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },

        text: {
            fontFamily: theme.fonts.montserratFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor,
            marginRight: 2
        },

        buttonContainer: {
            height: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: StyleSheet.hairlineWidth * 2,
            borderRadius: 25
        },
    
        buttonText: {
            fontSize: 18,
            color: 'white',
            fontFamily: 'Avenir-Light'
        }
    };
}

export default getStyle;
