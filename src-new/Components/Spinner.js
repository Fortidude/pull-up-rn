import React from 'react'
import { Platform } from 'react-native';

import Spinkit from 'react-native-spinkit';
import Style from './../Styles/style';

export default class Spinner extends React.Component {
    render() {
        let {color, size, style, type} = this.props;
        if (!size) {
            size = 80;
        }

        if (!color) {
            color = Style.touchColor.color;
        }

        if (!style) {
            style = {alignSelf: 'center'};
        }

        if (!type) {
            type = Platform.OS === 'ios' ? 'ArcAlt' : 'Bounce';
        }

        return (<Spinkit type={type} size={size} style={style} color={color}/>);
    }
}