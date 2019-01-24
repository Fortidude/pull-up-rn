import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity } from 'react-native';
import moment from 'moment';

import getStyle from './Day.styles';
import DayText from './DayText';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import Set from 'src/models/Set';
import { Exercise } from 'src/models/Exercise';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    setsHistory: { [key: string]: Set[] };

    day: moment.Moment;
    currentMonth: moment.Moment;

    onDayClick: (...arg: any) => void;

    exerciseToFilter: Exercise | null;
};

interface State {
    positionX: number;
    positionY: number;
    text: string;
}

class Day extends React.Component<Props, State> {
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
     //   console.log(date, !!this.props.setsHistory[date]);
        if (this.props.setsHistory[date]) {
            if (this.props.exerciseToFilter !== null) {
                let amount = 0;
                this.props.setsHistory[date].forEach((set: Set) => {
                    if (this.props.exerciseToFilter && set.goal.exercise.id === this.props.exerciseToFilter.id) {
                        amount++;
                    }
                })

                return amount;
            } else {
                return this.props.setsHistory[date].length;
            }
        }

        return 0;
    }

    onDayClick = () => {
        if (this.amountOfSets > 0) {
            this.props.onDayClick(this.props.day, this.state.positionX, this.state.positionY);
        }
    }

    render() {
        this.amountOfSets = this.countSets();

        return (
            <TouchableOpacity onPress={this.onDayClick} ref="dayContainer" onLayout={this._onLayout}>
                <DayText
                    numberOfSets={this.amountOfSets}
                    day={this.props.day}
                    currentMonth={this.props.currentMonth}
                    opacity={this.opacity} />
            </TouchableOpacity>
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
    setsHistory: state.planner.setsHistory,
    exerciseToFilter: state.exercise.exercisesToFilter
});

export default connect(mapStateToProps)(Day);
