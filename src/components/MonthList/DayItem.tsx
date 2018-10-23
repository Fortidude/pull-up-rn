import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, TouchableOpacity } from 'react-native';

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import moment = require('moment');
import DayItemText from './DayItemText';
import Set from 'src/models/Set';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    setsHistory: { [key: string]: Set[] };

    day: moment.Moment;
    currentMonth: moment.Moment;

    onDayOpen: any;
};

interface State {
    positionX: number;
    positionY: number;
    text: string;
}

class DayItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    opacity = new Animated.Value(0);

    modalScale = new Animated.Value(0);
    amountOfSets = 0;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            positionX: 0,
            positionY: 0,
            text: props.day.format('D')
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    countSets = (): number => {
        const date = this.props.day.format('D-M-Y');
        if (this.props.setsHistory[date]) {
            return this.props.setsHistory[date].length;
        }

        return 0;
    }

    render() {
        this.amountOfSets = this.countSets();

        return (
            <React.Fragment>
                <TouchableOpacity onPress={this._onClickDay} ref="dayContainer" onLayout={this._onLayout}>
                    <DayItemText
                        numberOfSets={this.amountOfSets}
                        day={this.props.day}
                        currentMonth={this.props.currentMonth}
                        opacity={this.opacity} />
                </TouchableOpacity>
            </React.Fragment>
        );
    }

    runAnimation = async () => {
        Animated.timing(this.opacity, {
            toValue: 1,
            delay: parseInt(this.props.day.format('D')) * 30,
            duration: 400,
            useNativeDriver: true
        }).start();
    }

    _onClickDay = () => {
        if (this.amountOfSets > 0) {
            this.props.onDayOpen(this.props.day, this.state.positionX, this.state.positionY);
        }
    }

    _onLayout = () => {
        //@ts-ignore
        this.refs.dayContainer.measure((x, y, width, height, windowX, windowY) => {
            this.setState({ positionX: x, positionY: windowY }, () => {
                this.runAnimation();
            });
        })
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    setsHistory: state.planner.setsHistory
});

export default connect(mapStateToProps)(DayItem);
