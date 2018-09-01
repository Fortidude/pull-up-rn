import React, { Component } from 'react';
import { ImageBackground, View, KeyboardAvoidingView } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';

import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';
import { ThemeInterface } from '../../../assets/themes';
import FormContainer from '../components';

type Props = {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
class PasswordReminder extends Component<Props> {
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

    register = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Register' }));
    }

    render() {
        return (
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                style={this.style.background}>
                <KeyboardAvoidingView style={this.style.container} behavior="padding" keyboardVerticalOffset={80}>
                    <FormContainer keyboardPadding={100}>
                        <Input placeholder={I18n.t('fields.email')} onChange={() => { }} />
                    </FormContainer>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.register} text={I18n.t('password_reminder.send_link')} />
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

export default connect(mapStateToProps)(PasswordReminder);
