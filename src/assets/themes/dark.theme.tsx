import {StyleSheet} from 'react-native';

const colors = {
    backgroundColor: '#34495e',
    cardBackgroundColor: '#000',
    borderColor: '#928d97'
};

const borders = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderColor
};

const fonts = {
    fontSize: 17
};

export default {
    name: 'dark',
    colors,
    borders,
    fonts
}
