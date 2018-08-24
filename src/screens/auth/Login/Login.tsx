import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, ImageBackground, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';
import {ThemeInterface, ThemeValueInterface} from '../../../assets/themes/index'
 
import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
class Login extends Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToPlannerPage = () => {
        this.props.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Planner'})],
            key: null
        }));
    };

    goToRegisterPage = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Register'}));
    };

    goToPasswordReminderPage = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'PasswordReminder'}));
    };

    login = () => {
        alert('Login');
        //  this.goToPlannerPage();
    };

    render() {
        return (
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                             style={this.style.background}>
                <View style={this.style.container}>
                    <View style={this.style.container_content}>
                        <Input placeholder={I18n.t('fields.email')} onChange={() => {
                        }}/>
                        <Input password={true} placeholder={I18n.t('fields.password')} onChange={() => {
                        }}/>

                        <TouchableOpacity style={this.style.passwordReminderButton}
                                          onPress={this.goToPasswordReminderPage}>
                            <Text style={this.style.passwordReminderButtonText}>{I18n.t('login.remind_password')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.login} text={I18n.t('login.login')}/>
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
