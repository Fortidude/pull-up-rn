import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { FOOTER_HEIGHT, FOOTER_IPHONE_X_PADDING } from 'src/components/FooterBar/FooterBar.styles';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const isIphoneX = DetermineDevice.isIphoneX();

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.colors.nativeBackgroundColor
        },

        loadingContainer: {
            height: HEIGHT / 2,
            justifyContent: 'center',
            alignItems: 'center'
        },

        popularityContainer: {
            height: HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT,
            marginBottom: FOOTER_HEIGHT,
            paddingBottom: isIphoneX ? FOOTER_IPHONE_X_PADDING : 0,
        },
        effectivenessListContainer: {
            marginBottom: FOOTER_HEIGHT,
            paddingBottom: isIphoneX ? FOOTER_IPHONE_X_PADDING : 0,
        },
        popularity: {
            listContainer: {
                flex: 3,
                borderBottomColor: theme.borders.borderColor,
                borderBottomWidth: theme.borders.borderWidth
            },
            chartContainer: {
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        progressContainer: {
            marginBottom: FOOTER_HEIGHT,
            paddingBottom: (isIphoneX ? FOOTER_IPHONE_X_PADDING : 0),
            justifyContent: 'center',
            flex: 1
        }
    };
}

export default getStyle;
