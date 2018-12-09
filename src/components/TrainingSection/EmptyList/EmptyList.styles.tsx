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
            height: EMPTY_LIST_HEIGHT
        },

        formContainer: {
            height: EMPTY_LIST_HEIGHT / 3,
            width: '100%',
           // alignItems: 'center',
            justifyContent: 'center',
        },

        buttonContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },

        form: {
            label: {     
                fontSize: theme.fonts.textSize,
                fontFamily: theme.fonts.mainFontFamily,
                color: theme.colors.formLabelColor,
                marginBottom: 5
            }
        },

        infoText: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
        }
    };
}

export default getStyle;
