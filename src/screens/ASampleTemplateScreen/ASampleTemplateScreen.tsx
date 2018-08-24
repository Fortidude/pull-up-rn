import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';

import getStyle from './ASampleTemplateScreen.styles';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
};
class ASampleTemplateScreen extends React.Component<Props> {
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
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ASampleTemplateScreen);
