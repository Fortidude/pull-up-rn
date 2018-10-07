import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Styles from './TopProgressBar.styles';
import CircleProgress from 'src/components/CircleProgress';
import I18n from 'src/assets/translations';
import User from 'src/models/User';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    user: User
    scrollViewPositionY: Animated.Value;
}
interface State {
    swipePosition: Animated.Value
}

class TopProgressBar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    offset = 0;
    closed = true;
    static defaultProps = {
        scrollViewPositionY: new Animated.Value(0)
    }

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.props.scrollViewPositionY.addListener(() => this.forceClose());

        this.state = {
            swipePosition: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    forceClose = async () => {
        this.offset = 0;
        this.closed = true;
        Animated.spring(this.state.swipePosition, {
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    toggleHeader = async () => {
        const currentPosition = this.state.swipePosition._value;
        const maxHeight = this.style.topContainerHeight;

        let toValue = 0
        let requiredRatio = this.closed ? 0.1 : 0.9
        if (currentPosition >= maxHeight * requiredRatio) {
            toValue = maxHeight;
        }

        if (currentPosition >= maxHeight * 1.2 && !this.closed) {
            toValue = 0;
        }

        this.closed = toValue === 0;
        this.offset = toValue;

        if (currentPosition === maxHeight || currentPosition === 0) {
            return;
        }

        Animated.spring(this.state.swipePosition, {
            toValue: toValue,
            friction: 5,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        const headerTranslate = this.state.swipePosition.interpolate({
            inputRange: [0, this.style.topContainerHeight],
            outputRange: [-(this.style.topContainerHeight), 0],
        });

        const _panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                this.props.scrollViewPositionY.stopAnimation
            },
            onPanResponderMove: (evt, gestureState) => {
                this.state.swipePosition.setValue(gestureState.dy + this.offset);
                console.log('move');
            },
            onPanResponderRelease: () => {
                this.toggleHeader();
            },
            onPanResponderTerminate: () => {
                this.toggleHeader();
            }
        });

        return (
            <React.Fragment>
                <Animated.View {..._panResponder.panHandlers} style={[this.style.topContainer, {
                    transform: [{ translateY: (headerTranslate) }],
                    zIndex: 1
                }]}>
                    <View style={this.style.contentContainer}>
                        <View style={this.style.background}>
                            <View style={this.style.circlesContainer}>
                                <View style={[this.style.topCircleContainer, this.style.topCircleLeft]}>
                                    <CircleProgress fill={this._countProgressPercent()} progressWidth={2} subTitle={I18n.t('mics.effectiveness')} />
                                </View>
                                <View style={[this.style.topCircleContainer, this.style.topCircleRight]}>
                                    <CircleProgress fill={this._countLeftPercent()} progressWidth={3} title={`${this._getDaysLeft()} dni`} subTitle={I18n.t('mics.left')} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Animated.View style={[this.style.toggleButtonContainer]}>
                        <View style={this.style.toggleButton}>
                            <View style={[this.style.toggleButtonBar, { bottom: 10 }]}></View>
                            <View style={[this.style.toggleButtonBar, { bottom: 8 }]}></View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </React.Fragment>
        );
    }

    _countProgressPercent = () => {
        return 0
    }

    _getDaysLeft = () => this.props.user.days_left_circuit.toString();
    _countLeftPercent = () => {
        const daysLeft = this.props.user.days_left_circuit > 0 ? this.props.user.days_left_circuit : this.props.user.days_per_circuit;
        return Math.round((daysLeft / this.props.user.days_per_circuit) * 100);
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    user: state.user.current
});

export default connect(mapStateToProps)(TopProgressBar);
