import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import getStyle from '../Auth.styles';
import I18n from 'src/assets/translations';

import Input from 'src/components/Input';
import ButtonBig from 'src/components/ButtonBig';
import { ThemeInterface } from 'src/assets/themes';
import FormContainer from '../components';
import { AuthActions } from 'src/store/actions/auth';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    isLoading: boolean;

    email: string;
    passwordResetToken: string;
    onEmailChange: (value: string) => void;

    onInputFocus?: () => void;
    onInputBlur?: () => void;
};

interface State {
    password: string;
    passwordRepeat: string;
    emailConfirmationRequired: boolean;
}

class PasswordReset extends Component<Props, State> {
    style: any;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            password: '',
            passwordRepeat: '',
            emailConfirmationRequired: !!this.props.email
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    sendActivationLink = () => {
        // @TODO some info about that;
        this.props.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
            key: null
        }));
    };

    changePassword = () => {
        const email = this.props.email;
        const token = this.props.passwordResetToken;
        const password = this.state.password

        if (!this._isPasswordRepeatValid) {
            this.showError(I18n.t('register.errors.password_not_match'));
            return;
        }

        this.props.dispatch(AuthActions.changePassword(email, token, password));
    }

    showError = (text: string) => {
        Alert.alert(I18n.t('errors.failed'), text,
            [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
            { cancelable: false }
        );
    }

    render() {
        return (
            <React.Fragment>
                <FormContainer keyboardPadding={100}>
                    {!this.state.emailConfirmationRequired && <Input
                        authStyle
                        value={this.props.email}
                        onFocus={this.props.onInputFocus}
                        onBlur={this.props.onInputBlur}
                        placeholder={I18n.t('fields.email_validate')}
                        onChange={this.props.onEmailChange}
                    />}
                    <Input
                        value={this.state.password}
                        onFocus={this.props.onInputFocus}
                        onBlur={this.props.onInputBlur}
                        authStyle
                        password
                        placeholder={I18n.t('fields.password')}
                        onChange={(value) => this.setState({ password: value })}
                    />
                    <Input
                        value={this.state.passwordRepeat}
                        onFocus={this.props.onInputFocus}
                        onBlur={this.props.onInputBlur}
                        authStyle
                        password
                        placeholder={I18n.t('fields.password_repeat')}
                        onChange={(value) => this.setState({ passwordRepeat: value })}
                    />
                </FormContainer>
                <View style={this.style.container_footer}>
                    <ButtonBig isLoading={this.props.isLoading} onPress={this.changePassword} text={I18n.t('password_reset.change_password')} />
                    <View style={this.style.theButtonBelowMainButton}>
                        <Text style={this.style.theButtonBelowMainButtonText}>{' '}</Text>
                    </View>
                </View>
            </React.Fragment>
        );
    }

    _isPasswordRepeatValid = () => this.state.password === this.state.passwordRepeat;
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PasswordReset);
