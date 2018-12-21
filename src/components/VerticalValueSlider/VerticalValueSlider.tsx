import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, PanResponder } from 'react-native';
import { connect } from 'react-redux';

import Styles from './VerticalValueSlider.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import { size } from './VerticalValueSlider.styles';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    max: number;
    value: number;
    onChange: (value: number) => void;
}

interface State {
    positionMax: number;
    range: number[]
}

class VerticalValueSlider extends React.Component<Props, State> {
    style: ThemeValueInterface;

    position = new Animated.Value(0);
    positionOffset = 0;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            positionMax: 0,
            range: [...Array(this.props.max).keys()].map(val => val + 1)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    animateTo = (newPosition: number) => {
        this.positionOffset = newPosition;
        Animated.timing(this.position, {
            toValue: newPosition
        }).start();
    }

    render() {
        return (
            <View onLayout={this._onLayout} ref="sliderRef" style={this.style.container}>
                <View style={[this.style.fieldBackground, { height: this.state.positionMax }]}></View>
                <Animated.View style={[this.style.filled, { height: this.position }]}></Animated.View>
                <Animated.View {...this._getPanHandlers().panHandlers} style={[this.style.slider, { transform: [{ translateY: this.position }] }]}>
                    <View style={this.style.innerSlider}></View>
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

                this.position.setValue(gestureState.dy + this.positionOffset);
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

        calculatedValue = calculatedValue !== null ? calculatedValue : 0;

        const newPosition = this.state.positionMax * (calculatedValue / (this.props.max - 1));
        calculatedValue += 1;

        this.animateTo(newPosition);

        // //@ts-ignore
        this.props.onChange(calculatedValue);
    }

}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(VerticalValueSlider);
