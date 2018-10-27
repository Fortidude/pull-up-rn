import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, View, ScrollView } from 'react-native';
import moment from 'moment'

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import GoalItem from '../GoalItem';
import ModalFooter from 'src/components/ModalManager/ModalFooter/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

import Set from 'src/models/Set';
import Goal from 'src/models/Goal';

import getStyle from './Content.styles';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    setsHistory: { [key: string]: Set[] };

    onClose: () => void;

    day: moment.Moment;
    openProgress: Animated.Value;
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
        const text = `${this.props.day.format('D')} ${this.props.day.format('MMMM')} ${this.props.day.format('YYYY')}`;
        const sets = this.props.setsHistory[this.props.day.format('D-M-Y')] || [];
        const goals = this.getGoalList(sets);

        return (
            <React.Fragment>
                <ModalHeader text={text} />
                <View style={this.style.content}>
                    <View style={[this.style.infoLine.container]}>
                        <Text style={this.style.infoLine.label}>Ilość ćwiczeń</Text>
                        <Text style={this.style.infoLine.value}>{goals.length}</Text>
                    </View>
                    <View style={this.style.infoLine.container}>
                        <Text style={this.style.infoLine.label}>Ilość setów</Text>
                        <Text style={this.style.infoLine.value}>{sets.length}</Text>
                    </View>

                    <ScrollView style={this.style.goalsContainer} showsVerticalScrollIndicator={false}>
                        {goals.map((goal: Goal, key) => {
                            return <GoalItem key={key} goal={goal} />
                        })}
                    </ScrollView>
                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }} loading={false} successText={'Zamknij'} onSuccess={this.props.onClose} />
            </React.Fragment>
        );
    }

    getGoalList = (sets: Set[]): Goal[] => {
        const goals: { [key: string]: Goal } = {};
        sets.forEach((set: Set) => {
            const nonRefSet = Object.assign({}, set);
            if (!goals[nonRefSet.goal.id]) {
                nonRefSet.goal.sets = [];
                goals[nonRefSet.goal.id] = Object.assign(nonRefSet.goal);
            }

            goals[nonRefSet.goal.id].sets.push(nonRefSet);
            //@ts-ignore
            nonRefSet.goal = undefined;
        })

        return Object.values(goals);
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    setsHistory: Object.assign({}, state.planner.setsHistory)
});

export default connect(mapStateToProps)(DayModalItem);