import { ThemeInterface } from '../../../assets/themes';
import DetermineDevice from './../../../service/helpers/DetermineDevice';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            height: 65,
            bottom: DetermineDevice.isIphoneX() ? 40 : 0,
            width: '100%',
            backgroundColor: theme.colors.greyBackgroundColor,
            borderTopWidth: theme.borders.borderWidth,
            borderTopColor: theme.borders.borderColor
        },
        leftSide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 23
        },
        leftMainText: {
            fontSize: theme.fonts.fontSize,
            color: theme.colors.textColor
        },
        leftSubText: {
            fontSize: theme.fonts.fontExtraSmallSize,
            color: theme.colors.subTextColor,
            marginTop: 5,
            marginBottom: 5
        },
        rightSide: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 23
        },
        rightSideText: {
            fontSize: theme.fonts.fontSize,
            color: theme.colors.danger
        },
        rightSideIcon: {
            fontSize: theme.fonts.fontSize + 3,
            color: theme.colors.danger,
            marginLeft: 5
        }
    };
}

export default getStyle;
