import { ThemeInterface } from '../../../assets/themes';

function getStyle(theme: ThemeInterface) {
    return {
        swipeout: {
            backgroundColor: theme.colors.cardBackgroundColor,
        },
        exerciseContainer: {
            backgroundColor: 'transparent',
            height: 70,
            flexDirection: 'row'
        },
        mockContainer: {
            backgroundColor: theme.colors.cardBackgroundColor
        },
        plusIconContainer: {
            flex: 2,
            height: 71,
            bottom: -1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
        },
        plusIconView: {
            marginLeft: -22,
            transform: [{ rotate: '45deg' }]
        },
        mockPlusIconView: {
            marginLeft: -22
        },
        summaryContent: {
            height: 70,
            paddingRight: 18,
            flexDirection: 'row',
            flex: 7,
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor,
            backgroundColor: 'transparent',
        },
        progressBar: {
            height: 0,
            position: 'absolute',
            bottom: -theme.borders.borderWidth,
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.colors.main
        },
        summaryLeftContent: {
            justifyContent: 'center',
            backgroundColor: 'transparent',
            flex: 4
        },
        summaryRightContent: {
            justifyContent: 'center',
            backgroundColor: 'transparent',
            alignItems: 'flex-end',
            flex: 3
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
        infoTitleTopContainer: {
            flexDirection: 'row'
        },
        infoTitleTop: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            lineHeight: 22
        },
        infoTitleBottomContainer: {
            flexDirection: 'row'
        },
        infoTitleBottomContainerTimeAgo: {
            flex: 1,
            marginLeft: -2,
            borderColor: 'red', 
            alignItems: 'center',
            flexDirection: 'row', 
            justifyContent: 'flex-start',
        },
        infoTitleBottom: {
            fontSize: theme.fonts.fontH4Size,
            fontFamily: theme.fonts.mainFontFamily,
            color: theme.colors.subTextColor,
            lineHeight: 22,
           // textAlign: 'right'
        },
        buttonReorderContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
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
            flex: 1,
            flexDirection: 'row'
        },
        iconRemove: {
            color: theme.colors.danger,
            fontSize: 20,
        },
        showDetailsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        iconShowDetailsReached: {
            color: theme.colors.success,
            fontSize: 20
        },
        iconShowDetails: {
            color: theme.colors.subTextColor,
            fontSize: 20,
            opacity: 0.5
        }
    };
}

export default getStyle;
