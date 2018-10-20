import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingBottom: 13
        },
        icon: {
            marginLeft: -15,
            marginRight: -15,
       //     marginBottom: -14,
            marginTop: 20,
            color: theme.colors.textColor
        }
    };
}

export default getStyle;
