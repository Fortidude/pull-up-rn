import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from './PasswordReminder.styles';
import I18n from '../../../assets/translations';

type Props = {
    dispatch: void;
    theme: {};
};
class PasswordReminder extends Component<Props> {
    style = {};

    constructor(props) {
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
            actions: [NavigationActions.navigate({routeName: 'Login'})],
            key: null
        }));
    };

    render() {
        return (
            <View style={this.style.container}>
                <Button title={I18n.t('password_reminder.send_link')} onPress={this.sendActivationLink}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(PasswordReminder);
