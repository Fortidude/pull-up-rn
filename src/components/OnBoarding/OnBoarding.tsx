import React from 'react';
import { Dispatch } from 'redux';
import { View, ImageBackground, StyleSheet, findNodeHandle, StatusBar, MaskedViewIOS, Animated, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './OnBoarding.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import images from 'src/assets/images';


import { BlurView } from 'react-native-blur';

import Events from 'src/service/Events';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import { ModalActions } from 'src/store/actions/modal';
import { UserActions } from 'src/store/actions/user';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

interface State {
    imageRefNumber: null | number;
    currentStep: number;
    currentDot: number;
    currentImage: number;
}

class OnBoarding extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            imageRefNumber: null,
            currentStep: 1,
            currentDot: 1,
            currentImage: 1
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidMount() {
        Events.emit('FOOTER_BAR_DISABLE');
    }

    imageLoaded = () => {
        // @ts-ignore
        this.setState({ imageRefNumber: findNodeHandle(this.refs.backgroundImage) });
    }

    goNext = () => {
        this.setState({ currentStep: this.state.currentStep + 1, currentDot: 0 }, () => {
            setTimeout(() => {
                this.setState({ currentDot: this.state.currentStep, currentImage: this.state.currentStep });
            }, 600);
        });
    }

    render() {
        const { currentStep } = this.state;
        return (
            <View style={[this.style.container, StyleSheet.absoluteFill]}>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={this.getImage()}
                    ref="backgroundImage"
                    onLoadEnd={this.imageLoaded}
                    resizeMode={'cover'}
                    style={this.style.backgroundImage}>
                    <BlurView
                        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
                        viewRef={this.state.imageRefNumber}
                        blurType="dark"
                        blurAmount={5}
                    />

                    <StepOne
                        currentStep={currentStep}
                        viewRef={this.state.imageRefNumber}
                        goNext={this.goNext}
                    />
                    <StepTwo
                        currentStep={currentStep}
                        viewRef={this.state.imageRefNumber}
                        goNext={this.goNext}
                    />
                    <StepThree
                        currentStep={currentStep}
                        viewRef={this.state.imageRefNumber}
                        finish={this.close}
                    />

                    {this.getPaginator()}
                </ImageBackground>
            </View>
        );
    }

    getImage = () => {
        const { currentImage } = this.state;

        if (currentImage === 1 || currentImage === 2) {
            return images.onboarding.adult;
        }

        if (currentImage === 3) {
            return images.onboarding.notes;
        }

        if (currentImage === 4) {
            return images.onboarding.woman;
        }

        return images.onboarding.woman;
    }

    close = () => {
        this.props.dispatch(ModalActions.informationOpen('Ekran powitalny', 'Zawsze możesz wrócić tutaj w swoim profilu.'));
        this.props.dispatch(UserActions.endOnBoarding());
        Events.emit('FOOTER_BAR_ENABLE');
    }

    getPaginator = () => {
        const paginatorStyle = this.style.paginator;
        const { currentDot } = this.state;

        return (
            <View style={paginatorStyle.container}>
                <View style={[paginatorStyle.dot, currentDot === 1 && paginatorStyle.dotActive]}></View>
                <View style={[paginatorStyle.dot, currentDot === 2 && paginatorStyle.dotActive]}></View>
                <View style={[paginatorStyle.dot, currentDot === 3 && paginatorStyle.dotActive]}></View>
                <View style={[paginatorStyle.dot, currentDot === 4 && paginatorStyle.dotActive]}></View>

                {this.state.currentDot !== 4 && <TouchableOpacity style={paginatorStyle.skipButton} onPress={this.close}>
                    <Text style={paginatorStyle.skipButtonText}>SKIP</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(OnBoarding);
