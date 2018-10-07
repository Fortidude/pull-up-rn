import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import getStyle from './../Stats.styles';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
};

class Popularity extends Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = getStyle(this.props.theme);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <Text>Popularity</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(Popularity);
