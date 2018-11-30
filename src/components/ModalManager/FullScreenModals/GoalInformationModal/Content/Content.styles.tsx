import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {

        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            height: HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT
        },
        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor
        },
        subtitle: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.subTextColor
        }
    };
}

export default getStyle;
