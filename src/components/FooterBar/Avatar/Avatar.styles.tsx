import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        footerAvatar: {
            backgroundColor: theme.colors.plannerFooterAvatarBackground,
            height: 69.1,
            width: 69.1,
            borderRadius: 35,
            bottom: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        footerAvatarShadow: {
            shadowColor: theme.colors.plannerFooterAvatarShadow,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10
        },
        icon: {
            color: 'white'
        },
        cameraIcon: {
            position: 'absolute',
            top: -10,
            right: -10
        },
        image: {
            width: 70,
            height: 70,
            borderRadius: 35
        }
    };
}

export default getStyle;
