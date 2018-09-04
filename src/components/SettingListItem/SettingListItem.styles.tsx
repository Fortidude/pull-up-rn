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
            marginLeft: 24,
            width: 24,
            alignItems: 'center',
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
            marginLeft: 24,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        centerText: {
            fontSize: theme.fonts.fontH3Size
        },
        centerSubText: {
            fontSize: theme.fonts.fontH5Size,
            color: theme.colors.subTextColor,
            marginTop: 2
        },
        rightAdditionalContainer: {
            flex: 2,
            paddingRight: 24,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        rightTextIconContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightText: {
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.listItemRightIconColor,
            marginRight: -10
        },
        rightArrowIcon: {
            alignSelf: 'center',
            color: theme.colors.listItemRightIconColor,
            fontSize: 50,
            marginRight: -18,
            paddingTop: 4
        },
        rightCheckIcon: {
            alignSelf: 'center',
            color: theme.colors.main,
            fontSize: 10,
            paddingTop: 4
        }
    };
}

export default getStyle;
