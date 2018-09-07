import { Dimensions } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

const width = Dimensions.get('window').width;
const height = 110;
const circleSize = 80;
const circlePositionFromEdge = ((width / 2) - circleSize) * 2 / 3;
const circlePositionFromTop = (110 - circleSize) / 2;
function getStyle(theme: ThemeInterface) {
    return {

        topContainerHeight: height,
        topContainer: {
            backgroundColor: theme.colors.backgroundColor,
            top: 0,
            height: 110,
            width: width,
            position: 'absolute',
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },
        topCirclesContainer: {
            backgroundColor: theme.colors.backgroundColor,
            zIndex: 2,
            flex: 1,
            flexDirection: 'row'
        },
        topCircleContainer: {
            flex: 1,
            top: circlePositionFromTop,
        },
        topCircleLeft: {
            paddingLeft: circlePositionFromEdge
        },
        topCircleRight: {
            alignItems: 'flex-end',
            paddingRight: circlePositionFromEdge
        },
        triangleCorner: {

          },
        toggleButtonContainer: {
            width: 120,
            height: 120,
            borderRadius: 80,
            backgroundColor: theme.colors.backgroundColor,
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
          //  transform: [
          //    {scaleX: 2}
          //  ],
            position: 'absolute',
            marginLeft: (width-60) / 2,
            marginRight: (width-60) / 2,
            bottom: -20,
            alignItems: 'center',
            justifySelf: 'center',
            alignSelf: 'center',
            zIndex: 1
        },

        toggleButton: {
            position: 'absolute',
             bottom: 0
        },
        toggleButtonBar: {
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
            width: 10
        }
    };
}

export default getStyle;
