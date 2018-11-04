import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Animated, Keyboard, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import getStyle from './Auth.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import images from 'src/assets/images';
import Footer from './components/Footer';
import Events from 'src/service/Events';

import I18n from 'src/assets/translations';

import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';
import PasswordReminder from './PasswordReminder';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    passwordReminderLinkSend: boolean;
    passwordChanged: boolean;
};

interface State {
    componentName: string;
    previousName: string | null;
    email: string;
    passwordResetToken: string;
}

class Auth extends React.Component<Props, State> {
    style: ThemeValueInterface;
    footerOpacity = new Animated.Value(1);
    keyboardDidhideListener: any;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            componentName: 'login',
            previousName: null,

            email: '',

            passwordResetToken: ''
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        if (nextProps.passwordReminderLinkSend && !this.props.passwordReminderLinkSend) {
            Alert.alert('', I18n.t(`password_reminder.link_has_been_sent`),
                [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
                { cancelable: false }
            );
            this.switchComponent('login', true);
        }

        if (nextProps.passwordChanged && !this.props.passwordChanged) {
            Alert.alert('', I18n.t(`password_reset.password_changed`),
                [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
                { cancelable: false }
            );
            this.switchComponent('login', true);
        }
    }

    componentDidMount() {
        Linking.addEventListener('url', this.handleUrl);
        Linking.getInitialURL().then((url) => this.handleUrl({ url }));

        Events.listenTo('HEADER_ON_CLOSE_BUTTON', 'AUTH', () => {
            if (this.state.previousName) {
                this.switchComponent(this.state.previousName, true);
            }
        })

        this.keyboardDidhideListener = Keyboard.addListener('keyboardDidHide', () => {
            //@ts-ignore
            if (this.footerOpacity._value === 0) {
                this._onInputBlur();
            }
        })
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleUrl);
        Events.remove('HEADER_ON_CLOSE_BUTTON', 'AUTH');
        this.keyboardDidhideListener.remove();
    }

    switchComponent(componentName: string, setPreviousNull = false) {
        //LayoutAnimation.easeInEaseOut();
        Events.emit('HEADER_OVERWRITE_TITLE', componentName);

        if (setPreviousNull) {
            Events.emit('HEADER_CALENDAR_UNSET_OVERWRITE_BACK_TEXT_ROUTE');
        } else {
            Events.emit('HEADER_CALENDAR_SET_OVERWRITE_BACK_TEXT_ROUTE', this.state.componentName);
        }
        this.setState({ componentName, previousName: !setPreviousNull ? this.state.componentName : null });
    }

    handleUrl = (event: { url: string }) => {
        if (!event.url) {
            return;
        }
        
        let route = event.url.replace(/.*?:\/\//g, '');
        if (route.includes('passwordreset')) {
            this.switchComponent('passwordreset');
            this.setState({ passwordResetToken: route.replace('passwordreset/', '') });
        }
    }

    render() {
        let image = images.loginBackground
        let gradient = ['transparent'];

        if (this.props.theme.name === 'dark') {
            image = images.loginBackgroundDark;
            gradient = ['rgba(0,0,0, 1)', 'rgba(0,0,0,0)'];
        }

        return (
            <ImageBackground source={image}
                onLayout={() => { }}
                style={[this.style.background, StyleSheet.absoluteFill]}>
                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={gradient} style={[{ flex: 1 }, StyleSheet.absoluteFill]}>

                    <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={0}>
                        {this.state.componentName === 'login' && <Login
                            email={this.state.email}
                            onEmailChange={(email) => this.setState({ email })}
                            onInputFocus={this._onInputFocus}
                            onInputBlur={this._onInputBlur}
                            onRegisterClick={() => this.switchComponent('register')}
                            onPasswordReminderClick={() => this.switchComponent('passwordreminder')}
                        />}
                        {this.state.componentName === 'register' && <Register
                            email={this.state.email}
                            onEmailChange={(email) => this.setState({ email })}
                            onInputFocus={this._onInputFocus}
                            onInputBlur={this._onInputBlur} />}
                        {this.state.componentName === 'passwordreset' && <PasswordReset
                            email={this.state.email}
                            onEmailChange={(email) => this.setState({ email })}
                            passwordResetToken={this.state.passwordResetToken}
                            onInputFocus={this._onInputFocus}
                            onInputBlur={this._onInputBlur}
                        />}
                        {this.state.componentName === 'passwordreminder' && <PasswordReminder
                            email={this.state.email}
                            onEmailChange={(email) => this.setState({ email })}
                            onInputFocus={this._onInputFocus}
                            onInputBlur={this._onInputBlur}
                        />}
                        <Footer opacity={this.footerOpacity} />
                    </KeyboardAvoidingView>
                </LinearGradient>
            </ImageBackground>
        );
    }

    _onInputFocus = () => {
        Animated.timing(this.footerOpacity, {
            toValue: 0
        }).start();
    }

    _onInputBlur = () => {
        Animated.timing(this.footerOpacity, {
            toValue: 1
        }).start();
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    passwordReminderLinkSend: state.auth.passwordReminderLinkSend,
    passwordChanged: state.auth.passwordChanged
});

export default connect(mapStateToProps)(Auth);
