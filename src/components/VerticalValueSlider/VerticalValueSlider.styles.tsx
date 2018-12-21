import { ThemeInterface } from 'src/assets/themes';

export const size = 26;

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            paddingTop: size / 2,
            width: size - 6,
            height: '100%'
        },

        slider: {
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            marginLeft: -3,
            backgroundColor: theme.colors.valueSlider,
            justifyContent: 'center',
            alignItems: 'center'
        },

        innerSlider: {
            backgroundColor: theme.colors.inverseTextColor,
            width: size - 4,
            height: size - 4,
            borderRadius: 11
        },

        fieldBackground: {
            backgroundColor: theme.colors.valueSliderBackground,
            borderRadius: size / 2
        },

        filled: {
            top: size / 2,
            width: size - 6,
            height: '100%',
            position: 'absolute',
            opacity: 0.1,
            backgroundColor: theme.colors.valueSliderBackgroundFilled
        }
    };
}

export default getStyle;
