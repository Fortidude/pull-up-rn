import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            width: '100%',
            height: 54,
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },
        leftIconContainer: {
            
            paddingLeft: 24,
            paddingRight: 24,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        leftIcon: {
            color: theme.colors.main,
            fontSize: 20,
        },
        leftIconDanger: {
            color: theme.colors.danger
        },
        centerTextContainer: {
            flex: 3,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        centerText: {
            fontSize: theme.fonts.fontSmallSize
        },
        rightAdditionalContainer: {
            flex: 2,
            marginRight: 24,
            alignItems: 'flex-end',
            justifyContent: 'center'
        }
    };
}

export default getStyle;
