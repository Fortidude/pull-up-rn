import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width
const TILE_WIDTH = WIDTH / 7;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            marginLeft: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
        },

        active: {
            backgroundColor: theme.colors.modalBackgroundColor
        },

        mediumDensityOfSets: {
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: theme.colors.calendarMediumDensityBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 2,
            paddingLeft: 2,
            shadowColor: '#4E43F9',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6
        },

        mediumDensityText: {
            color: theme.colors.inverseTextColor
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH1Size,
            color: theme.colors.textColor
        },

        subText: {
            position: 'absolute',
            bottom: 0,
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.darkDanger

        }
    };
}

export default getStyle;
