import { ThemeInterface } from '../../assets/themes';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        background: {
            flex: 1
        },
        container: {
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: theme.dimensions.authContentWidth
        },
        container_content: {
            marginTop: HEADER_HEIGHT,
            paddingTop: HEIGHT >= 812 ? 100 : 20,
            width: '100%',
            flex: 3,
            justifyContent: 'flex-start',
        },
        container_footer: {
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        passwordReminderButton: {
            alignSelf: 'flex-end'
        },
        passwordReminderButtonText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.linkSmallFontSize,
            color: theme.colors.linkSmallColor,
        },
        theButtonBelowMainButton: {
            marginTop: 20
        },
        theButtonBelowMainButtonText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.buttonBigFontSize,
            color: theme.colors.linkSmallColor
        }
    };
}

export default getStyle;
