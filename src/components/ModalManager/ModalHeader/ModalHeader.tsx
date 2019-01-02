import React from 'react';
import { Dispatch } from 'redux';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import Styles from './ModalHeader.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    text: string;
    style?: object;
    textStyle?: object;
}

class ModalHeader extends React.Component<Props> {
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
        return (
            <Animated.View style={[this.style.container, this.props.style]}>
                <Text style={[this.style.header, this.props.textStyle]}>
                    {this.props.text}
                </Text>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ModalHeader);
