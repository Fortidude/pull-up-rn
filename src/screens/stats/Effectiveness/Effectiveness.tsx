import React, { Component } from 'react';
import { FlatList, View, ScrollView } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import getStyle from './../Stats.styles';
import { StatisticsInterface, StatisticGoalInterface } from 'src/models/Statistics';
import { PlannerActions } from 'src/store/actions/planner';
import Header from './Header/Header';

import I18n from 'src/assets/translations';
import ListItem from './ListItem/ListItem';
import Spinner from 'src/components/Spinner/Spinner';

export type CircuitType = 'current' | 'previous' | 'all';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    statistics: StatisticsInterface;
    statisticsLoaded: boolean;
};

interface Stats {
    circuit: CircuitType;
    sortBy: 'a-z' | 'percent';
}

class Effectiveness extends Component<Props, Stats> {
    style: ThemeValueInterface;
    circuitsOptionsTranslated = [
        I18n.t(`planner.circuits.current`),
        I18n.t(`planner.circuits.previous`),
        I18n.t(`planner.circuits.all`)
    ];
    circuitsOptions = [
        'current',
        'previous',
        'all'
    ];

    constructor(props: Props) {
        super(props);

        this.style = getStyle(this.props.theme);
        this.state = {
            circuit: 'current',
            sortBy: 'percent'
        }
    }

    componentWillMount() {
        this.props.dispatch(PlannerActions.loadGoalStatistics());
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    changeCircuit = (circuit: CircuitType) => this.setState({ circuit });
    toggleSort = () => {
        if (this.state.sortBy === 'a-z') {
            this.setState({ sortBy: 'percent' });
        } else {
            this.setState({ sortBy: 'a-z' });
        }
    }

    getFlatListData = () => {
        switch (this.state.circuit) {
            case 'all':
                return this.props.statistics.percentage_goals_achieved.goals;
            case 'current':
                return this.props.statistics.current_circle_percentage_goals_achieved.goals;
            case 'previous':
                return this.props.statistics.last_circle_percentage_goals_achieved.goals;
        }
    }

    render() {
        if (!this.props.statistics) {
            return (
                <View style={this.style.container}>
                    <View style={this.style.loadingContainer}>
                        <Spinner large />
                    </View>
                </View>
            )
        }

        const goals = this.getFlatListData();
        goals.sort(this.state.sortBy === 'a-z' ? this._sortByName : this._sortByPercent);

        return (
            <View style={this.style.container}>
                <Header
                    sortBy={this.state.sortBy}
                    circuit={this.state.circuit}
                    toggleSort={this.toggleSort}
                    changeCircuit={this.changeCircuit}
                    circuitsOptions={this.circuitsOptions}
                    circuitsOptionsTranslated={this.circuitsOptionsTranslated}
                />

                <ScrollView>
                    {goals.map((goal: StatisticGoalInterface, index: number) => <ListItem key={index} goal={goal} />)}
                </ScrollView>
            </View>
        );
    }

    _sortByPercent = (goalA: StatisticGoalInterface, goalB: StatisticGoalInterface) => {
        return goalB.percentage - goalA.percentage;
    }

    _sortByName = (goalA: StatisticGoalInterface, goalB: StatisticGoalInterface) => {
        if (goalA.name < goalB.name) {
            return -1;
        } else if (goalA.name > goalB.name) {
            return 1;
        }

        return 0;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    statistics: state.planner.statistics,
    statisticsLoaded: state.planner.statisticsLoaded
});

export default connect(mapStateToProps)(Effectiveness);
