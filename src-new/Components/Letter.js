import React from 'react'
import { Text } from 'native-base';

export default class Letter extends React.Component {
    render() {
        let {children, spacing, textStyle} = this.props;

        let letterStyles = [
            textStyle,
            {paddingRight: spacing}
        ];

        return (<Text style={letterStyles}>{children}</Text>);
    }
}