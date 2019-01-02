import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import Styles from './VerticalValueSlider.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import { size } from './VerticalValueSlider.styles';
import Haptic from 'src/service/Haptic';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    max: number;
    value: number;
    onChange: (value: number) => void;
}

interface State {
    value: number;
    positionMax: number;
    range: number[]
}

class VerticalValueSlider extends React.Component<Props, State> {
    style: ThemeValueInterface;

    position = new Animated.Value(0);
    positionOffset = 0;

    constructor(props: Props) {
        super(props);

        this.style = Styles(props.theme);
        this.state = {
            value: props.value,
            positionMax: 0,
            range: [...Array(props.max).keys()].map(val => val + 1)
        }

        this.position.addListener(({ value }) => this._onMove(value));
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.state.value !== nextProps.value
            || this.state.positionMax !== nextState.positionMax;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    animateTo = (newPosition: number) => {
        this.positionOffset = newPosition;
        Animated.timing(this.position, {
            toValue: newPosition,
            duration: 200
        }).start();
    }

    render() {
        return (
            <View onLayout={this._onLayout} ref="sliderRef" style={this.style.container}>
                <View style={[this.style.fieldBackground, { height: this.state.positionMax }]}></View>
                <Animated.View style={[this.style.filled, { height: this.position }]}></Animated.View>
                <Animated.View {...this._getPanHandlers().panHandlers} style={[this.style.sliderContainer, { transform: [{ translateY: this.position }] }]}>
                    <View style={this.style.slider}>
                        <View style={this.style.innerSlider}></View>
                    </View>
                </Animated.View>
            </View>
        );
    }

    _onLayout = () => {
        if (!this.refs.sliderRef || this.state.positionMax > 0) {
            return;
        }

        //@ts-ignore
        this.refs.sliderRef.measure((x, y, width, height, posX, posY) => {
            this.setState({ positionMax: height - size });
            const animateTo = this.state.positionMax * ((this.props.value - 1) / (this.props.max - 1));
            this.animateTo(animateTo);
        });
    }

    _getPanHandlers = () => {
        return PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy <= (-this.positionOffset) || gestureState.dy >= (this.state.positionMax - this.positionOffset)) {
                    return;
                }

                const position = gestureState.dy + this.positionOffset;
                this.position.setValue(position);
            },
            onPanResponderRelease: () => {
                this._onRelease();
            },
            onPanResponderTerminate: () => {
                this._onRelease();
            }
        });
    }

    _onRelease = () => {
        //@ts-ignore
        let positionaValue = this.position._value;
        this.positionOffset = positionaValue;

        let calculatedValue = this._calculatePosition(positionaValue);
        calculatedValue = calculatedValue !== null ? calculatedValue : 0;
        const newPosition = this.state.positionMax * (calculatedValue / (this.props.max - 1));
        this.animateTo(newPosition);
    }

    _onMove = (position: number) => {
        let calculatedValue = this._calculatePosition(position);

        calculatedValue = calculatedValue !== null ? calculatedValue : 0;
        calculatedValue += 1;

        if (this.props.value !== calculatedValue) {
            Haptic('selection');
            this.setState({ value: calculatedValue }, () => {
                //@ts-ignore
                this.props.onChange(calculatedValue);
            })
        }
    }

    _calculatePosition = (positionaValue: number): number | null => {
        let percent = (positionaValue / this.state.positionMax);
        let percentValue = (this.props.max - 1) * percent;
        let calculatedValue: number | null = null;

        let prevValue = 0;
        this.state.range.forEach((currValue, index) => {
            if (calculatedValue !== null || currValue === 0) {
                return;
            }

            if (percentValue < 0.5) {
                calculatedValue = 0;
            } else if (percentValue <= (currValue - 0.5)) {
                calculatedValue = prevValue;
            } else if (percentValue > (currValue - 0.5) && percentValue <= (currValue + 0.5)) {
                calculatedValue = currValue
            }

            prevValue = currValue;
        })

        return calculatedValue;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(VerticalValueSlider);
