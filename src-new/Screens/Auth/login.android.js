import React from 'react';
import Abstract from './../abstract';
import {
    Alert,
    ImageBackground,
    Keyboard,
    Animated,
    Platform,
    PanResponder
} from 'react-native';
import { Container, Content, Text, Form, Item, Input, Button, View, Icon } from 'native-base';

import DataService from './../../Data/data';
import PullUpHeader from './../../Components/PullUpHeader';
import Spinner from './../../Components/Spinner';
import SwipeResponder from './../../Components/SwipeResponder';

import I18n from './../../Translations/translations';

import Style from './../../Styles/style';
import Color from './../../Styles/color';

const LoginForm = Style.auth;

class login extends Abstract {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password_repeat: null,
            background_image_height: new Animated.Value(0),
            input_opacity: new Animated.Value(0),

            login_position: new Animated.Value(-10),
            login_opacity: new Animated.Value(1),
            register_position: new Animated.Value(Style.widthValue),
            register_opacity: new Animated.Value(0),

            mode: 'login',

            swiped: false
        };
    }

    componentWillMount() {
        let showEvent = 'keyboardWillShow';
        let hideEvent = 'keyboardWillHide';

        if (Platform.OS === 'android') {
            showEvent = 'keyboardDidShow';
            hideEvent = 'keyboardDidHide';
        }

        this.keyboardDidShowListener = Keyboard.addListener(showEvent, this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener(hideEvent, this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        Animated.timing(this.state.background_image_height, {
            toValue: Style.heightValue-200,
            duration: 500
        }).start();
    }

    _keyboardDidHide() {
        Animated.timing(this.state.background_image_height, {
            toValue: Style.heightValue,
            duration: 200,
        }).start();
    }

    _initStartAnimations() {
        Animated.sequence([
            Animated.delay(300),
            Animated.parallel([
                Animated.spring(this.state.background_image_height, {
                    toValue: Style.heightValue,
                    duration: 500,
                    bounciness: 10
                }),
                Animated.timing(this.state.input_opacity, {
                    toValue: 1,
                    duration: 1000,
                })
            ])
        ]).start();
    }

    componentDidMount() {
        if (!this.props.auth.logout) {
            this.props.dispatchCheckIfLogged();
        }

        this._initStartAnimations();
    }

    componentDidUpdate() {
        this.checkIfLogged();

        if (this.props.auth.registered) {
            Alert.alert(
                I18n.t('auth.register_success'),
                I18n.t('auth.now_can_login'),
                [
                    {
                        text: I18n.t('buttons.ok'), onPress: () => {
                            this.props.dispatchErrorReset();
                            this.changeMode('login');
                        }
                    }
                ],
                {cancelable: false}
            );
        }

        if (this.props.auth.error) {
            let text = I18n.t('errors.' + this.props.auth.error);

            Alert.alert(
                I18n.t('errors.failed'),
                text,
                [
                    {
                        text: I18n.t('buttons.ok'), onPress: () => {
                        this.props.dispatchErrorReset();
                        this.setState({password: '', password_repeat: null});
                    }
                    },
                ],
                {cancelable: false}
            );
        }

        if (!this.props.auth.loading) {
            Animated.timing(this.state.input_opacity, {
                toValue: 1,
                duration: 400,
            }).start();
        } else {
            Animated.timing(this.state.input_opacity, {
                toValue: 0.5,
                duration: 400,
            }).start();
        }
    }

    checkIfLogged() {
        if (this.props.auth.logged && this.props.auth.user) {
            this.navigateToHome();
        }
    }

    login() {
        if (!this.loginFormValid()) {
            return;
        }

        this.props.dispatchLogin(this.state.username, this.state.password);
    }

    register() {
        if (!this.registerFormValid()) {
            return;
        }

        this.props.dispatchRegister(this.state.email, this.state.username, this.state.password);
    }

    changeMode(mode) {
        if (mode === 'login') {
            Animated.parallel([
                Animated.timing(this.state.login_position, {
                    toValue: -10,
                    duration: 400,
                }),
                Animated.timing(this.state.login_opacity, {
                    toValue: 1,
                    duration: 200,
                    delay: 200
                }),
                Animated.timing(this.state.register_position, {
                    toValue: Style.widthValue,
                    duration: 800,
                }),
                Animated.timing(this.state.register_opacity, {
                    toValue: 0,
                    duration: 400,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(this.state.login_position, {
                    toValue: Style.widthValue,
                    duration: 800,
                }),
                Animated.timing(this.state.login_opacity, {
                    toValue: 0,
                    duration: 400,
                }),
                Animated.timing(this.state.register_position, {
                    toValue: -10,
                    duration: 400,
                }),
                Animated.timing(this.state.register_opacity, {
                    toValue: 1,
                    duration: 200,
                    delay: 200
                })
            ]).start();
        }

        this.setState({mode: mode, password: '', password_repeat: null, swiped: false});
    }

    _passwordsMatch() {
        let password = this.state.password;
        let passwordRepeat = this.state.password_repeat;
        return (password && password.length >= 5 && passwordRepeat && password === passwordRepeat);
    }

    emailInputValid = () => (this.state.email.length >= 5 && this.emailRegex.test(this.state.email));
    usernameInputValid = () => (this.state.username.length >= 5);
    loginFormValid = () => (this.usernameInputValid() && this.state.password.length >= 5);
    registerFormValid = () => (this.emailInputValid() && this.usernameInputValid() && this._passwordsMatch());

    onLeftSwipe = () => (this.state.mode === 'register' && this.changeMode('login'));
    onRightSwipe = () => (this.state.mode === 'login' && this.changeMode('register'));

    render() {
        let emailInputValid = this.emailInputValid();
        let usernameInputValid = this.usernameInputValid();
        let loginFormValid = this.loginFormValid();
        let registerFormValid = this.registerFormValid();

        return (
            <Container>

                <ImageBackground source={DataService.getBackgroundImage()}  blurRadius={0}
                                 style={{backgroundColor: 'grey', flex: 1, height: null, width: null, }}>
                    <PullUpHeader bodyText="Pull up!"/>

                    {!this.props.auth.loading && <View style={{flexDirection:'row', marginLeft: -10, marginRight: -10, backgroundColor: Color.black.colorHalf}}>
                        <Button transparent={true} onPress={() => this.changeMode('login')}
                                style={[{flex:1, justifyContent: 'center', borderRadius: 0, borderColor: Style.touchColor.color}, this.state.mode === 'login' && {borderBottomWidth: 1}]}>
                            <Text style={[Style.card.cardItem.text, this.state.mode === 'login' ? {color: Style.touchColor.color} : {color: Color.white.colorHalf}]}>{ I18n.t('auth.sections.login').toLocaleUpperCase() }</Text></Button>

                        <Button transparent={true} onPress={() => this.changeMode('register')}
                                style={[{flex:1, justifyContent: 'center', borderRadius: 0, borderColor: Style.touchColor.color}, this.state.mode === 'register' && {borderBottomWidth: 1}]}>
                            <Text style={[Style.card.cardItem.text, this.state.mode === 'register' ? {color: Style.touchColor.color} : {color: Color.white.colorHalf}]}>{ I18n.t('auth.sections.register').toLocaleUpperCase() }</Text></Button>
                    </View>}

                    <SwipeResponder onLeft={this.onLeftSwipe.bind(this)} onRight={this.onRightSwipe.bind(this)}>

                        <Content padder keyboardShouldPersistTaps="always" keyboardDismissMode="none"
                                 style={{backgroundColor: Color.black.colorHalf}}>

                            <Animated.View style={{position: 'absolute', top: 0, right: this.state.login_position, opacity: this.state.login_opacity}}>
                                <Form style={[LoginForm.form]}>
                                    <Button rounded style={[LoginForm.button.element_reset, LoginForm.button.element_enabled]}>
                                        <Text style={LoginForm.button.text}>{ I18n.t('auth.password_forget') }</Text>
                                    </Button>

                                        <Item rounded style={LoginForm.input.container}>
                                            <Icon active name='ios-contact-outline' style={LoginForm.input.icon}/>
                                            <Input placeholder={ I18n.t('auth.login_placeholder') }
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   keyboardType="email-address"
                                                   autoCorrect={false}
                                                   value={this.state.username}
                                                   onChangeText={(value) => {
                                                       this.setState({username: value});
                                                   }}
                                            />
                                        </Item>
                                        <Item rounded style={LoginForm.input.container}>
                                            <Icon active name='ios-lock-outline' style={LoginForm.input.icon}/>
                                            <Input placeholder={ I18n.t('auth.password_placeholder') }
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   autoCorrect={false}
                                                   value={this.state.password}
                                                   onChangeText={(value) => {
                                                       this.setState({password: value});
                                                   }}
                                                   secureTextEntry={true}
                                            />
                                        </Item>

                                    {!this.props.auth.loading &&
                                        <Button rounded
                                                style={[loginFormValid ? LoginForm.button.element_login_enabled : LoginForm.button.element_login_disabled, LoginForm.button.element_login]}
                                                primary
                                                onPress={_ => this.login()}>
                                            <Text style={LoginForm.button.text}>{ I18n.t('auth.login_in').toLocaleUpperCase() }</Text>
                                        </Button>
                                    }

                                    {this.props.auth.loading &&
                                        <Spinner/>
                                    }
                                </Form>
                            </Animated.View>

                            <Animated.View style={{left: this.state.register_position, opacity: this.state.register_opacity}}>
                                <Form style={[LoginForm.form]}>
                                    <Button rounded style={[LoginForm.button.element_reset, LoginForm.button.element_enabled]}>

                                    </Button>
                                        <Item rounded style={[LoginForm.input.container, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: 1}]}>
                                            <Text style={[Style.card.cardItem.text_note, {position: 'absolute', top: 2, right: 5}]}>{ I18n.t('auth.min_5_characters') }</Text>
                                            <Icon active name='ios-mail-outline' style={[LoginForm.input.icon, emailInputValid && {color: Color.green.color}]}/>
                                            <Input placeholder={ I18n.t('auth.email_placeholder')}
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   keyboardType="email-address"
                                                   autoCorrect={false}
                                                   value={this.state.email}
                                                   onChangeText={(value) => {
                                                       this.setState({email: value.replace(/\s+/g, '_')});
                                                   }}
                                            />
                                        </Item>
                                        <Item rounded style={[LoginForm.input.container, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                                            <Icon active name='ios-contact-outline' style={[LoginForm.input.icon, usernameInputValid && {color: Color.green.color}]}/>
                                            <Input placeholder={ I18n.t('auth.username_placeholder')}
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   keyboardType="default"
                                                   autoCorrect={false}
                                                   value={this.state.username}
                                                   onChangeText={(value) => {
                                                       this.setState({username: value});
                                                   }}
                                            />
                                        </Item>
                                        <Item rounded style={[LoginForm.input.container, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: 1}]}>
                                            <Text style={[Style.card.cardItem.text_note, {position: 'absolute', bottom: 2, right: 5}]}>{ I18n.t('auth.min_5_characters') }</Text>
                                            <Icon active name='ios-lock-outline' style={[LoginForm.input.icon, {width: 38}, this._passwordsMatch() && {color: Color.green.color}]}/>
                                            <Input placeholder={ I18n.t('auth.password_placeholder')}
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   autoCorrect={false}
                                                   value={this.state.password}
                                                   onChangeText={(value) => {
                                                       this.setState({password: value});
                                                   }}
                                                   secureTextEntry={true}
                                            />
                                        </Item>
                                        <Item rounded style={[LoginForm.input.container, {borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                                            <Icon active name='ios-checkmark' style={[LoginForm.input.icon, {color: 'transparent', width: 38}]}/>
                                            <Input placeholder={ I18n.t('auth.password_repeat_placeholder')}
                                                   style={LoginForm.input.element}
                                                   placeholderTextColor={Color.white.colorHalf}
                                                   keyboardAppearance="dark"
                                                   autoCapitalize="none"
                                                   autoCorrect={false}
                                                   value={this.state.password_repeat}
                                                   onChangeText={(value) => {
                                                       this.setState({password_repeat: value});
                                                   }}
                                                   secureTextEntry={true}
                                            />
                                        </Item>


                                    {!this.props.auth.loading &&
                                    <Button rounded
                                            style={[registerFormValid ? LoginForm.button.element_register_enabled : LoginForm.button.element_register_disabled, LoginForm.button.element_register]}
                                            primary
                                            onPress={_ => this.register()}>
                                        <Text style={LoginForm.button.text}>{ I18n.t('buttons.join').toLocaleUpperCase() }</Text>
                                    </Button>
                                    }

                                    {this.props.auth.loading &&
                                        <Spinner/>
                                    }
                                </Form>
                            </Animated.View>
                        </Content>
                    </SwipeResponder>
                </ImageBackground>
            </Container>
        );
    }
}

import { login as LoginFn, register as RegisterFn, checkIfLogged, resetError } from './../../Store/Auth/actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchLogin: (_login, _password) => dispatch(LoginFn(_login, _password)),
        dispatchRegister: (email, username, password) => dispatch(RegisterFn(email, username, password)),
        dispatchCheckIfLogged: () => dispatch(checkIfLogged()),
        dispatchErrorReset: () => dispatch(resetError()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(login)
