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

        header: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
            paddingHorizontal: 10
        },

        title: {
            flex: 2,
            marginLeft: 10,
            alignSelf: 'flex-start',
            color: theme.colors.textColor,
            fontSize: theme.fonts.fontH1Size,
            fontFamily: theme.fonts.mainFontFamily
        },

        todayButton: {
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: theme.borders.borderColor,
                borderWidth: theme.borders.borderWidth,
                backgroundColor: theme.colors.buttonBigBackgroundColor
            },
            text: {
                color: theme.colors.textColor,
                fontSize: theme.fonts.fontH3Size,
                fontFamily: theme.fonts.mainFontFamily
            }
        }
    };
}

export default getStyle;
