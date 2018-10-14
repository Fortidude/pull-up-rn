import { StyleSheet } from 'react-native';

const mainColor = '#FF9500';
const redColor = '#FF3B30';
const blueColor = '#007AFF';
const yellowColor = '#FF9500';
const greyColor = '#a9a9a9';
const greenColor = '#27AE60';

const mainFontFamily = "Avenir-Light";

const colors = {
    main: mainColor,
    danger: redColor,
    warning: yellowColor,
    success: greenColor,
    blue: blueColor,

    white: '#ffffff',

    textColor: '#ffffff',
    subTextColor: greyColor,
    disableText: greyColor,

    backgroundColor: '#000000',
    cardBackgroundColor: '#000000',
    greyBackgroundColor: '#333333',
    headerBackgroundColor: '#141414',
    footerBackgroundColor: '#141414',
    modalBackgroundColor: '#141414',

    plannerProgressBarBackgroundColor: '#141414',

    borderColor: 'rgba(255,255,255, 0.2)',
    borderLightColor: 'rgba(255,255,255, 0.13)',
    borderDarkColor: 'rgba(112, 112, 112, 0.5)',

    shadowColor: 'rgba(49,49,49, 0.7)',
    modalOverlayBackgroundColor: 'rgba(0,0,0, 0.6)',
    modalOverlayBackgroundColorLight: 'rgba(0,0,0, 0.3)',

    plannerFooterButtonColor: greyColor,
    plannerFooterAvatarBackground: 'rgba(189, 189, 189, 0.8)',
    plannerFooterAvatarShadow: 'rgba(49,49,49, 0.7)',

    authInputBackground: 'rgba(124,152,253, 0.87)',
    authInputTextColor: '#FFF',
    authInputPlaceholderTextColor: '#E5E5E5',

    formLabelColor: '#a1a1a3',
    formInputBackground: '#09090a',
    formInputTextColor: '#ffffff',
    formInputPlaceholderTextColor: greyColor,

    buttonBigBackgroundColor: '#FFFFFF',
    buttonBigShadowColor: '#000000',
    buttonBigTextColor: mainColor,

    linkSmallColor: '#FFF',

    spinnerColor: mainColor,

    listItemRightIconColor: greyColor,

    calendarMonthsBarBackground: '#FFFFFF'
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderLightColor: colors.borderLightColor,
    borderDarkColor: colors.borderDarkColor,

    headerBorderBottomWidth: 0,

    modalRadius: 15
};

const fonts = {
    mainFontFamily: mainFontFamily,

    fontSize: 17,

    fontH1Size: 20,
    fontH3Size: 15,
    fontH4Size: 12,
    fontH5Size: 10,
    fontH6Size: 7,

    inputFontSize: 18,
    buttonBigFontSize: 18,
    linkSmallFontSize: 14
};

const dimensions = {
    authContentWidth: 295
};

export default {
    name: 'dark',
    statusBarStyle: 'light-content',
    keyboardAppearance: 'dark',
    colors,
    borders,
    fonts,
    dimensions
}
