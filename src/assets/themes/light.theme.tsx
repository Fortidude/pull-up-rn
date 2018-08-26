import {StyleSheet} from 'react-native';

const mainColor = '#4E43F9';
const redColor = '#FF3B30'
const greyColor = '#707070';

const mainFontFamily = "Avenir-Light";

const colors = {
    main: mainColor,
    danger: redColor,

    textColor: '#000000',
    subTextColor: greyColor,

    backgroundColor: '#F7F7F7',
    cardBackgroundColor: '#FFF',
    greyBackgroundColor: '#F4F6F7',

    borderColor: 'rgba(112, 112, 112, 0.2)',
    borderDarkColor: 'rgba(112, 112, 112, 0.5)',

    plannerFooterButtonColor: greyColor,
    plannerFooterAvatarBackground: 'rgba(189, 189, 189, 0.8)',
    plannerFooterAvatarShadow: '#000000',

    inputBackground: 'rgba(124,152,253, 0.87)',
    inputTextColor: '#FFF',
    inputPlaceholderTextColor: '#E5E5E5',

    buttonBigBackgroundColor: '#FFFFFF',
    buttonBigShadowColor: '#000000',
    buttonBigTextColor: mainColor,

    linkSmallColor: '#FFF',

    spinnerColor: mainColor,
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderDarkColor: colors.borderDarkColor
};

const fonts = {
    mainFontFamily: mainFontFamily,

    fontSize: 17,
    fontSmallSize: 15,
    fontExtraSmallSize: 12,

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
