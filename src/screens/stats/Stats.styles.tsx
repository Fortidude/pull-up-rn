import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

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
            marginBottom: FOOTER_HEIGHT
        },
        effectivenessListContainer: {
            marginBottom: FOOTER_HEIGHT,
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
        }
    };
}

export default getStyle;
