import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, ImageBackground, Text, View, KeyboardAvoidingView, Animated, Keyboard, StyleSheet, AsyncStorage, TextInput } from 'react-native';
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
import User from 'src/models/User';

import FormContainer from '../components';
import LoginPreviousUserItem from '../components/LoginPreviousUserItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
interface State {
    email: string;
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
            email: '',
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
                this.setState({users});
            }
        })
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
                onLayout={() => { }}
                style={[this.style.background, StyleSheet.absoluteFill]}>

                <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={0}>
                    <FormContainer keyboardPadding={100}>
                        <Input
                            authStyle
                            value={this.state.email}
                            keyboardType={"email-address"}
                            placeholder={I18n.t('fields.email')}
                            onFocus={this._onInputFocus}
                            onBlur={this._onInputBlur}
                            onChange={(value) => {
                                this.setState({ email: value });
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
                            <Text style={this.style.passwordReminderButtonText}>{I18n.t('login.remind_password')}</Text>
                        </TouchableOpacity>
                    </FormContainer>
                    <Animated.View style={{ alignSelf: 'flex-end', opacity: this.userListOpacity }}>
                        {this.state.users.map(user => {
                            return (
                                <LoginPreviousUserItem onPress={this._onLoginPreviousUserPress} key={user.id} user={user}/>
                            )
                        })}
                    </Animated.View>
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

    _onLoginPreviousUserPress = (email: string) => {
        this.setState({email: email}, () => {
            if (this.passwordRef) {
                this.passwordRef.focus();
            }
        });
    }

    _onInputFocus = () => {
        Animated.timing(this.userListOpacity, {
            toValue: 0,
            duration: 100
        }).start();
    }

    _onInputBlur = () => {
        Animated.timing(this.userListOpacity, {
            toValue: 1
        }).start();
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Login);
