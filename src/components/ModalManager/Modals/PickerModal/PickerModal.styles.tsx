import { Dimensions } from 'react-native';
import { ThemeInterface } from 'src/assets/themes';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const MARGIN = 20;
const WIDTH = Dimensions.get('window').width - (MARGIN * 2);
const HEIGHT = Dimensions.get('window').height - 20;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            width: WIDTH,
            maxHeight: HEIGHT,
            marginLeft: MARGIN,
            marginRight: MARGIN
        },

        buttonsContainer: {
            backgroundColor: theme.colors.modalBackgroundColor,
            borderRadius: theme.borders.modalRadius,
            overflow: 'hidden'
        },

        cancelContainer: {
            marginTop: 10,
            marginBottom: DetermineDevice.isIphoneX() ? 50 : 20
        },

        button: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },

        buttonBorder: {
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
        },

        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,
            color: theme.colors.main
        },

        cancelText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontSize,  
            color: theme.colors.danger,
            fontWeight: "500" 
        }
    };
}

export default getStyle;
