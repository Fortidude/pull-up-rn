import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ThemeInterface } from '../../assets/themes';

const isIphoneX = () => {
    const { height, width } = Dimensions.get('window');
    return (Platform.OS === 'ios' && (height === 812 || width === 812));
}

function getStyle(theme: ThemeInterface) {
    return {
        header: {
            flexDirection: 'row',
            height: isIphoneX() ? 80 : 64,
            backgroundColor: theme.colors.backgroundColor,
            position: "relative",
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderDarkColor
        },

        left: {
            container: {
                flex: 1,
                // borderColor: 'red',
                paddingLeft: 7,
                marginBottom: 13,
                justifyContent: 'flex-end',
            },
            backButton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
            },
            icon: { marginLeft: -15, marginRight: -15, marginTop: 2, marginBottom: -13 }
        },
        center: {
            container: {
                flex: 1,
                marginBottom: 13,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            text: { fontSize: theme.fonts.fontSize }
        },
        right: {
            container: {
                flex: 1,
                marginBottom: 13,
                justifyContent: 'flex-end',
            }
        }
    };
}

export default getStyle;
