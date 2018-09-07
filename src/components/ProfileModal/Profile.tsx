import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';
import { View, Animated, Easing } from 'react-native';

import getStyle from './Profile.styles';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';
import SettingListItem from '../SettingListItem';
import { ModalActions } from '../../store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileModalVisible: boolean;
}
interface State {
    profileModalTop: any;
}

class ProfileModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
        this.state = {
            profileModalTop: new Animated.Value(props.profileModalVisible ? 0 : 100)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.profileModalVisible !== this.props.profileModalVisible) {
            const modalVisible = this.props.profileModalVisible;
            Animated.spring(this.state.profileModalTop, {
                toValue: modalVisible ? 0 : 100,
                friction: 6,
                tension: 50,
            }).start();
        }
    }

    goToSettingsPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
    };

    closeModal = () => {
        this.props.dispatch(ModalActions.profileClose());
    }

    render() {
        const profileModalTop = this.state.profileModalTop.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"]
        })

        return (
            <Animated.View style={[this.style.container, { top: profileModalTop }]}>

                <SettingListItem icon="cog" onPress={this.goToSettingsPage} text="Settings" rightArrow />
                <SettingListItem icon="user" onPress={this.closeModal} text="Option 1" />
                <SettingListItem icon="trash" onPress={() => { }} danger text="Remove my account" />

            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    profileModalVisible: state.modal.profileModalVisible
});

export default connect(mapStateToProps)(ProfileModal);
