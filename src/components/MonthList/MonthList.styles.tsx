import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from '../FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from '../Header/Header.styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: 'transparent',
            height: HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center'
        },
        
        monthItem: {
            container: {
                width: WIDTH
            },
        },

        weekItem: {
            headerContainer: {
                height: 20,
                marginTop: 10,
                marginBottom: 10
            },
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
                shadowOffset: {width: 0, height: 3},
                shadowRadius: 6
            },
            
            mediumDensityText: {
                color: theme.colors.inverseTextColor
            },

            text: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH1Size,
                color: theme.colors.textColor
            }
        },

        dayName: {
            container: {
                width: 53,
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
        },

        dayModalItem: {
            backgroundColor: theme.colors.modalBackgroundColor,
            position: 'absolute'
        }
    };
}

export default getStyle;
