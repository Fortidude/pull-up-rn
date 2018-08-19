import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import getStyle from '../auth.styles';
import I18n from '../../../assets/translations';

import Input from '../../../components/Input';
import ButtonBig from '../../../components/ButtonBig';

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
            <ImageBackground source={require('./../../../assets/images/backgroundlight.jpg')}
                             style={this.style.background}>
                <View style={this.style.container}>
                    <View style={this.style.container_content}>
                        <Input placeholder={I18n.t('fields.email')} onChange={() => {}}/>
                    </View>
                    <View style={this.style.container_footer}>
                        <ButtonBig onPress={this.register} text={I18n.t('password_reminder.send_link')}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(PasswordReminder);
