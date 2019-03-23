import React from 'react';
import { Dispatch } from 'redux';
import { Dimensions, Text, Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Styles from './StepTwo.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import BottomSections from '../Components/BottomSections';
import PushNotification from 'src/service/PushNotifications';
import Spinner from 'src/components/Spinner/Spinner';
import I18n from 'src/assets/translations';

const { width } = Dimensions.get('window');
const MAX_POSITION_X = width * 0.10;
interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    currentStep: number;
    goNext: () => void;
    viewRef: any;
}

interface State {
    permissionChecking: boolean;
}

class StepTwo extends React.Component<Props, State> {
    style: ThemeValueInterface;
    positionX = new Animated.Value(MAX_POSITION_X);
    alertScale = new Animated.Value(1);

    dotVisible = new Animated.Value(0);
    nextStepButtonVisible = new Animated.Value(0);

    checkNotificationsOpacity = new Animated.Value(1);
    checkNotificationsInterval: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            permissionChecking: false
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.props.currentStep !== nextProps.currentStep
            || this.state.permissionChecking !== nextState.permissionChecking;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        this._progressAnimate(nextProps);
    }

    componentDidMount() {
        this._progressAnimate(this.props);
    }

    turnOnNotifications = () => {
        if (this.state.permissionChecking) {
            return;
        }

        clearInterval(this.checkNotificationsInterval);
        PushNotification.request();
        this.setState({ permissionChecking: true });

        this.checkNotificationsInterval = setInterval(() => {
            const callback = (res: any) => {
                if (res) {
                    clearInterval(this.checkNotificationsInterval);
                    if (this.props.currentStep === 3) {
                        this.props.goNext();
                    }
                }
            }
            
            PushNotification.checkPersmissions(callback);
        }, 1000);
    }

    render() {
        const opacity = this.positionX.interpolate({
            inputRange: [-40, 0, 40],
            outputRange: [0, 1, 0]
        });

        const bellOpacity = this.positionX.interpolate({
            inputRange: [-MAX_POSITION_X, 0, MAX_POSITION_X],
            outputRange: [0, 1, 0]
        });

        const scale = this.positionX.interpolate({
            inputRange: [-MAX_POSITION_X, -MAX_POSITION_X + 1, 0, MAX_POSITION_X - 1, MAX_POSITION_X],
            outputRange: [0, 1, 1, 1, 0]
        });

        const alertRotate = this.alertScale.interpolate({
            inputRange: [0.9, 1, 1.1],
            outputRange: ['20deg', '0deg', '-20deg']
        });

        return (
            <React.Fragment>
                <Animated.View style={[this.style.bellContanier, { opacity: bellOpacity, transform: [{ rotate: alertRotate }] }]}>
                    <EvilIcons name="bell" size={120} color={"white"} />
                </Animated.View>
                <Animated.View style={[this.style.container, { opacity: opacity, transform: [{ scale }, { translateX: this.positionX }] }]}>

                    <View style={this.style.textContainer}>
                        <TouchableOpacity onPress={this.turnOnNotifications} style={this.style.buttonContainer}>
                            {!this.state.permissionChecking && <Text numberOfLines={1} style={this.style.buttonText}>{I18n.t('settings.notifications.turn_on')}</Text>}
                            {this.state.permissionChecking && <Spinner color={"white"} />}
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={{ width: '100%', opacity: this.nextStepButtonVisible }}>
                        <BottomSections goNext={this.props.goNext} />
                    </Animated.View>
                </Animated.View>
            </React.Fragment>
        );
    }

    _progressAnimate = (props: Props) => {
        if (props.currentStep === 3) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.alertScale, { toValue: 1, duration: 200, useNativeDriver: true }),
                    Animated.timing(this.alertScale, { toValue: 1.1, duration: 200, useNativeDriver: true }),
                    Animated.timing(this.alertScale, { toValue: 0.9, duration: 200, useNativeDriver: true }),
                    Animated.timing(this.alertScale, { toValue: 1.1, duration: 200, useNativeDriver: true }),
                ])
            ).start();

            Animated.parallel([
                Animated.timing(this.positionX, { toValue: 0, delay: 500, useNativeDriver: true }),
            ]).start(() => {
                Animated.timing(this.nextStepButtonVisible, {
                    delay: 500,
                    toValue: 1,
                }).start();
            });
        }

        if (props.currentStep > 3) {
            Animated.timing(this.positionX, {
                toValue: (-MAX_POSITION_X),
                useNativeDriver: true
            }).start();
        }
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(StepTwo);
