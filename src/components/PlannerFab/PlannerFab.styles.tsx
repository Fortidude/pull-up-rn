import { Dimensions } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        editButtonContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingBottom: 13,
        },
        text: {
            marginLeft: 10,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.main
        },

        hamburgerContainer: {
            zIndex: 3,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 90,
            width: 90,
        },
        hamburgerInnerContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            borderRadius: 30,
            backgroundColor: theme.colors.footerBackgroundColor,
            borderColor: theme.borders.borderDarkColor,
            borderWidth: theme.borders.borderWidth,
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.2,
            shadowOffset: { width: 1, height: 1 }
        },
        line: { width: 20, height: 1, backgroundColor: theme.colors.main },

        menuContainer: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            height: 250,
            width: 180,
            paddingBottom: 50,
            backgroundColor: theme.colors.cardBackgroundColor,
            borderColor: theme.borders.borderColor,
            borderWidth: theme.borders.borderWidth,
            paddingHorizontal: 20,
            borderRadius: 30,
            borderBottomLeftRadius: 70,
            justifyContent: 'space-evenly'
        },

        menuButton: {
            flexDirection: 'row',
            backgroundColor: theme.colors.plannerFabButtonBackground,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'

        },

        menuIcon: {
            marginRight: 5,
            marginBottom: 3,
            opacity: 0.9
        },

        menuText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.plannerFabButtonText
        }
    };
}

export default getStyle;
