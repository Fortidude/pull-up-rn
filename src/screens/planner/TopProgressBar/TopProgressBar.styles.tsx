import { Dimensions } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

const width = Dimensions.get('window').width;
const height = 110;
const circleSize = 80;
const circlePositionFromEdge = ((width / 2) - circleSize) * 2 / 3;
const circlePositionFromBottom = (110 - circleSize) / 2;
function getStyle(theme: ThemeInterface) {
    return {

        topContainerHeight: height,
        topContainer: {
            backgroundColor: theme.colors.headerBackgroundColor,
            top: 0,
            height: height,
            width: width,
            position: 'absolute',
            borderBottomWidth: theme.borders.borderWidth,
            borderBottomColor: theme.borders.borderColor
        },

        contentContainer: {
            backgroundColor: theme.colors.headerBackgroundColor,
            zIndex: 2,
            flex: 1,
            flexDirection: 'row'
        },
        background: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: -600,
            justifyContent: 'flex-end',
            backgroundColor: theme.colors.plannerProgressBarBackgroundColor,
        },
        circlesContainer: {
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: circlePositionFromBottom
        },
        topCircleContainer: {
            flex: 1,
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
            borderRadius: 50,
            backgroundColor: theme.colors.plannerProgressBarBackgroundColor,
            borderWidth: theme.borders.borderWidth,
            borderColor: theme.borders.borderColor,
            position: 'absolute',
            marginLeft: (width - 60) / 2,
            marginRight: (width - 60) / 2,
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
