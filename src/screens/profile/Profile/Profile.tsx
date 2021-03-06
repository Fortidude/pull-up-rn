import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';

import getStyle from './Profile.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import SettingListItem, { SettingListPlaceholder } from 'src/components/SettingListItem';
import I18n from 'src/assets/translations';
import User from 'src/models/User';
import { UserActions } from 'src/store/actions/user';
import Planner from 'src/models/Planner';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    locale: string;
    user: User;
    emptyList: boolean;
    plannerCustomMode: boolean;
};

interface State {
    plannerCustomMode: boolean;
}

class Profile extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            plannerCustomMode: props.plannerCustomMode
        }
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

    toggleUserPlannerCustomMode = () => {
        this.setState({ plannerCustomMode: !this.state.plannerCustomMode });
        this.props.dispatch(UserActions.togglePlannerCustomMode());
    }

    removeUser = () => {
        const onConfirm = () => {
            this.props.dispatch(ModalActions.informationOpen(I18n.t('warnings.attention'), I18n.t('warnings.user_removed_data_erased'), true));
            setTimeout(() => {
                this.props.dispatch(UserActions.removeUser());
            }, 2000);
        }

        const options = [I18n.t('settings.remove_my_account')];
        this.props.dispatch(ModalActions.pickerOpen(options, true, onConfirm))
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        return (
            <ScrollView style={this.style.container}>
                <SettingListPlaceholder />
                <SettingListItem icon="cog" onPress={this.goToSettingsPage} text={I18n.t('settings.settings')} rightArrow />
                <SettingListItem
                    last
                    rightArrow
                    icon="bell"
                    onPress={this.goToNotificationsPage}
                    text={I18n.t('settings.notifications.title')}
                />

                <SettingListPlaceholder />
                <SettingListItem
                    last
                    icon="hourglass-start"
                    onPress={() => { }}
                    text={I18n.t('settings.circuit_length')}
                    rightText={`${this.props.user.days_per_circuit} ${I18n.t('mics.days').toLocaleLowerCase()}`}
                />
                {!this.props.emptyList &&
                    <SettingListItem
                        last
                        icon="list-ul"
                        text={I18n.t('settings.planner_calendar_mode')}
                        bottomLabel={I18n.t('settings.planner_calendar_mode_subtext')}
                        rightOnSwitch={this.toggleUserPlannerCustomMode}
                        rightSwitch={!this.state.plannerCustomMode}
                    />
                }

                <SettingListPlaceholder />
                <SettingListItem icon="play" onPress={() => this.props.dispatch(UserActions.manuallyGoToOnboarding())}
                    text={I18n.t('settings.show_on_boarding')}
                    subText={I18n.t('settings.show_on_boarding_subtext')}
                    last
                />

                <SettingListPlaceholder />
                <SettingListItem icon="trash" onPress={this.removeUser} danger text={I18n.t('settings.remove_my_account')} last />

                <View style={{ height: FOOTER_HEIGHT * 1.5 }}></View>
            </ScrollView>
        );
    }
}

const isEmpty = (planner: Planner) => {
    let isEmpty = true;
    planner.trainings.forEach(training => {
        if (training.goals.length > 0) {
            isEmpty = false;
        }
    });

    return isEmpty;
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale,
    user: state.user.current,
    emptyList: isEmpty(state.planner.planner),
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false
});

export default connect(mapStateToProps)(Profile);
