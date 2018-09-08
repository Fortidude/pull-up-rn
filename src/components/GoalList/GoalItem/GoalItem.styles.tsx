import { StyleSheet } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        swipeout: {
            backgroundColor: 'transparent',

            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },
        exerciseContainer: {
            backgroundColor: 'transparent',
            height: 70,
            flexDirection: 'row'
        },
        plusIconContainer: {
            width: 70,
            height: 71,
            bottom: -1,
            //position: 'absolute'
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },
        plusIconView: {
            marginLeft: -22,
            transform: [{ rotate: '45deg' }],
        },
        summaryContent: {
            height: 70,
            width: '100%',
            paddingRight: 18,
            flexDirection: 'row',
            flex: 1
        },
        summaryLeftContent: {
            justifyContent: 'center',
            flex: 1
        },
        summaryRightContent: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1
        },
        title: {
            fontSize: theme.fonts.fontH3Size,
            fontFamily: theme.fonts.mainFontFamily,
            fontWeight: '500',
            color: theme.colors.textColor,
            lineHeight: 22
        },
        subTitle: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            lineHeight: 22
        },
        infoTitleTop: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            lineHeight: 22
        },
        infoTitleBottom: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            lineHeight: 22
        },
        buttonReorderContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        iconReorder: {
            transform: [{rotate: '90deg'}],
            color: theme.colors.warning,
            fontSize: 20,
        },
        buttonRemoveContainer: {
            justifyContent: 'center',
            alignItems: 'center',

            flexDirection: 'row'
        },
        iconRemove: {
            color: theme.colors.danger,
            fontSize: 20,
        }
    };
}

export default getStyle;
