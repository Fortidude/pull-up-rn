import { ThemeInterface } from 'src/assets/themes';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const HEIGHT = Dimensions.get('window').height;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flex: 1,
            justifyContent: 'center'
        },

        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },

        headerContainer: {
            justifyContent: 'center',
            position: 'absolute',
            width: '50%',
            left: '25%',
            top: -46,
        },
        headerTitle: {
            color: theme.colors.headerFontColor || theme.colors.textColor
        },

        exerciseText: {
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
            paddingBottom: 5
        },
        variantText: {
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            paddingBottom: 5
        },
        trainingText: {
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            paddingBottom: 5
        },

        form: {
            container: {
                marginTop: 20,
            },
            label: {
                fontSize: theme.fonts.fontH4Size,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formLabelColor,
                marginBottom: 1
            },
            switch: {
                container: { flexDirection: 'row' },
                left: { flex: 3 },
                right: { flex: 1, alignItems: 'flex-end' }
            }
        }
    };
}

export default getStyle;
