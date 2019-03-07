import React from 'react';
import { Dispatch } from 'redux';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ButtonSmall.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onPress: () => void;
    text?: string;

    danger?: boolean;
    border?: boolean;
}

class ButtonSmall extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        let containerStyle = [this.style.container, this.props.border && this.style.containerBorder]
        let textStyle = [this.style.text, this.props.danger && this.style.textDanger];
        
        return (
            <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
                {!!this.props.text && <Text style={textStyle}>{this.props.text}</Text>}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ButtonSmall);
