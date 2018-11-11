import { ThemeInterface } from '../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            width: '100%',
            height: 54,
            backgroundColor: theme.colors.settingsItemBackground
        },
        bottomBorderLine: {
            position: 'absolute',
            bottom: 0,
            height: 0,
            width: '100%',
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderLightColor
        },
        bottomBorderLineLastOnList: {
            marginLeft: 24
        },
        placeholderContainer: {
            width: '100%',
            height: 40,
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },
        leftIconContainer: {
            marginLeft: 24,
            width: 24,
            alignItems: 'center',
            justifyContent: 'center',
            height: 54
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
            paddingLeft: 24,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        centerText: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: theme.colors.textColor
        },
        centerSubText: {
            fontFamily: theme.fonts.mainFontFamily,
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
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH4Size,
            color: theme.colors.listItemRightIconColor,
            marginRight: -10,
            marginLeft: 10
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
        },
        rightPlaceholder: {
            width: 13
        },
    };
}

export default getStyle;
