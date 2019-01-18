import React from 'react';
import { connect } from 'react-redux';
import { View, Linking } from 'react-native';
import { Dispatch } from 'redux';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import getStyle from './Notifications.styles';
import SettingListItem, { SettingListPlaceholder } from 'src/components/SettingListItem';
import I18n from 'src/assets/translations';
import PushNotification from 'src/service/PushNotifications';
import { NavigationActions } from 'react-navigation';

interface Props {
    dispatch: Dispatch,
    theme: ThemeInterface,
};

interface State {
    allowed: boolean;
}

class Notifications extends React.Component<Props, State> {
    style: ThemeValueInterface;
    checkingInterval: any;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
        this.state = {
            allowed: false
        }
    }

    componentDidMount() {
        PushNotification.request();
        this.checkPermissions();
        this.checkingInterval = setInterval(this.checkPermissions, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.checkingInterval);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    checkPermissions = () => {
        PushNotification.checkPersmissions()
            .then(allowed => {
                this.state.allowed !== allowed && this.setState({ allowed: allowed });
            });
    }

    goToAppSettings = () => {
        Linking.openURL('app-settings:notifications').then(() => {
            this.props.dispatch(NavigationActions.back());
        })
    }

    render() {
        const title = this.state.allowed ? 'settings.notifications.turned_on' : 'settings.notifications.turned_off';
        const icon = this.state.allowed ? 'bell' : 'bell-slash';

        return (
            <View style={this.style.container}>
                <SettingListPlaceholder />
                <SettingListItem
                    icon={icon}
                    text={I18n.t(title)}
                    onPress={this.goToAppSettings}
                    rightArrow={true}
                    last
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Notifications);
