import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from './Register.styles';
import I18n from '../../../assets/translations';

type Props = {
    dispatch: void;
    theme: {};
};
class Login extends Component<Props> {
    style = {};

    constructor(props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    register = () => {
        this.props.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})],
            key: null
        }));
    };

    render() {
        return (
            <View style={this.style.container}>
                <Button title={I18n.t('register.register')} onPress={this.register}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Login);
