import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, ImageBackground, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes/index'

import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';
import emailLogin from './onLogin/emailLogin';
import { AuthActions } from '../../../store/actions/auth';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    isLoading: boolean;
};
interface State {
    email: string;
    password: string;
}
class Login extends Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            email: '',
            password: ''
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
            this.props.dispatch(AuthActions.loginWithToken(token));
        }
        const onFailed = () => {
            this.setState({ password: '' }, () => {
                this.props.dispatch(AuthActions.loginFailed(''));
            });
        }

        emailLogin.login(this.state.email.toLocaleLowerCase(), this.state.password, this.goToPasswordReminderPage, onSuccess, onFailed);
    };

    render() {
        return (
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                style={this.style.background}>
                <View style={this.style.container}>
                    <View style={this.style.container_content}>
                        <Input
                            value={this.state.email}
                            keyboardType={"email-address"}
                            placeholder={I18n.t('fields.email')}
                            onChange={(value) => {
                                this.setState({ email: value });
                            }} />
                        <Input
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
                    </View>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.login} text={I18n.t('login.login')} isLoading={this.props.isLoading} />
                        <TouchableOpacity style={this.style.registerButton} onPress={this.goToRegisterPage}>
                            <Text style={this.style.registerButtonText}>{I18n.t('login.no_account')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Login);
