import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text, View, Animated, Keyboard, AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';

import getStyle from '../Auth.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes/index'
import Input from 'src/components/Input';
import ButtonBig from 'src/components/ButtonBig';
import emailLogin from './onLogin/emailLogin';
import { AuthActions } from 'src/store/actions/auth';
import User from 'src/models/User';

import FormContainer from '../components';
import LoginPreviousUserItem from '../components/LoginPreviousUserItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    locale: string;

    email: string;
    onEmailChange: (value: string) => void;

    onInputFocus?: () => void;
    onInputBlur?: () => void;

    onRegisterClick: () => void;
    onPasswordReminderClick: () => void;
};
interface State {
    password: string;
    isLoading: boolean;

    users: User[];
}
class Login extends Component<Props, State> {
    userListOpacity = new Animated.Value(1);
    style: ThemeValueInterface;
    image: null;

    passwordRef: TextInput;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            password: '',
            isLoading: false,
            users: []
        };
    }

    componentWillMount() {
        let users: User[] = [];
        AsyncStorage.getItem('users', (error, items) => {
            if (!items) {
                return;
            }

            let object: { [key: string]: User } = JSON.parse(items);
            Object.values(object).forEach((user: User) => {
                if (!user || !user.id || !user.username) {
                    return;
                }
                users.push(user);
            })

            if (users.length > 0) {
                this.setState({ users });
            }
        })
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToRegisterPage = () => {
        //this.props.dispatch(NavigationActions.navigate({ routeName: 'Register' }));
        this.props.onRegisterClick();
    };

    goToPasswordReminderPage = () => {
        //this.props.dispatch(NavigationActions.navigate({ routeName: 'PasswordReminder' }));
        this.props.onPasswordReminderClick();
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
            emailLogin.login(this.props.email.toLocaleLowerCase(), this.state.password, this.goToPasswordReminderPage, onSuccess, onFailed);
        });
    };

    render() {
        return (
            <React.Fragment>
                <FormContainer keyboardPadding={100}>
                    <Input
                        authStyle
                        value={this.props.email}
                        keyboardType={"email-address"}
                        placeholder={I18n.t('fields.email')}
                        onFocus={this._onInputFocus}
                        onBlur={this._onInputBlur}
                        onChange={(value) => {
                            this.props.onEmailChange(value);
                        }} />
                    <Input
                        authStyle
                        inputRef={(ref) => this.passwordRef = ref}
                        value={this.state.password}
                        password={true}
                        placeholder={I18n.t('fields.password')}
                        onFocus={this._onInputFocus}
                        onBlur={this._onInputBlur}
                        onChange={(value) => {
                            this.setState({ password: value });
                        }} />

                    <TouchableOpacity style={this.style.passwordReminderButton}
                        onPress={this.goToPasswordReminderPage}>
                        <Text numberOfLines={1} style={this.style.passwordReminderButtonText}>{I18n.t('login.remind_password')}</Text>
                    </TouchableOpacity>
                    <Animated.View style={{ bottom: 0, right: 0, position: 'absolute', opacity: this.userListOpacity, transform: [{ scaleY: this.userListOpacity }] }}>
                        {this.state.users.map(user => {
                            return (
                                <LoginPreviousUserItem onPress={this._onLoginPreviousUserPress} key={user.id} user={user} />
                            )
                        })}
                    </Animated.View>
                </FormContainer>

                <View style={this.style.container_footer}>
                    <ButtonBig onPress={this.login} text={I18n.t('login.login')} isLoading={this.state.isLoading} />
                    <TouchableOpacity style={this.style.theButtonBelowMainButton} onPress={this.goToRegisterPage}>
                        <Text numberOfLines={1} style={this.style.theButtonBelowMainButtonText}>{I18n.t('login.no_account')}</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        );
    }

    _onLoginPreviousUserPress = (email: string) => {
        this.props.onEmailChange(email);
        if (this.passwordRef) {
            this.passwordRef.focus();
        };
    }

    _onInputFocus = () => {
        if (this.props.onInputFocus) {
            this.props.onInputFocus();
        }
        Animated.timing(this.userListOpacity, {
            toValue: 0,
            duration: 100
        }).start();
    }

    _onInputBlur = () => {
        if (this.props.onInputBlur) {
            this.props.onInputBlur();
        }
        Animated.timing(this.userListOpacity, {
            toValue: 1
        }).start();
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale
});

export default connect(mapStateToProps)(Login);
