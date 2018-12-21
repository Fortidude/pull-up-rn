import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const size = width / 3;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.modalBackgroundColor,
            position: 'absolute',
            height: size,
            width: size,
            top: -(size / 2),
            left: -(size / 2),
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        
        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.subTextColor,

            position: 'absolute',
            top: 5,
            width: size,
            textAlign: 'center'
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor
        }
    };
}

export default getStyle;
