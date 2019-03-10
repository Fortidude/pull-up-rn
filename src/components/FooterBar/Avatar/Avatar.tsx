import React from 'react';
import { Dispatch } from 'redux';
import { StyleSheet, TouchableOpacity, Image, Animated, Easing, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

//@ts-ignore
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';

import I18n from 'src/assets/translations';

import Styles from './Avatar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';
import HapticFeedback from 'src/service/Haptic';
import { NavigationActions } from 'react-navigation';
import CircleProgress from 'src/components/CircleProgress/CircleProgress';
import User, { getCircuitLeftData } from 'src/models/User';
import { PlannerFooterCircleComponent, SettingsActions } from 'src/store/actions/settings';
import PickAvatar from './PickAvatar';
import { UserActions } from 'src/store/actions/user';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileEditMode?: boolean;
    plannerEditMode?: boolean;
    plannerCustomMode?: boolean;
    user: User | null;
    avatar: string | null;
    plannerFooterCircleComponent: PlannerFooterCircleComponent,
    currentCircuitProgress: number
}

interface State {
    component: React.ReactNode;
    name: string;
}

class Avatar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    scaleValue = new Animated.Value(1);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        const { component, name } = this.getComponent(this.props);
        this.state = {
            component: component,
            name: name
        }
    }

//     shouldComponentUpdate(nextProps: Props, nextState: State) {
//         console.log('shouldComponentUpdate');
//         const shouldUpdate = nextProps.plannerEditMode !== this.props.plannerEditMode
//             || nextProps.profileEditMode !== this.props.profileEditMode
//             || nextProps.theme.name !== this.props.theme.name
//             || (nextProps.user && this.props.user && nextProps.user.id !== this.props.user.id)
//             || nextProps.avatar !== this.props.avatar
//             || nextProps.plannerFooterCircleComponent !== this.props.plannerFooterCircleComponent
//             || nextState.name !== this.state.name;
//         if (shouldUpdate) {
//            // this.processAnimate(nextProps);
//         }

//         return shouldUpdate;
//     }

    componentWillReceiveProps(nextProps: Props, nextState: State) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        this.processAnimate(nextProps);
    }

    onPress = () => {
        if (this.props.plannerEditMode && this.props.plannerCustomMode) {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'AddTraining' }));
            return;
        }

        if (this.props.plannerEditMode && !this.props.plannerCustomMode) {
            //@ts-ignore
            this.refs.avatar.measure((x, y, width, height, windowX, windowY) => {
                this.props.dispatch(ModalActions.goalCreateOpen(windowX, windowY));
            })
            return;
        }

        if (this.props.profileEditMode) {
            this.pickAvatar();
            return;
        }

        HapticFeedback('impactLight');
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
    }

    render() {
        let extraSyles = {};
        if (this.props.plannerFooterCircleComponent === 'avatar') {
            extraSyles = { ...extraSyles, ...this.style.footerAvatarShadow };
        } else {
            extraSyles = { borderColor: 'transparent', borderWidth: 10 }
        }

        const opacity = this.scaleValue.interpolate({
            inputRange: [1, 10],
            outputRange: [1, 0]
        })

        return (
            <TouchableOpacity ref="avatar" onPress={this.onPress}>
                <Animated.View style={[this.style.footerAvatar, extraSyles, { opacity: opacity, transform: [{ scale: this.scaleValue }] }]}>
                    {this.state.component}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    processAnimate = (props: Props) => {
        if (!props.plannerCustomMode) {
            //    return;
        }

        Animated.timing(this.scaleValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            const { name, component } = this.getComponent(props);
            this.setState({ component: component, name: name }, () => {
                Animated.timing(this.scaleValue, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.bezier(0.5, 2, 0.5, 1.2),
                    useNativeDriver: true
                }).start();
            });
        })
    }

    getComponent = (props: Props) => {

        if (props.profileEditMode && !props.avatar) {
            return {
                name: 'camera',
                component: <View>
                    <Icon name="camera" style={[this.style.icon]} size={40} />
                </View>
            }
        }

        if (props.plannerEditMode) {
            return {
                name: 'plus',
                component: <AntIcon name="plus" style={[this.style.icon, { marginTop: 3 }]} size={50} />
            }
        }

        if (props.user && props.plannerFooterCircleComponent === 'circuit_left') {
            const data = getCircuitLeftData(props.user)
            return {
                name: 'circuit-left',
                component: <CircleProgress
                    fill={data.percent}
                    backgroundColor={props.theme.colors.plannerFooterCircleProgressBackground}
                    size={70}
                    progressWidth={StyleSheet.hairlineWidth}
                    title={data.text}
                    subTitle={I18n.t('mics.circuit_end')}
                    noShadow />
            }
        }

        if (props.user && props.plannerFooterCircleComponent === 'circuit_progress') {
            return {
                name: 'circuit-progress',
                component: <CircleProgress
                    fill={props.currentCircuitProgress}
                    backgroundColor={props.theme.colors.plannerFooterCircleProgressBackground}
                    size={70}
                    progressWidth={StyleSheet.hairlineWidth}
                    subTitle={I18n.t('mics.effectiveness')}
                    noShadow />
            }
        }

        if (props.avatar) {
            return {
                name: 'avatar',
                component: <View>
                    <Image style={[this.style.image]} source={{ uri: props.avatar }} />
                    {this.props.profileEditMode && <Icon name="camera" style={[this.style.icon, this.style.cameraIcon]} size={30} />}
                </View>
            }
        }

        return {
            name: 'user-ninja',
            component: <View>
                <Icon name="user-ninja" style={[this.style.icon]} size={40} />
            </View>
        }
    }

    pickAvatar = () => {
        const options = ["Camera", "Library"];
        const onSuccess = (base64Image: string) => {
            this.props.dispatch(UserActions.changeAvatar(base64Image));
        }

        this.props.dispatch(ModalActions.pickerOpen(options, true, (index) => {
            switch (index) {
                case 0: {
                    PickAvatar.launchCamera(onSuccess);
                    break;
                }
                case 1: {
                    PickAvatar.launchImageLibrary(onSuccess);
                    break;
                }
            }
        }))
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    user: state.user.current,
    avatar: state.user.current && state.user.current.avatar,
    plannerEditMode: state.app.plannerEditMode,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false,
    plannerFooterCircleComponent: state.settings.plannerFooterCircleComponent,
    currentCircuitProgress: state.planner.statistics ? state.planner.statistics.current_circle_percent_goals_achieved : 0,
});

export default connect(mapStateToProps)(Avatar);
