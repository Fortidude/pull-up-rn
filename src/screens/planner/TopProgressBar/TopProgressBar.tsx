import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Styles from './TopProgressBar.styles';
import CircleProgress from 'src/components/CircleProgress';
import I18n from 'src/assets/translations';
import User, { getCircuitLeftData } from 'src/models/User';
import { StatisticsInterface } from 'src/models/Statistics';
import Events from 'src/service/Events';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    statistics: StatisticsInterface;
    user: User;
    scrollViewPositionY: Animated.Value;
    nav: any;
}
interface State {
    swipePosition: Animated.Value;
}

class TopProgressBar extends React.Component<Props, State> {
    closePosition = 0;
    style: ThemeValueInterface;
    offset = 0;
    closed = true;
    hidden = false;
    static defaultProps = {
        scrollViewPositionY: new Animated.Value(0)
    }

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.props.scrollViewPositionY.addListener(() => this.forceClose());

        Events.listenTo("FULLSCREEN_MODAL_VISIBLE", "TOP_PROGRESS_BAR", this.hide);
        Events.listenTo("FULLSCREEN_MODAL_HIDDEN", "TOP_PROGRESS_BAR", this.show);

        this.state = {
            swipePosition: new Animated.Value(1)
        }

        Events.listenTo("HEADER_CENTER_RELEASE", "TOP_PROGRESS_BAR", this.toggleHeader);
        Events.listenTo("HEADER_CENTER_MOVE", "TOP_PROGRESS_BAR", (value) => {
            this.state.swipePosition.setValue(value + this.offset);
        });
    }

    componentWillUnmount() {
        Events.remove("FULLSCREEN_MODAL_VISIBLE", "TOP_PROGRESS_BAR");
        Events.remove("FULLSCREEN_MODAL_HIDDEN", "TOP_PROGRESS_BAR");
        Events.remove("HEADER_CENTER_MOVE", "TOP_PROGRESS_BAR");
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        const index = nextProps.nav.index;
        if (index === 1 && !this.props.nav.isTransitioning && nextProps.nav.isTransitioning && !this.hidden) {
            this.hide();
        } else if (index === 0 && nextProps.nav.isTransitioning && this.hidden) {
            this.show();
        }
    }

    hide = () => {
        this.hidden = true;
        Animated.timing(this.state.swipePosition, {
            toValue: -40,
            useNativeDriver: true
        }).start();
    }

    show = () => {
        this.hidden = false;
        Animated.timing(this.state.swipePosition, {
            toValue: this.closePosition,
            useNativeDriver: true
        }).start();
    }

    forceClose = async () => {
        this.offset = 0;
        this.closed = true;
        Animated.spring(this.state.swipePosition, {
            toValue: this.closePosition,
            useNativeDriver: true
        }).start();
    }

    toggleHeader = async () => {
        //@ts-ignore
        const currentPosition = this.state.swipePosition._value;
        const maxHeight = this.style.topContainerHeight;

        let toValue = this.closePosition;
        let requiredRatio = this.closed ? 0.1 : 0.9
        if (currentPosition >= maxHeight * requiredRatio) {
            toValue = maxHeight;
        }

        if (currentPosition >= maxHeight * 1.2 && !this.closed) {
            toValue = this.closePosition;
        }

        this.closed = toValue === this.closePosition;
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
            },
            onPanResponderRelease: () => {
                this.toggleHeader();
            },
            onPanResponderTerminate: () => {
                this.toggleHeader();
            }
        });

        const circuitLeftData = getCircuitLeftData(this.props.user);

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
                                    <CircleProgress fill={circuitLeftData.percent} progressWidth={3} title={circuitLeftData.text} subTitle={I18n.t('mics.circuit_end')} />
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
        if (this.props.statistics) {
            return this.props.statistics.current_circle_percent_goals_achieved;
        }

        return 0;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    user: state.user.current,
    statistics: state.planner.statistics,
    nav: state.nav
});

export default connect(mapStateToProps)(TopProgressBar);
