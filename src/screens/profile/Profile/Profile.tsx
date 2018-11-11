import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';

import getStyle from './Profile.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import SettingListItem, { SettingListPlaceholder } from 'src/components/SettingListItem';
import I18n from 'src/assets/translations';
import User from 'src/models/User';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    locale: string;
    user: User;
};
class Profile extends React.Component<Props> {
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

    goToSettingsPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
    };

    goToNotificationsPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Notifications' }));
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        
        return (
            <View style={this.style.container}>
                <SettingListPlaceholder />
                <SettingListItem
                    last
                    icon="hourglass-start"
                    onPress={() => { }}
                    text={I18n.t('settings.circuit_length')}
                    rightText={`${this.props.user.days_per_circuit} ${I18n.t('mics.days').toLocaleLowerCase()}`}
                />

                <SettingListPlaceholder />
                <SettingListItem icon="cog" onPress={this.goToSettingsPage} text={I18n.t('settings.settings')} rightArrow />
                <SettingListItem
                    last
                    rightArrow
                    icon="bell"
                    onPress={this.goToNotificationsPage}
                    text={I18n.t('settings.notifications')}
                />

                <SettingListPlaceholder />
                <SettingListItem icon="trash" onPress={() => { }} danger text={I18n.t('settings.remove_my_account')} last />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale,
    user: state.user.current
});

export default connect(mapStateToProps)(Profile);
