import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Dimensions, Text, View } from 'react-native';
import moment from 'moment'

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import ModalFooter from '../ModalManager/ModalFooter/ModalFooter';
import ModalHeader from '../ModalManager/ModalHeader/ModalHeader';
import { HEADER_HEIGHT } from '../Header/Header.styles';
import { FOOTER_HEIGHT } from '../FooterBar/FooterBar.styles';

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

class DayModalItem extends React.Component<Props, State> {
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

        const text = `${this.props.day.format('D')} ${this.props.day.format('MMMM')} ${this.props.day.format('YYYY')}`;

        return (
            <Animated.View style={[this.style.dayModalItem, this._getAnimateStyles()]} ref="DayModal">
                <ModalHeader text={text} />
                <View style={{ flex: 1 }}>

                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }} loading={false} successText={'Zamknij'} onSuccess={this.props.onClose} />
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

export default connect(mapStateToProps)(DayModalItem);
