import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, TouchableOpacity, ActionSheetIOS, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AuthActions } from 'src/store/actions/auth';

import Styles from './ProfileFooter.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import I18n from 'src/assets/translations';

import Avatar from 'src/components/FooterBar/Avatar';
import { ModalActions } from '../../../store/actions/modal';

interface Props {
    onLayout?: () => void;
    dispatch: Dispatch;
    theme: ThemeInterface;

    syncItems: any[];
}

class ProfileFooter extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    logoutAsk = () => {
        const options = [I18n.t('buttons.logout')];
        this.props.dispatch(ModalActions.pickerOpen(options, true, this._logout))
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <View style={this.style.leftSide}>
                    <Text style={this.style.leftMainText}>Username</Text>
                    <Text style={this.style.leftSubText}>User</Text>
                </View>
                <Avatar editMode />
                <TouchableOpacity style={this.style.rightSide} onPress={this.logoutAsk}>
                    <Text style={this.style.rightSideText}>{I18n.t('buttons.logout')}</Text>
                    <Icon name={"sign-out-alt"} style={this.style.rightSideIcon} />
                </TouchableOpacity>
            </View>
        );
    }

    _logout = () => {
        if (this.props.syncItems.length > 0) {
            this._askLogoutWhenNotSync();
            return;
        }

        this._forceLogout();
    }


    _askLogoutWhenNotSync = () => {
        Alert.alert(
            'Brak synchronizacji',
            "Pewne wykonane akcje (np. dodanie setu) zostały wykonane w trybie offline i po wylogowaniu zostaną utracone. \n\nAby temu zapobiec kliknij anuluj, następnie połącz się z internetem",
            [
                { text: I18n.t('buttons.cancel'), onPress: () => { }, style: 'cancel' },
                { text: I18n.t('buttons.logout'), onPress: () => this._forceLogout()},
            ]
        )
    }

    _forceLogout = () => this.props.dispatch(AuthActions.logout());
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    syncItems: state.sync.items
});

export default connect(mapStateToProps)(ProfileFooter);
