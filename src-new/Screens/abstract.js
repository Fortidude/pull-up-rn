import React from 'react';
import { NavigationActions } from 'react-navigation';

import { Toast } from 'native-base';
import UserService from './../Data/user';
import I18n from './../Translations/translations';


export default class Abstract extends React.Component {
    constructor(props) {
        super(props);

        I18n.locale = 'pl';
    }

    navigateToHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Home'})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    navigateToLogin() {
        UserService.logout().then(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Login'})
                ]
            });
            this.props.navigation.dispatch(resetAction)
        });
    }

    throwError(message) {
        Toast.show({
            text: message ? message : "Wystapił błąd...",
            position: 'bottom',
            duration: 5000,
            type: 'danger'
        });
    }

    throwSuccess(message) {
        Toast.show({
            text: message ? message : "OK",
            position: 'bottom',
            duration: 3000,
            type: 'success'
        });
    }

    throwDevError(message) {
        Toast.show({
            text: message,
            position: 'bottom',
            duration: 5000
        });
    }
}