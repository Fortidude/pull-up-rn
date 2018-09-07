import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, TouchableOpacity, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './TopProgressBar.styles';
import CircleProgress from '../../../components/CircleProgress';
import I18n from '../../../assets/translations';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    scrollViewPositionY: Animated.Value;
}
interface State {
    swipePosition: Animated.Value
}

class TopProgressBar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    offset = 0;
    static defaultProps = {
        scrollViewPositionY: new Animated.Value(0)
    }

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.props.scrollViewPositionY.addListener(() => this.toggleHeader(false));

        this.state = {
            swipePosition: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    toggleHeader = (toggle: boolean) => {
        this.offset = toggle ? 110 : 0;
        Animated.spring(this.state.swipePosition, {
            toValue: this.offset
        }).start();
    }

    render() {
        const clampedValue = Animated.diffClamp(
            this.state.swipePosition.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }), 0, this.style.topContainerHeight
        );
        const headerTranslate = clampedValue.interpolate({
            inputRange: [0, this.style.topContainerHeight],
            outputRange: [-(this.style.topContainerHeight), 0],
            extrapolate: 'clamp',
        });
        const spinTogglerButton = clampedValue.interpolate({
            inputRange: [0, this.style.topContainerHeight],
            outputRange: ["0deg", "180deg"],
            extrapolate: 'clamp',
        })

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
            onPanResponderRelease: (evt, gestureState) => {
                const offset = gestureState.dy + this.offset;
                this.offset = offset > 110 ? 110 : offset < -110 ? 0 : Math.abs(offset);
                if (this.offset <= 50 && this.offset !== 0) {
                    this.toggleHeader(false);
                } else if (this.offset > 50 && this.offset !== 110) {
                    this.toggleHeader(true);
                }
            },
        });

        return (
            <React.Fragment>
                <Animated.View {..._panResponder.panHandlers} style={[this.style.topContainer, {
                    transform: [{ translateY: headerTranslate }],
                    zIndex: 1
                }]}>
                    <View style={this.style.topCirclesContainer}>
                        <View style={[this.style.topCircleContainer, this.style.topCircleLeft]}>
                            <CircleProgress fill={33} progressWidth={2} subTitle={I18n.t('mics.effectiveness')} />
                        </View>
                        <View style={[this.style.topCircleContainer, this.style.topCircleRight]}>
                            <CircleProgress fill={75} progressWidth={3} title={"5 dni"} subTitle={I18n.t('mics.left')} />
                        </View>
                    </View>
                    <Animated.View
                        style={[this.style.topToggledButton]}>
                        <Animated.View style={{transform: [{rotate: spinTogglerButton}],  position: 'absolute', bottom: 0}}>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(TopProgressBar);
