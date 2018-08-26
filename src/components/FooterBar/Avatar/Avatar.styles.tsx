import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        footerAvatar: {
            backgroundColor: theme.colors.plannerFooterAvatarBackground,
            height: 70,
            width: 70,
            borderRadius: 35,
            bottom: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.colors.plannerFooterAvatarShadow,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 2},
        },
        icon: {
            color: 'white'
        }
    };
}

export default getStyle;
