import React, { ReactFragment } from 'react';
import { Animated, PanResponder, View, Text } from 'react-native';
import Styles from './SwipeItem.styles';
import { ThemeValueInterface } from '../../assets/themes';

interface Props {
    children: ReactFragment;
    style?: StyleSheet;
    rightButtons?: ReactFragment[];
    rightButtonWidth?: number;

    onMoveBegin?: () => void;
    onMoveEnd?: () => void;
}

interface State {
    swipePosition: Animated.Value;
}

class SwipeItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    closed = true;
    offset = 0;

    constructor(props: Props) {
        super(props);

        this.style = Styles();
        this.state = {
            swipePosition: new Animated.Value(0)
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    getSwipePosition = () => {
        return this.state.swipePosition;
    }

    forceOpenRight = () => {
        this.closed = false;
        Animated.spring(this.state.swipePosition, {
            toValue: this.getMaxLeftSwipe(),
            friction: 5,
            tension: 40
        }).start();
    }

    forceClose = () => {
        this.closed = true;
        Animated.spring(this.state.swipePosition, {
            toValue: 0,
            friction: 5,
            tension: 40
        }).start();
    }

    toggle = () => {
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
            tension: 40
        }).start();
    }

    render() {
        const rightButtons = this.props.rightButtons || [];

        return (
            <View style={{ flexDirection: 'row' }}>
                <Animated.View {...this.panResponder().panHandlers}
                    style={[this.props.style, this.style.container, { transform: [{ translateX: this.state.swipePosition }] }]}>
                    <View>
                        {this.props.children}
                    </View>

                </Animated.View>



                {rightButtons.map((button, key) => (
                    <Animated.View key={key} style={[this.style.rightButtonsContainer, { right: this.getRightButtonRightPosition(), width: this.getRightButtonWidth() }]}>
                        {button}
                    </Animated.View>
                ))}
            </View>
        );
    }

    getMaxLeftSwipe = () => {
        const buttonWidth = this.props.rightButtonWidth || 50;
        return -((this.props.rightButtons || []).length * buttonWidth);
    }

    getRightButtonRightPosition = () => {
        const maxSwipe = this.getMaxLeftSwipe();
        return this.state.swipePosition.interpolate({
            inputRange: [maxSwipe, 0],
            outputRange: [-(maxSwipe), 0],
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
                this.state.swipePosition.setValue(Math.round(dx + this.offset));
            },
            onPanResponderRelease: () => {
                if (this.props.onMoveEnd) {
                    this.props.onMoveEnd();
                }
                this.toggle();
            },
            onPanResponderTerminate: () => {
                if (this.props.onMoveEnd) {
                    this.props.onMoveEnd();
                }
                this.toggle();
            }
        });
    }
}

export default SwipeItem;
