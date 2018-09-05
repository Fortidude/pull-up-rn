import { Dimensions } from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

const width = Dimensions.get('window').width;
const height = 110;
const circleSize = 80;
const circlePositionFromEdge = ((width / 2) - circleSize) * 2 / 3;
const circlePositionFromTop = (height - circleSize) / 2;
function getStyle(theme: ThemeInterface) {
    return {
        topCirclesContainer: {
            position: 'absolute',
            height: height,
            overflow: 'hidden',
            zIndex: 2,
            width: width,
            backgroundColor: theme.colors.backgroundColor,
            flexDirection: 'row',
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
    };
}

export default getStyle;
