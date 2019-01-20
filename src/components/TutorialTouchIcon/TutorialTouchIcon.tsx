import React from 'react';
import { Dispatch } from 'redux';
import { Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Styles from './TutorialTouchIcon.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { number } from 'prop-types';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onRef?: (any: any) => void;
    onPress?: () => void;

    color?: string;

    x?: Animated.Value | number;
    y?: Animated.Value | number;
}

class TutorialTouchIcon extends React.Component<Props> {
    style: ThemeValueInterface;

    ringOneScale = new Animated.Value(0);
    ringOneOpacity = new Animated.Value(1);
    ringTwoScale = new Animated.Value(0);
    ringTwoOpacity = new Animated.Value(1);

    opacity = new Animated.Value(0);
    opacityAnimation: Animated.CompositeAnimation

    ringRepeats = 0;
    ringAnimation: Animated.CompositeAnimation;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    show = () => {
        this.opacityAnimation = Animated.timing(this.opacity, {
            toValue: 1,
            useNativeDriver: true
        });

        this.opacityAnimation.start();
    }

    hide = () => {
        console.log('hide');
        this.opacityAnimation = Animated.timing(this.opacity, {
            toValue: 0,
            useNativeDriver: true
        });
        
        this.opacityAnimation.start();
    }

    animateRing = (hideOnEnd = false) => {
        if (this.ringRepeats === 3) {
            this.ringRepeats = 0;
            hideOnEnd && this.hide();
            return;
        }

        this.ringAnimation = Animated.sequence([
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(this.ringOneScale, { toValue: 2, duration: 600, useNativeDriver: true }),
                    Animated.timing(this.ringOneOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                    Animated.timing(this.ringOneScale, { toValue: 0, duration: 1, useNativeDriver: true }),
                    Animated.timing(this.ringOneOpacity, { toValue: 1, duration: 1, useNativeDriver: true }),
                ]),
                Animated.sequence([
                    Animated.timing(this.ringTwoScale, { toValue: 2, duration: 600, delay: 200, useNativeDriver: true }),
                    Animated.timing(this.ringTwoOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                    Animated.timing(this.ringTwoScale, { toValue: 0, duration: 1, useNativeDriver: true }),
                    Animated.timing(this.ringTwoOpacity, { toValue: 1, duration: 1, useNativeDriver: true })
                ])
            ]),
        ]);

        this.ringAnimation.start(() => {
            this.ringRepeats++;
            this.animateRing(hideOnEnd);
        });
    }

    stopRing = () => {
        this.ringAnimation && this.ringAnimation.stop();
        this.opacityAnimation && this.opacityAnimation.stop();
        this.opacity.setValue(1);
        this.ringOneScale.setValue(0);
        this.ringTwoScale.setValue(0);
        this.ringOneOpacity.setValue(1);
        this.ringTwoOpacity.setValue(1);
    };

    render() {
        const color = this.props.color || this.props.theme.colors.tutorialTouchIconColor;
        const size = 50;

        const translateX = this.props.x || 0;
        const translateY = this.props.y || 0;

        return (
            <Animated.View style={[this.style.container, { opacity: this.opacity, transform: [{ translateX }, { translateY }] }]}>
                <TouchableOpacity onPress={() => this.props.onPress && this.props.onPress()}>
                    <MaterialIcons color={color} size={size} name="touch-app" />
                    <Animated.View style={[this.style.ring, { borderColor: color, opacity: this.ringOneOpacity, transform: [{ scale: this.ringOneScale }] }]}></Animated.View>
                    <Animated.View style={[this.style.ring, { borderColor: color, opacity: this.ringTwoOpacity, transform: [{ scale: this.ringTwoScale }] }]}></Animated.View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(TutorialTouchIcon);
