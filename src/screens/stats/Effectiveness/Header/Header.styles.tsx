import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            backgroundColor: theme.colors.headerBackgroundColor,
            flexDirection: 'row',
            top: 0,
            height: 130,
            width: WIDTH,
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },

        right: {
            padding: 10,
            width: WIDTH - 116
        },
        left: {
            width: 130,
            height: '100%',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center'
        },

        title: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.statsHeaderTeextColor || theme.colors.textColor,
        },
        buttons: {
            container: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end'
            },
            buttonContainer: {
                flex: 1
            },
            buttonLabel: {
                textTransform: 'uppercase',
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH5Size - 1,
                color: theme.colors.statsHeaderTextColor || theme.colors.subTextColor,
                marginBottom: 2,
                marginLeft: 2
            },
            buttonLabelArrowColor: theme.colors.statsHeaderTextColor || theme.colors.subTextColor,
            button: {
                flexDirection: 'row',
                backgroundColor: theme.colors.statisticsButtonBackground,
                paddingVertical: 4,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: theme.colors.shadowColor,
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 3,
                borderRadius: 3,
                marginBottom: 0,
                borderWidth: 0
            },
            buttonText: {
                fontFamily: theme.fonts.mainFontFamily,
                fontSize: theme.fonts.fontH4Size + 1,
                color: theme.colors.textColor
            },
            buttonTextActive: {
                color: theme.colors.main
            }
        }
    };
}

export default getStyle;
