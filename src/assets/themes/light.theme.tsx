import {StyleSheet} from 'react-native';

const colors = {
    backgroundColor: '#F7F7F7',
    cardBackgroundColor: '#FFF',
    borderColor: '#808080',

    inputBackground: 'rgba(124,152,253, 0.87)',
    inputTextColor: '#FFF',
    inputPlaceholderTextColor: '#E5E5E5',

    buttonBigBackgroundColor: '#FFFFFF',
    buttonBigShadowColor: '#000000',
    buttonBigTextColor: '#4E43F9',

    linkSmallColor: '#FFF'

};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor
};

const fonts = {
    fontSize: 17,
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
