import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';

import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import FormContainer from '../components';

type Props = {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
class Login extends Component<Props> {
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

    register = () => {
        this.props.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
            key: null
        }));
    };

    render() {
        return (
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                style={[this.style.background, StyleSheet.absoluteFill]}>
                <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={0}>
                    <FormContainer keyboardPadding={100}>
                        <View style={this.style.container_content}>
                            <Input authStyle placeholder={I18n.t('fields.email')} onChange={() => { }} />
                            <Input authStyle placeholder={I18n.t('fields.password')} onChange={() => { }} />
                            <Input authStyle placeholder={I18n.t('fields.password_repeat')} onChange={() => { }} />
                        </View>
                    </FormContainer>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.register} text={I18n.t('register.register')} />
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Login);
