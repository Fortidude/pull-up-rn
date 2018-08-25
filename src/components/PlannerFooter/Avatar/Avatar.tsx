import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './Avatar.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class Avatar extends React.Component<Props> {
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
            <TouchableOpacity style={this.style.footerButton}>
                <View style={this.style.footerAvatar}>

                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Avatar);
