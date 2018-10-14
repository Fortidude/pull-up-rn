import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: 321,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        
        monthItem: {
            container: {
                width: WIDTH
            },
        },

        weekItem: {
            container: {
                height: 53,
                width: WIDTH,
                flexDirection: 'row',
                marginBottom: 0.5
            }
        },

        dayItem: {
            container: {
                width: 53,
                height: 53,
                marginLeft: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
            },

            active: {
                backgroundColor: theme.colors.cardBackgroundColor
            },
            
            text: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH1Size,
                color: theme.colors.textColor
            }
        }
    };
}

export default getStyle;
