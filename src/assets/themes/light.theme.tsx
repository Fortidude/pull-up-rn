import {StyleSheet} from 'react-native';

const mainColor = '#4E43F9';
const redColor = '#FF3B30';
const blueColor = '#007AFF',
const yellowColor = '#FF9500';
const greyColor = '#707070';
const greenColor = '#27AE60';

const mainFontFamily = "Avenir-Light";

const colors = {
    main: mainColor,
    danger: redColor,
    warning: yellowColor,
    success: greenColor,
    blue: blueColor,

    textColor: '#000000',
    subTextColor: greyColor,
    disableText: greyColor,

    backgroundColor: '#F7F7F7',
    cardBackgroundColor: '#FFF',
    greyBackgroundColor: '#F4F6F7',

    borderColor: 'rgba(112, 112, 112, 0.2)',
    borderLightColor: 'rgba(8, 20, 31, 0.13)',
    borderDarkColor: 'rgba(112, 112, 112, 0.5)',

    shadowColor: '#000000',
    modalBackgroundColor: 'rgba(0, 0, 0, 0.4)',

    plannerFooterButtonColor: greyColor,
    plannerFooterAvatarBackground: 'rgba(189, 189, 189, 0.8)',
    plannerFooterAvatarShadow: '#000000',

    authInputBackground: 'rgba(124,152,253, 0.87)',
    authInputTextColor: '#FFF',
    authInputPlaceholderTextColor: '#E5E5E5',

    formLabelColor: '#636366',
    formInputBackground: '#ffffff',
    formInputTextColor: '#000000',
    formInputPlaceholderTextColor: greyColor,

    buttonBigBackgroundColor: '#FFFFFF',
    buttonBigShadowColor: '#000000',
    buttonBigTextColor: mainColor,

    linkSmallColor: '#FFF',

    spinnerColor: mainColor,

    listItemRightIconColor: greyColor
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderLightColor: colors.borderLightColor,
    borderDarkColor: colors.borderDarkColor
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

export default{
    name: 'light',
    colors,
    borders,
    fonts,
    dimensions
}
