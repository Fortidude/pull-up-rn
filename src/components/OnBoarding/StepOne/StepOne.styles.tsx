import { ThemeInterface } from 'src/assets/themes';

const width = 375;
function getStyle(theme: ThemeInterface) {
    return {
        container: {
            position: 'absolute',
            width: width * 0.75,
            height: width,
            borderRadius: 15,
           // borderWidth: theme.borders.borderWidth,
           // borderColor: theme.borders.borderColor,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column'
        },

        title: {
            marginTop: 40,
            marginBottom: 60,
            letterSpacing: 2,
            color: '#FFF',
            fontSize: theme.fonts.fontH1Size,
            fontFamily: theme.fonts.mainFontFamily
        },

        text: {
            fontFamily: theme.fonts.montserratFontFamily,
            fontSize: theme.fonts.fontH3Size - 2,
            color: '#FFF'
        },

        textIcon: {
            position: 'absolute',
            width: width/2,
            marginLeft: 30,
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            color: '#FFF'
        },

        icons: {
            marginBottom: 15,
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-evenly'
        },

        topLogo: {
            container: {
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: -75
            },

            imageContainer: {
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            },

            image: { width: 150, height: 150 },

            flashOverlay: {
                backgroundColor: '#FFC820',
                opacity: 0.5,
                position: 'absolute',
                height: '200%',
                width: 10,
                right: -20
            },

            overlay: {
                height: 150,
                width: 150,
                backgroundColor: '#FFF',
            }
        },

        content: {
            flex: 1,
            width: '100%',
            alignItems: 'center'
        }
    };
}

export default getStyle;
