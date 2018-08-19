import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backgroundImage: './../../../assets/images/background-light.jpg',
        background: {
            flex: 1,
        },
        container: {
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: theme.dimensions.authContentWidth
        },
        container_content: {
            flex: 3,
            width: '100%',
            justifyContent: 'flex-start',
            paddingTop: 150
        },
        container_footer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: 20
        },
        passwordReminderButton: {
            alignSelf: 'flex-end'
        },
        passwordReminderButtonText: {
            fontSize: theme.fonts.linkSmallFontSize,
            color: theme.colors.linkSmallColor,
        },
        registerButton: {
            marginTop: 20
        },
        registerButtonText: {
            fontSize: theme.fonts.buttonBigFontSize,
            color: theme.colors.linkSmallColor
        }
    };
}

export default getStyle;
