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

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToPlannerPage = () => {
        if (this.state.isLoading) {
            return;
        }

        this.props.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Planner' })],
            key: null
        }));
    };

    goToRegisterPage = () => {
        if (this.state.isLoading) {
            return;
        }
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Register' }));
    };

    goToPasswordReminderPage = () => {
        if (this.state.isLoading) {
            return;
        }

        this.props.dispatch(NavigationActions.navigate({ routeName: 'PasswordReminder' }));
    };

    login = async () => {
        const onSuccess = () => {
            this.setState({ isLoading: false }, () => {
                this.goToPlannerPage();
            })
        }
        const onFailed = () => {
            this.setState({ isLoading: false, password: '' });
        }
        this.setState({ isLoading: true }, async () => {
            await emailLogin.login(this.state.email.toLocaleLowerCase(), this.state.password, this.goToPasswordReminderPage, onSuccess, onFailed);
        });
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
                        <ButtonBig onPress={this.login} text={I18n.t('login.login')} isLoading={this.state.isLoading} />
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
