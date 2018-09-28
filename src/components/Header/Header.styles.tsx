import { ThemeInterface } from '../../assets/themes';
import DetermineDevice from './../../service/helpers/DetermineDevice';

function getStyle(theme: ThemeInterface) {
    return {
        header: {
            flexDirection: 'row',
            height: DetermineDevice.isIphoneX() ? 80 : 64,
            backgroundColor: theme.colors.backgroundColor,
            position: "relative",
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderDarkColor
        },

        left: {
            container: {
                flex: 1,
                paddingLeft: 7,
                //marginBottom: 13,
                justifyContent: 'flex-end',
            }
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
                marginRight: 10,
                marginBottom: 13,
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }
        }
    };
}

export default getStyle;
