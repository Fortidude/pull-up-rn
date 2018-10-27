import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from '../FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from '../Header/Header.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center'
        },

        title: {
            fontSize: theme.fonts.fontH1Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
            alignSelf: 'flex-start',
            marginLeft: 20,
            marginVertical: 10
        }
    };
}

export default getStyle;
