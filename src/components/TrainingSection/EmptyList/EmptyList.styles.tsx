import { ThemeInterface } from 'src/assets/themes';
import { StyleSheet, Dimensions } from 'react-native';

import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

export const EMPTY_LIST_HEIGHT = Dimensions.get('window').height - HEADER_HEIGHT - (FOOTER_HEIGHT*2)

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            height: EMPTY_LIST_HEIGHT,
            position: 'relative',
           // borderColor: 'red', borderWidth: 1
        },

        formContainer: {
         //   height: EMPTY_LIST_HEIGHT / 3,
            justifyContent: 'center',
            width: '100%',
           // borderColor: 'red', borderWidth: 1
        },

        buttonContainer: {
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          //  borderColor: 'red', borderWidth: 1
        },

        first_button: {
            borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: 2,
            borderTopLeftRadius: 10, borderTopRightRadius: 10,
            borderColor: theme.borders.borderLightColor
        },

        middle_button: {
            borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 2,
            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
            borderColor: theme.borders.borderLightColor
        },

        last_button: {
            borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 2,
            borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
            borderColor: theme.borders.borderLightColor
        },

        form: {
            label: {
                fontSize: theme.fonts.fontSize,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formLabelColor,
                marginBottom: 5
            }
        },

        infoText: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
        },

        headerText: {
            fontSize: theme.fonts.fontH2Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
        },

        text: {
            fontSize: theme.fonts.fontSize,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.textColor,
        }
    };
}

export default getStyle;
