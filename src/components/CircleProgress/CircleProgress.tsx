import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';

//@ts-ignore
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Styles from './CircleProgress.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

interface Props {
    appLoaded: boolean;
    dispatch: Dispatch;
    theme: ThemeInterface,

    progressWidth?: number;
    rotation?: number;
    tintColor?: string | null;
    onAnimationComplete?: () => void;
    title?: string;
    subTitle?: string;
    showBigTitle?: boolean;
    size?: Animated.Value | number;
    noShadow?: boolean;
    backgroundColor?: string;

    fill: number;
}

class CircleProgress extends React.Component<Props> {
    style: ThemeValueInterface;
    fill: number = 0;

    static defaultProps = {
        progressWidth: 2,
        rotation: 0,
        tintColor: null,
        fill: 0,
        size: 80,
        showBigTitle: false,
        onAnimationComplete: () => { }
    }

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        this.state = {
            fill: 0
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    getFill = () => this.props.appLoaded ? this.props.fill : 0;
    getTitle = (fill: number) => this.props.title || `${Math.round(fill)}%`;
    getSubTitle = () => (this.props.subTitle || '').toLocaleUpperCase();

    setFill = (fill: number) => {
        this.fill = fill
    };

    render() {
        let extraStyle = { };
        if (!this.props.noShadow) {
            extraStyle = { ...extraStyle, ...this.style.circleShadow };
        }

        if (this.props.size) {
            extraStyle = { ...extraStyle, width: this.props.size, height: this.props.size }
        }

        if (this.props.backgroundColor) {
            extraStyle = { ...extraStyle, backgroundColor: this.props.backgroundColor }
        }

        return (
            <View style={[this.style.circle, extraStyle]}>
                <AnimatedCircularProgress
                    size={this.props.size}
                    lineCap="round"
                    fill={this.getFill()}
                    duration={this.props.fill * 20}
                    style={this.style.progressBar}
                    width={this.props.progressWidth}
                    rotation={this.props.rotation}
                    tintColor={this.props.tintColor || this.props.theme.colors.main}
                    onAnimationComplete={this.props.onAnimationComplete}
                    backgroundColor="transparent">
                    {(fill: number) => (
                        <React.Fragment>
                            <Text adjustsFontSizeToFit={true} style={[this.style.title, this.props.showBigTitle ? this.style.bigTitle : {}]}>
                                {this.getTitle(fill)}
                            </Text>
                            {this.props.subTitle &&
                                <Text style={this.style.subTitle}>
                                    {this.getSubTitle()}
                                </Text>
                            }
                        </React.Fragment>
                    )}
                </AnimatedCircularProgress>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    appLoaded: state.app.loaded,
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(CircleProgress);
