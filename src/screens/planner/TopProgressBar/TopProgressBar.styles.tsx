import {Dimensions} from 'react-native';
import { ThemeInterface } from '../../../assets/themes';

const width = Dimensions.get('window').width;
const circleSize = 80;
const circlePositionFromEdge = ((width / 2) - circleSize ) * 2/3;
function getStyle(theme: ThemeInterface) {
    return {
        topCirclesContainer: {
            height: 110,
            width: width,
            backgroundColor: theme.colors.backgroundColor,
            flexDirection: 'row',
        },
        topCircleContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        topCircleLeft: {
            paddingLeft: circlePositionFromEdge
        },
        topCircleRight: {
            alignItems: 'flex-end',
            paddingRight:  circlePositionFromEdge
        },
    };
}

export default getStyle;
