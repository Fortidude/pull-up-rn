import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const TILE_WIDTH = WIDTH / 7;
function getStyle(theme: ThemeInterface) {
    return {
        weekItem: {
            headerContainer: {
                height: 20,
                marginTop: 10,
                marginBottom: 10
            },
            container: {
                height: TILE_WIDTH,
                width: WIDTH,
                flexDirection: 'row',
                marginBottom: 0.5
            }
        },

        weekHeader: {
            day: {
                container: {
                    width: TILE_WIDTH,
                    height: 20,
                    marginLeft: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                text: {
                    fontFamily: theme.fonts.mainFontFamily,
                    fontSize: theme.fonts.fontH2Size,
                    color: theme.colors.textColor
                }
            }
        }
    };
}

export default getStyle;
