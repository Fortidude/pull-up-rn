import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, ImageBackground, Text, View, KeyboardAvoidingView, Animated, Keyboard, EventSubscription, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes/index'
import Images from '../../../assets/images';
import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';
import emailLogin from './onLogin/emailLogin';
import { AuthActions } from '../../../store/actions/auth';
import FormContainer from '../components';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
interface State {
    email: string;
    password: string;
    isLoading: boolean;
}
class Login extends Component<Props, State> {
    style: ThemeValueInterface;
    image: null;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToRegisterPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Register' }));
    };

    goToPasswordReminderPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'PasswordReminder' }));
    };

    login = async () => {
        const onSuccess = (token: string) => {
            this.setState({ isLoading: false }, () => {
                this.props.dispatch(AuthActions.loginWithToken(token));
            })
        }
        const onFailed = () => {
            this.setState({ isLoading: false, password: '' }, () => {
                this.props.dispatch(AuthActions.loginFailed(''));
            });
        }

        Keyboard.dismiss();
        this.setState({ isLoading: true }, () => {
            emailLogin.login(this.state.email.toLocaleLowerCase(), this.state.password, this.goToPasswordReminderPage, onSuccess, onFailed);
        });
    };

    render() {
        return (
            <ImageBackground source={Images.loginBackground}
                onLayout={() => {}}
                style={[this.style.background, StyleSheet.absoluteFill]}>

                <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={0}>
                    <FormContainer keyboardPadding={100}>
                        <Input
                            authStyle
                            value={this.state.email}
                            keyboardType={"email-address"}
                            placeholder={I18n.t('fields.email')}
                            onChange={(value) => {
                                this.setState({ email: value });
                            }} />
                        <Input
                            authStyle
                            value={this.state.password}
                            password={true}
                            placeholder={I18n.t('fields.password')}
                            onChange={(value) => {
                                this.setState({ password: value });
                            }} />

                        <TouchableOpacity style={this.style.passwordReminderButton}
                            onPress={this.goToPasswordReminderPage}>
                            <Text style={this.style.passwordReminderButtonText}>{I18n.t('login.remind_password')}</Text>
                        </TouchableOpacity>
                    </FormContainer>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.login} text={I18n.t('login.login')} isLoading={this.state.isLoading} />
                        <TouchableOpacity style={this.style.registerButton} onPress={this.goToRegisterPage}>
                            <Text style={this.style.registerButtonText}>{I18n.t('login.no_account')}</Text>
                        </TouchableOpacity>
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
