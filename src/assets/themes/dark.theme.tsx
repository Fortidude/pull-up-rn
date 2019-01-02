import { StyleSheet } from 'react-native';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const isSmallScreen = DetermineDevice.isSmallScreen();

const mainColor = '#FF9500';
const redColor = '#FF3B30';
const darkRedColor = '#C0392B';
const blueColor = '#007AFF';
const yellowColor = '#FF9500';
const greyColor = '#a9a9a9';
const greenColor = '#27AE60';
const nativeBackgroundColor = '#000000';

const lightGreenColor = '#76D7C4';
const lightBlueColor = '#7FB3D5';
const orangeColor = '#FF9500';
const lightOrangeColor = '#F0B27A';

const mainFontFamily = "Avenir-Light";

const colors = {
    main: mainColor,
    danger: redColor,
    darkDanger: darkRedColor,
    warning: yellowColor,
    success: greenColor,
    blue: blueColor,

    nativeBackgroundColor: nativeBackgroundColor,

    white: '#ffffff',

    textColor: '#ffffff',
    inverseTextColor: '#000000',
    subTextColor: greyColor,
    disableText: greyColor,

    loaderPlaceholderTextColor: '#141414',
    loaderPlaceholderTextColorInverse: '#282828',

    backgroundColor: '#000000',
    cardBackgroundColor: '#000000',
    greyBackgroundColor: '#333333',
    headerBackgroundColor: '#141414',
    footerBackgroundColor: '#141414',
    modalBackgroundColor: '#141414',

    plannerProgressBarBackgroundColor: '#141414',
    statisticProgressBackgroundColor: '#101010',
    
    settingsItemBackground: '#101010',

    borderColor: 'rgba(255,255,255, 0.2)',
    borderLightColor: 'rgba(255,255,255, 0.13)',
    borderDarkColor: 'rgba(112, 112, 112, 0.5)',
    borderDarkerColor: 'rgba(80, 80, 80, 0.5)',

    shadowColor: 'rgba(49,49,49, 0.7)',
    circleProgressShadowColor: 'rgba(49, 49, 49, 1)',
    modalOverlayBackgroundColor: 'rgba(0,0,0, 0.8)',
    modalOverlayBackgroundColorLight: 'rgba(0,0,0, 0.3)',

    plannerFooterButtonColor: greyColor,
    plannerFooterAvatarBackground: 'rgba(189, 189, 189, 0.8)',
    plannerFooterAvatarShadow: 'rgba(49,49,49, 0.7)',
    plannerFooterCircleProgressBackground: '#141414',

    authInputBackground: '#141414',
    authInputTextColor: '#FFF',
    authInputBorderColor: 'rgba(255,255,255, 0.5)',
    authInputPlaceholderTextColor: 'rgba(255,255,255, 0.5)',
    authPreviousUserItemBackground: "#141414",
    authPreviousUserItemBorderColor: "rgba(255,255,255, 0.2)",

    formLabelColor: '#a1a1a3',
    formInputBackground: '#09090a',
    formInputTextColor: '#ffffff',
    formInputPlaceholderTextColor: greyColor,

    statisticsButtonBackground: '#000000',

    buttonBigBackgroundColor: '#141414',
    buttonBigBorderColor: 'rgba(255,255,255, 0.2)',
    buttonBigShadowColor: 'transparent',
    buttonBigTextColor: mainColor,

    calendarTodayButtonColor: mainColor,
    calendarTodayButtonBackground: '#141414',
    calendarTodayButtonBorderColor: 'transparent',
    calendarMediumDensityBackgroundColor: '#76D7C4',
    
    barChartBackground: 'transparent',
    barChartColor: lightGreenColor,
    barChartColorActive: orangeColor,
    barChartSubColor: lightBlueColor,

    valueSliderBackgroundFilled: greyColor,
    valueSliderBackground: '#101010',
    valueSlider: mainColor,

    difficultyOne: greenColor,
    difficultyTwo: orangeColor,
    difficultyThree: redColor,

    linkSmallColor: '#FFF',

    spinnerColor: mainColor,

    listItemRightIconColor: greyColor
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderLightColor: colors.borderLightColor,
    borderDarkColor: colors.borderDarkColor,

    pickerItemBorderColor: colors.borderDarkerColor,

    modalRadius: 15
};

const fonts = {
    mainFontFamily: mainFontFamily,

    fontSize: isSmallScreen ? 16 : 18,

    fontH1Size: isSmallScreen ? 19 : 21,
    fontH3Size: isSmallScreen ? 14 : 16,
    fontH4Size: isSmallScreen ? 12 : 13,
    fontH5Size: isSmallScreen ? 10 : 11,
    fontH6Size: isSmallScreen ? 7 : 8,

    inputFontSize: isSmallScreen ? 18 : 19,
    buttonBigFontSize: isSmallScreen ? 18 : 19,
    linkSmallFontSize: isSmallScreen ? 14 : 15
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
