import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Dimensions } from 'react-native';
import moment from 'moment'

import getStyle from './DayModal.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import Content from './Content';

import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height - HEADER_HEIGHT;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onClose: () => void;

    day: moment.Moment | null;
    openProgress: Animated.Value

    positionX: number;
    positionY: number;
};

interface State { }

class DayModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        if (!this.props.day) {
            return null;
        }

        return (
            <Animated.View style={[this.style.container, this._getAnimateStyles()]} ref="DayModal">
                <Content
                    onClose={this.props.onClose}
                    day={this.props.day}
                    openProgress={this.props.openProgress} />
            </Animated.View>
        );
    }

    _getAnimateStyles = () => {
        const { openProgress, positionX, positionY } = this.props;
        const translateInitX = positionX + (53 / 2);
        const translateInitY = positionY + (53 / 2) - HEADER_HEIGHT;
        const translateDestX = WIDTH / 2;
        const translateDestY = HEIGHT / 2;

        const openingInitTranslateX = translateInitX - translateDestX;
        const openingInitTranslateY = translateInitY - translateDestY;

        return {
            top: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
            opacity: openProgress.interpolate({
                inputRange: [.01, .10],
                outputRange: [0, 1]
            }),
            transform: [
                {
                    translateX: openProgress.interpolate({
                        inputRange: [0.01, .99],
                        outputRange: [openingInitTranslateX, 0]
                    })
                },
                {
                    translateY: openProgress.interpolate({
                        inputRange: [0.01, .99],
                        outputRange: [openingInitTranslateY, 0]
                    })
                },
                {
                    scaleX: openProgress.interpolate({
                        inputRange: [0.01, 0.99],
                        outputRange: [53 / WIDTH, 1]
                    })
                },
                {
                    scaleY: openProgress.interpolate({
                        inputRange: [0.01, 0.99],
                        outputRange: [53 / HEIGHT, 1]
                    })
                }
            ]
        }
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayModal);
