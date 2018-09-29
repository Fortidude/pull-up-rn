import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, ImageBackground, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';

import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import FormContainer from '../components';
import { AuthActions } from '../../../store/actions/auth';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    isLoading: boolean;
    isRegistered: boolean;
    error: string | null;
};

interface State {
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
    isValid: boolean;
    isLoading: boolean;
}

class Login extends Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            email: '',
            username: '',
            password: '',
            passwordRepeat: '',
            isValid: false,
            isLoading: false,
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        if (this.state.isLoading && !this.props.isLoading && nextProps.isLoading) {

        }

        if (nextProps.error && !this.props.error) {
            this.showError(I18n.t(`errors.${nextProps.error}`));
        }

        if (/* loading was started and now it's done */this.state.isLoading && this.props.isLoading && !nextProps.isLoading) {
            this.setState({ isLoading: false }, () => {
                if (nextProps.isRegistered) {
                    this.goToLoginPage();
                    Alert.alert(I18n.t('register.success_title'), I18n.t('register.success_text'),
                        [{ text: I18n.t('login.login'), onPress: () => {} }],
                        { cancelable: false }
                    );
                }
            });
        }
    }

    goToLoginPage = () => {
        this.props.dispatch(NavigationActions.back());
    }

    register = () => {
        if (!this._isValid()) {
            return;
        }

        this.setState({ isLoading: true }, () => {
            this.props.dispatch(AuthActions.register(this.state.email, this.state.username, this.state.password));
        })
    };

    showError = (text: string) => {
        Alert.alert(I18n.t('errors.failed'), text,
            [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
            { cancelable: false }
        );
    }

    render() {
        return (
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                style={[this.style.background, StyleSheet.absoluteFill]}>
                <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={0}>
                    <FormContainer keyboardPadding={100}>
                        <View style={this.style.container_content}>
                            <Input
                                authStyle
                                placeholder={I18n.t('fields.email')}
                                onChange={this._setEmail}
                            />

                            <Input
                                authStyle
                                password
                                placeholder={I18n.t('fields.password')}
                                onChange={this._setPassword}
                            />

                            <Input
                                authStyle
                                password
                                placeholder={I18n.t('fields.password_repeat')}
                                onChange={this._setPasswordRepeat}
                            />
                        </View>
                    </FormContainer>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.register} text={I18n.t('register.register')} />
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }

    _isValid = (): boolean => {
        let errorText: string | null = null;

        if (!this._isEmailValid()) {
            errorText = I18n.t('register.errors.email');
        }

        if (!this._isPasswordValid()) {
            errorText = I18n.t('register.errors.password_length_not_valid');
        }

        if (!this._isPasswordRepeatValid()) {
            errorText = I18n.t('register.errors.password_not_match');
        }

        if (errorText) {
            this.showError(errorText);

            return false;
        }

        return true;
    }

    _isEmailValid = () => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(this.state.email.toLowerCase());
    }
    _setEmail = (email: string) => {
        this.setState({ email: email.toLowerCase(), username: email.toLowerCase() });
    }

    _isPasswordValid = () => this.state.password.length >= 5;
    _setPassword = (password: string) => {
        this.setState({ password });
    }

    _isPasswordRepeatValid = () => this.state.password === this.state.passwordRepeat;
    _setPasswordRepeat = (password: string) => {
        this.setState({ passwordRepeat: password });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,

    isLoading: state.auth.isLoading,
    isRegistered: state.auth.isRegistered,
    error: state.auth.registerError
});

export default connect(mapStateToProps)(Login);
