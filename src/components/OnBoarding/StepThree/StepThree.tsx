import React from 'react';
import { Dispatch } from 'redux';
import { Dimensions, Text, Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Styles from './StepThree.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import I18n from 'src/assets/translations';
import BottomSections from '../Components/BottomSections';

const { width, height } = Dimensions.get('window');
const MAX_POSITION_X = width * 0.10;
interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    currentStep: number;
    finish: () => void;
    viewRef: any;
}

interface State {
}

class StepThree extends React.Component<Props, State> {
    style: ThemeValueInterface;
    positionX = new Animated.Value(MAX_POSITION_X);
    alertScale = new Animated.Value(1);

    dotVisible = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {}
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.props.currentStep !== nextProps.currentStep;
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

    render() {
        const opacity = this.positionX.interpolate({
            inputRange: [-40, 0, 40],
            outputRange: [0, 1, 0]
        });

        const scale = this.positionX.interpolate({
            inputRange: [-MAX_POSITION_X, -MAX_POSITION_X + 1, 0, MAX_POSITION_X - 1, MAX_POSITION_X],
            outputRange: [0, 1, 1, 1, 0]
        });

        return (
            <Animated.View style={[this.style.container, { opacity: opacity, transform: [{ scale }, { translateX: this.positionX }] }]}>
                <View style={this.style.textContainer}>
                    <Text style={this.style.text}>{I18n.t('boarding.step_last.get_started')}</Text>
                </View>
                <BottomSections finish={this.props.finish} />
            </Animated.View>
        );
    }

    _progressAnimate = (props: Props) => {
        if (props.currentStep === 4) {
            Animated.parallel([
                Animated.timing(this.positionX, { toValue: 0, delay: 500, useNativeDriver: true }),
            ]).start();
        }

        if (props.currentStep > 4) {
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

export default connect(mapStateToProps)(StepThree);
