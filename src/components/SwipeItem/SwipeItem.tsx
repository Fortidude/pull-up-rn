import React, { ReactFragment } from 'react';
import { Animated, PanResponder, View, Text } from 'react-native';
import Styles from './SwipeItem.styles';
import { ThemeValueInterface } from '../../assets/themes';
import Haptic from 'src/service/Haptic';

interface Props {
    children: ReactFragment;
    style?: StyleSheet;

    rightButtons?: ReactFragment[];
    rightButtonWidth?: number;

    leftSwipe?: ReactFragment;
    leftSwipeReached?: ReactFragment;
    leftSwipeReleaseCallback?: () => void;
    leftSwipeWidth?: number;

    animateOut?: boolean;

    onMoveBegin?: () => void;
    onMoveEnd?: () => void;
}

interface State {
    swipePosition: Animated.Value;
    opacity: Animated.Value;
    leftSwipeReached: boolean;
}

class SwipeItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    closed = true;
    offset = 0;

    constructor(props: Props) {
        super(props);

        this.style = Styles();
        this.state = {
            swipePosition: new Animated.Value(0),
            opacity: new Animated.Value(0),

            leftSwipeReached: false
        }
    }

    componentDidMount() {
        this._turnOnOpacity();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!this.props.animateOut && nextProps.animateOut) {
            this._turnOffOpacity();
        }

        if (this.props.animateOut && !nextProps.animateOut) {
            this._turnOnOpacity();
        }
    }

    getSwipePosition = () => {
        return this.state.swipePosition;
    }

    forceOpenRight = () => {
        this.closed = false;
        Animated.spring(this.state.swipePosition, {
            toValue: this.getMaxLeftSwipe(),
            friction: 5,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    forceOpenLeft = () => {
        this.closed = false;
        this.offset = this.getMaxRightSwipe();
        Animated.spring(this.state.swipePosition, {
            toValue: this.getMaxRightSwipe(),
            friction: 5,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    forceClose = () => {
        this.closed = true;
        Animated.spring(this.state.swipePosition, {
            toValue: 0,
            friction: 5,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    toggle = () => {
        //@ts-ignore
        const currentValue = this.state.swipePosition._value;
        const maxLeftNeeded = this.getMaxLeftSwipe();

        let toValue = 0
        let requiredRatio = this.closed ? 0.1 : 0.9
        if (currentValue <= maxLeftNeeded * requiredRatio) {
            toValue = maxLeftNeeded;
        }

        this.closed = toValue === 0;
        this.offset = toValue;
        Animated.spring(this.state.swipePosition, {
            toValue: toValue,
            friction: 5,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    onRelease = () => {
        //@ts-ignore
        const currentValue = this.state.swipePosition._value;
        const maxRightNeeded = this.getMaxRightSwipe();

        if (currentValue >= maxRightNeeded && this.props.leftSwipeReleaseCallback) {
            this.props.leftSwipeReleaseCallback();
        }
    }

    render() {
        const rightButtons = this.props.rightButtons || [];

        return (
            <Animated.View style={[{ flexDirection: 'row', opacity: this.state.opacity }]}>
                {!!this.props.leftSwipe && <Animated.View style={[{ position: 'absolute', height: '100%', transform: [{ translateX: this.getLeftSwipeComponentTranslateX() }] }]}>
                    {!this.state.leftSwipeReached && this.props.leftSwipe}
                    {this.state.leftSwipeReached && this.props.leftSwipeReached}
                </Animated.View>}

                <Animated.View {...this.panResponder().panHandlers}
                    style={[this.style.container, this.props.style, { transform: [{ translateX: this.state.swipePosition }] }]}>
                    <View>
                        {this.props.children}
                    </View>
                </Animated.View>

                {rightButtons.map((button, key) => (
                    <Animated.View key={key} style={[this.style.rightButtonsContainer, { width: 50, right: -this.getMaxLeftSwipe(), transform: [{ translateX: this.getRightButtonTranslateX() }] }]}>
                        {button}
                    </Animated.View>
                ))}
            </Animated.View>
        );
    }

    getMaxLeftSwipe = () => {
        const buttonWidth = this.props.rightButtonWidth || 50;
        return -((this.props.rightButtons || []).length * buttonWidth);
    }

    getMaxRightSwipe = () => this.props.leftSwipeWidth || 70;

    getRightButtonRightPosition = () => {
        const maxSwipe = this.getMaxLeftSwipe();
        return this.state.swipePosition.interpolate({
            inputRange: [maxSwipe, 0],
            outputRange: [-(maxSwipe), 0],
            extrapolate: 'extend'
        });
    }

    getRightButtonTranslateX = () => {
        const maxSwipe = this.getMaxLeftSwipe();
        return this.state.swipePosition.interpolate({
            inputRange: [maxSwipe * 2, maxSwipe * 1.5],
            outputRange: [maxSwipe * 0.1, 0],
            extrapolate: 'extend'
        });
    }

    getRightButtonWidth = () => {
        const buttonWidth = this.props.rightButtonWidth || 50;
        const maxSwipe = this.getMaxLeftSwipe();
        return this.state.swipePosition.interpolate({
            inputRange: [maxSwipe, 0],
            outputRange: [buttonWidth, 0],
            extrapolate: 'extend'
        })
    }

    getLeftSwipeComponentTranslateX = () => {
        const maxSwipe = this.getMaxRightSwipe();
        return this.state.swipePosition.interpolate({
            inputRange: [0, maxSwipe],
            outputRange: [-maxSwipe / 3, maxSwipe / 3],
            extrapolate: 'extend'
        });
    }

    panResponder = () => {
        return PanResponder.create({
            onMoveShouldSetPanResponder: (evt, { moveX, moveY, dx, dy }) => {
                const draggedLeft = dx < -30;
                const draggedRight = dx > 30;

                return (draggedLeft || draggedRight)
            },

            onPanResponderGrant: () => {
                if (this.props.onMoveBegin) {
                    this.props.onMoveBegin();
                }
            },
            onPanResponderMove: (evt, { moveX, moveY, dx, dy }) => {
                const value = Math.round(dx + this.offset);
                this.state.swipePosition.setValue(value);

                const maxRightSwipe = this.getMaxRightSwipe();
                if (value > maxRightSwipe && !this.state.leftSwipeReached) {
                    this.offset = value;
                    this.setState({ leftSwipeReached: true });
                    Haptic('selection');
                } else if (value <= maxRightSwipe && this.state.leftSwipeReached) {
                    this.offset = value;
                    this.setState({ leftSwipeReached: false });
                }
            },
            onPanResponderRelease: () => {
                if (this.props.onMoveEnd) {
                    this.props.onMoveEnd();
                }

                this.toggle();
                this.onRelease();
            },
            onPanResponderTerminate: () => {
                if (this.props.onMoveEnd) {
                    this.props.onMoveEnd();
                }
                this.toggle();
            }
        });
    }

    _turnOnOpacity = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start();
    }

    _turnOffOpacity = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
        }).start();
    }
}

export default SwipeItem;
