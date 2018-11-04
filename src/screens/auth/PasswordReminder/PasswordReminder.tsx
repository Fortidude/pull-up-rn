import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
    onEmailChange: (value: string) => void;

    onInputFocus?: () => void;
    onInputBlur?: () => void;
};

interface State {
}

class PasswordReminder extends Component<Props, State> {
    style: any;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
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

    remindPassword = () => {
        this.props.dispatch(AuthActions.passwordRemind(this.props.email));
    }

    render() {
        return (
            <React.Fragment>
                <FormContainer keyboardPadding={100}>
                    <Input
                        value={this.props.email}
                        onFocus={this.props.onInputFocus}
                        onBlur={this.props.onInputBlur}
                        authStyle
                        placeholder={I18n.t('fields.email')}
                        onChange={this.props.onEmailChange}
                    />
                </FormContainer>
                <View style={this.style.container_footer}>
                    <ButtonBig isLoading={this.props.isLoading} onPress={this.remindPassword} text={I18n.t('password_reminder.send_link')} />
                    <View style={this.style.theButtonBelowMainButton}>
                        <Text style={this.style.theButtonBelowMainButtonText}>{' '}</Text>
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PasswordReminder);
