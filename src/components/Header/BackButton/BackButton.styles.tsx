import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        backButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
        },
        icon: { marginLeft: -15, marginRight: -15, marginTop: 2, marginBottom: -13 }
    };
}

export default getStyle;
