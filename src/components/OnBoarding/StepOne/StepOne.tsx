import React from 'react';
import { Dispatch } from 'redux';
import { Dimensions, Text, Animated, View, MaskedViewIOS, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'react-native-blur';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import I18n from 'src/assets/translations';
import Styles from './StepOne.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import BottomSections from '../Components/BottomSections';
import images from 'src/assets/images';
import { ModalActions } from 'src/store/actions/modal';
import TutorialTouchIcon from 'src/components/TutorialTouchIcon/TutorialTouchIcon';

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
    iconPositions: number[]
    flashAngle: number;
}

class StepOne extends React.Component<Props, State> {
    style: ThemeValueInterface;
    positionX = new Animated.Value(MAX_POSITION_X);

    logoInterval: number | null;
    logoFlashOnePosition = new Animated.Value(0);
    logoFlashTwoPosition = new Animated.Value(0);
    logoScale = new Animated.Value(1);
    logoOverlayScale = new Animated.Value(1);

    moreInfoVisible = new Animated.Value(0);
    moreInfoIconsTextVisible = new Animated.Value(0);

    nextStepButtonVisible = new Animated.Value(0);

    iconRefs: any[] = [];
    tutorialTouchIcon: any;

    unmounted = false;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            iconPositions: [0, 0, 0, 0, 0, 0],
            flashAngle: (Math.random() * 60) + 1
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.props.currentStep !== nextProps.currentStep
            || JSON.stringify(this.state.iconPositions) !== JSON.stringify(nextState.iconPositions)
            || this.state.flashAngle !== nextState.flashAngle
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        this._progressAnimate(nextProps);
    }

    componentDidMount() {
        this._progressAnimate(this.props, true);
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    onClickIcon = (text: string) => {
        this.props.dispatch(ModalActions.informationOpen(I18n.t('mics.tutorial'), text));
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

        const textOpacity = this.moreInfoVisible.interpolate({ inputRange: [0, 0.1], outputRange: [1, 0] });

        const onClickLineFirst = () => this.onClickIcon(I18n.t('boarding.step_one.line_one.description'));
        const onClickLineTwo = () => this.onClickIcon(I18n.t('boarding.step_one.line_two.description'));
        const onClickLineThree = () => this.onClickIcon(I18n.t('boarding.step_one.line_three.description'));
        const onClickLineFour = () => this.onClickIcon(I18n.t('boarding.step_one.line_four.description'));
        const onClickLineFive = () => this.onClickIcon(I18n.t('boarding.step_one.line_five.description'));
        const onClickLineSix = () => this.onClickIcon(I18n.t('boarding.step_one.line_six.description'));

        return (
            <Animated.View style={[this.style.container, { opacity: opacity, transform: [{ scale }, { translateX: this.positionX }] }]}>
                {/* <BlurView
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, borderRadius: 15 }}
                    viewRef={this.props.viewRef}
                    blurType="dark"
                    blurAmount={1}
                /> */}

                <View style={this.style.content}>
                    <Text style={this.style.title}> PULL & PUSH</Text>

                    <View style={this.style.icons}>
                        <Animated.View style={this._getIconTransform([0, 0], [0, -45])}>
                            <TouchableOpacity onPress={onClickLineFirst} ref={(ref: any) => this.iconRefs[0] = ref}>
                                <SimpleLineIcon color={this.props.theme.colors.softOrange} size={20} name="book-open" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineFirst} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0, 0.30) }]}>{I18n.t('boarding.step_one.line_one.title')}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={this._getIconTransform([0, this.state.iconPositions[1]], [0, -5])}>
                            <TouchableOpacity onPress={onClickLineTwo} ref={(ref: any) => this.iconRefs[1] = ref}>
                                <SimpleLineIcon color={this.props.theme.colors.softGreen} size={20} name="list" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineTwo} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0.10, 0.40) }]}>{I18n.t('boarding.step_one.line_two.title')}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={this._getIconTransform([0, this.state.iconPositions[2]], [0, 35])}>
                            <TouchableOpacity onPress={onClickLineThree} ref={(ref: any) => this.iconRefs[2] = ref}>
                                <FontAwesome color={this.props.theme.colors.softBlue} size={20} name="stopwatch" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineThree} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0.20, 0.50) }]}>{I18n.t('boarding.step_one.line_three.title')}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={this._getIconTransform([0, this.state.iconPositions[3]], [0, 75])}>
                            <TouchableOpacity onPress={onClickLineFour} ref={(ref: any) => this.iconRefs[3] = ref}>
                                <SimpleLineIcon color={this.props.theme.colors.softYellow} size={20} name="trophy" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineFour} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0.30, 0.60) }]}>{I18n.t('boarding.step_one.line_four.title')}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={this._getIconTransform([0, this.state.iconPositions[4]], [0, 115])}>
                            <TouchableOpacity onPress={onClickLineFive} ref={(ref: any) => this.iconRefs[4] = ref}>
                                <SimpleLineIcon color={this.props.theme.colors.softPurple} size={20} name="pie-chart" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineFive} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0.40, 0.70) }]}>{I18n.t('boarding.step_one.line_five.title')}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={this._getIconTransform([0, this.state.iconPositions[5]], [0, 155])}>
                            <TouchableOpacity onPress={onClickLineSix} ref={(ref: any) => this.iconRefs[5] = ref}>
                                <SimpleLineIcon color={this.props.theme.colors.danger} size={20} name="clock" />
                            </TouchableOpacity>
                            <Animated.Text onPress={onClickLineSix} style={[this.style.textIcon, { opacity: this._getIconTextOpacity(0.40, 0.70) }]}>{I18n.t('boarding.step_one.line_six.title')}</Animated.Text>
                        </Animated.View>

                        <TutorialTouchIcon onRef={ref => this.tutorialTouchIcon = ref} x={150} y={-46}/>
                    </View>
                    <Animated.Text style={[this.style.text, { opacity: textOpacity }]}>Twój osobisty dziennik treningowy</Animated.Text>
                </View>

                {this.getLogoComponent()}
                <Animated.View style={{ width: '100%', opacity: this.nextStepButtonVisible }}>
                    <BottomSections goNext={this.goNext} />
                </Animated.View>
            </Animated.View>
        );
    }

    goNext = () => {
        //@ts-ignore
        if (this.moreInfoVisible._value === 0) {
            this._progressMoreInfoAnimate();
        }

        this.props.goNext();
    }

    getLogoComponent = () => {
        setTimeout(this._progressLogoAnimate, 3000);

        return (
            <MaskedViewIOS style={this.style.topLogo.container}
                maskElement={
                    <View style={this.style.topLogo.imageContainer}>
                        <Animated.Image ref="image" style={[this.style.topLogo.image, { transform: [{ scale: this.logoScale }] }]} source={images.logoLoaderBackground} />
                    </View>
                }
            >
                <Animated.View style={[this.style.topLogo.overlay, { transform: [{ scale: this.logoOverlayScale }] }]} />
                <Animated.View style={[this.style.topLogo.flashOverlay, { transform: [{ rotate: `${this.state.flashAngle}deg` }, { translateX: this.logoFlashOnePosition }] }]}></Animated.View>
                <Animated.View style={[this.style.topLogo.flashOverlay, { transform: [{ rotate: `${this.state.flashAngle}deg` }, { translateX: this.logoFlashTwoPosition }] }]}></Animated.View>
            </MaskedViewIOS>
        );
    }

    _animateNextButton = () => {
        Animated.timing(this.nextStepButtonVisible, {
            toValue: 1,
            useNativeDriver: true
        }).start(this._initIconsPositions);
    }

    _progressAnimate = (props: Props, onComponentMount = false) => {
        if (props.currentStep === 1 && onComponentMount) {
            Animated.timing(this.positionX, {
                toValue: 0,
                delay: 500,
                useNativeDriver: true
            }).start(this._animateNextButton);
        }

        if (props.currentStep > 2) {
            Animated.timing(this.positionX, {
                toValue: (-MAX_POSITION_X),
                useNativeDriver: true
            }).start();
        }
    }

    _progressLogoAnimate = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.logoFlashOnePosition, { toValue: -200, duration: 800 }),
                Animated.timing(this.logoFlashTwoPosition, { toValue: -200, duration: 800, delay: 100 })
            ]),
            Animated.timing(this.logoScale, { toValue: 1.05, duration: 100 }),
            Animated.timing(this.logoScale, { toValue: 0.98, duration: 100 }),
            Animated.timing(this.logoScale, { toValue: 1, duration: 100 }),
        ]).start(() => {
            this.logoFlashOnePosition.setValue(0);
            this.logoFlashTwoPosition.setValue(0);
            if (!this.unmounted) {
                this.setState({ flashAngle: (Math.random() * 60) + 1 });
            }
        });
    }

    _progressMoreInfoAnimate = () => {
        Animated.parallel([
            Animated.timing(this.moreInfoVisible, { toValue: 1, duration: 400 }),
            Animated.timing(this.moreInfoIconsTextVisible, { toValue: 1, delay: 300, duration: 2000 })
        ]).start(() => {
            this.tutorialTouchIcon.show();
            this.tutorialTouchIcon.animateRing(true);
        }); 
    }

    _getIconTransform = (x: [number, number], y: [number, number]) => {
        const translateX = this.moreInfoVisible.interpolate({
            inputRange: [0, 1],
            outputRange: x
        });

        const translateY = this.moreInfoVisible.interpolate({
            inputRange: [0, 1],
            outputRange: y
        });

        return { transform: [{ translateX }, { translateY }] };
    }

    _getIconTextOpacity = (valueFrom: number, valueTo: number) => {
        return this.moreInfoIconsTextVisible.interpolate({
            inputRange: [valueFrom, valueTo],
            outputRange: [0, 1]
        });
    }

    _initIconsPositions = () => {
        if (this.unmounted) { 
            return;
        }

        let firstIconPosition = 0;
        let iconPositions = this.state.iconPositions;
        this.iconRefs.forEach((ref, index) => {
            if (!ref) {
                return;
            }
            
            // @ts-ignore
            ref.measure((x, y, width, height, windowX, windowY) => {
                if (index === 0) {
                    firstIconPosition = windowX;
                    iconPositions[index] = 0;
                } else {
                    iconPositions[index] = firstIconPosition - windowX;
                }
            });
        })

        this.setState({ iconPositions: iconPositions });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(StepOne);
