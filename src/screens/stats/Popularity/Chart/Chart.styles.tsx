import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

function getStyle(theme: ThemeInterface) {
    return {
        label: {
            fontSize: theme.fonts.fontSize,
            fontFamily: theme.fonts.mainFontFamily,
            fill: theme.colors.white
        }
    };
}

export default getStyle;
