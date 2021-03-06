import { StyleSheet } from 'react-native';
import DetermineDevice from 'src/service/helpers/DetermineDevice';

const isSmallScreen = DetermineDevice.isSmallScreen();

//5D534E • FA803D • F4F2EC • BFBBB9 ⠀

const mainColor = '#FA803D';
const redColor = '#FF3B30';
const darkRedColor = '#C0392B';
const blueColor = '#007AFF';
const yellowColor = '#FF9500';
const greyColor = '#707070';
const greenColor = '#27AE60';
const nativeBackgroundColor = '#EFEFF4';

const lightGreenColor = '#76D7C4';
const lightBlueColor = '#7FB3D5';
const orangeColor = '#FF9500';
const lightOrangeColor = '#F0B27A';


const colors = {
    main: mainColor,
    danger: redColor,
    darkDanger: darkRedColor,
    warning: yellowColor,
    success: greenColor,
    blue: blueColor,

    softOrange: '#E67E22',
    softGreen: '#27AE60',
    softBlue: '#2980B9',
    softYellow: '#F1C40F',
    softPurple: '#9B59B6',
    
    nativeBackgroundColor: '#F4F2EC',

    white: '#ffffff',

    textColor: '#5D534E',
    inverseTextColor: '#FFF',
    subTextColor: greyColor,
    disableText: '#BFBBB9',
    statsHeaderTextColor: '#FFF',
    informationModalFontColor: redColor,

    loaderPlaceholderTextColor: '#5D534E',
    loaderPlaceholderTextColorInverse: '#fafbfb',

    backgroundColor: '#F4F2EC',
    cardBackgroundColor: '#F4F2EC',
    greyBackgroundColor: '#F4F2EC',
    headerBackgroundColor: '#332e2b',
    headerFontColor: '#F8F6F2',
    footerBackgroundColor: '#332e2b',
    footerFontColor: '#F8F6F2',
    modalBackgroundColor: '#F4F2EC',
    modalDarkBackgroundColor: '#332e2b',
    modalDarkFontColor: '#F8F6F2',

    plannerProgressBarBackgroundColor: '#332e2b',
    plannerProgressBarToggleLineColor: '#F4F2EC',
    statisticProgressBackgroundColor: '#FFFFFF',
    
    settingsItemBackground: '#FFF',

    borderColor: 'rgba(112, 112, 112, 0.2)',
    borderLightColor: 'rgba(8, 20, 31, 0.13)',
    borderDarkColor: 'rgba(112, 112, 112, 0.5)',

    shadowColor: '#000000',
    circleProgressShadowColor: '#000000',
    modalOverlayBackgroundColor: 'rgba(0, 0, 0, 0.4)',
    modalOverlayBackgroundColorLight: 'rgba(0, 0, 0, 0.2)',

    plannerFooterButtonColor: '#F8F6F2',
    plannerFooterAvatarBackground: 'rgba(189, 189, 189, 0.8)',
    plannerFooterAvatarShadow: '#000000',
    plannerFooterCircleProgressBackground: '#F7F7F7',

    authInputBackground: 'rgba(124,152,253, 0.87)',
    authInputTextColor: '#FFF',
    authInputBorderColor: 'transparent',
    authInputPlaceholderTextColor: '#E5E5E5',
    authPreviousUserItemBackground: 'rgba(255, 255, 255, 0.7)',
    authPreviousUserItemBorderColor: 'transparent',

    formLabelColor: '#636366',
    formInputBackground: '#ffffff',
    formInputTextColor: '#000000',
    formInputPlaceholderTextColor: greyColor,

    statisticsButtonBackground: '#FFFFFF',

    plannerFabButtonBackground: '#332e2b',
    plannerFabButtonText: '#F8F6F2',

    plannerFilterBackground: '#332e2b', //plannerFabButtonBackground
    plannerFilterText: '#F8F6F2', //plannerFabButtonText
    plannerFilterCloseIconBackground: '#F4F2EC', //card
    plannerFilterCloseIconText: '#332e2b',
    
    buttonBigBackgroundColor: '#FFFFFF',
    buttonBigBorderColor: 'transparent',
    buttonBigShadowColor: '#000000',
    buttonBigTextColor: mainColor,

    calendarActiveDayBackground: '#BFBBB9',
    calendarTodayButtonColor: mainColor,
    calendarTodayButtonBackground: '#FFFFFF',
    calendarTodayButtonBorderColor: 'rgba(112, 112, 112, 0.2)',
    calendarMediumDensityBackgroundColor: lightGreenColor,

    barChartBackground: '#FFF',
    barChartColor: lightGreenColor,
    barChartColorActive: orangeColor,
    barChartSubColor: lightBlueColor,

    valueSliderBackgroundFilled: '#FFFFFF',
    valueSliderBackground: '#FFFFFF',
    valueSlider: mainColor,

    difficultyOne: greenColor,
    difficultyTwo: lightOrangeColor,
    difficultyThree: redColor,

    linkSmallColor: '#FFF',

    spinnerColor: mainColor,

    listItemRightIconColor: greyColor,

    tutorialTouchIconColor: '#F8F6F2'
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor,
    borderLightColor: colors.borderLightColor,
    borderDarkColor: colors.borderDarkColor,

    informationModalBorderColor: redColor,
    pickerItemBorderColor: colors.borderLightColor,

    modalRadius: 15
};

const fonts = {
    mainFontFamily: "Avenir-Light",
    montserratFontFamily: "Montserrat-Light",

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
    name: 'cream',
    statusBarStyle: 'light-content',
    keyboardAppearance: 'dark',
    colors,
    borders,
    fonts,
    dimensions
}
