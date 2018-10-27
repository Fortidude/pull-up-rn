import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import getStyle from './../Stats.styles';
import CircleProgress from 'src/components/CircleProgress/CircleProgress';
import Select from 'src/components/Select/Select';
import { StatisticsInterface } from 'src/models/Statistics';
import { PlannerActions } from 'src/store/actions/planner';

import I18n from 'src/assets/translations';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    statistics: StatisticsInterface;
    statisticsLoaded: boolean;
};

interface Stats {
    circuit: "current" | "previous" | "all";
    sortBy: 'a-z' | 'percent'
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
    ]


    constructor(props: Props) {
        super(props);

        this.style = getStyle(this.props.theme);

        this.state = {
            circuit: 'current',
            sortBy: 'a-z'
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

    changeCircuit = (circuit: string) => {
        const indexOf = this.circuitsOptionsTranslated.indexOf(circuit);
        circuit = this.circuitsOptions[indexOf];

        if (!["current", "previous", "all"].includes(circuit)) {
            throw new Error(`INVALID CIRCUIT SELECTED. ${circuit}`);
        }

        //@ts-ignore
        this.setState({ circuit });
    }

    toggleSort = () => {
        if (this.state.sortBy === 'a-z') {
            this.setState({sortBy: 'percent'});
        } else {
            this.setState({sortBy: 'a-z'});
        }
    }

    render() {
        const selectTextStyles = [this.style.effectiveness.header.buttons.buttonText, this.style.effectiveness.header.buttons.buttonTextActive];
        const sortTextStylesAZ = [this.style.effectiveness.header.buttons.buttonText];
        const sortTextStylesPercent = [this.style.effectiveness.header.buttons.buttonText];

        if (this.state.sortBy === 'a-z') {
            sortTextStylesAZ.push(this.style.effectiveness.header.buttons.buttonTextActive);
            sortTextStylesAZ.push({fontWeight: '500'});
        } else {
            sortTextStylesPercent.push(this.style.effectiveness.header.buttons.buttonTextActive);
            sortTextStylesPercent.push({fontWeight: '500'});
        }

        return (
            <View style={this.style.container}>
                <View style={this.style.effectiveness.header.container}>
                    <View style={this.style.effectiveness.header.right}>
                        <Text style={this.style.effectiveness.header.title}>{I18n.t('statistics.effectiveness.title')}</Text>
                        <View style={this.style.effectiveness.header.buttons.container}>
                            <View style={[this.style.effectiveness.header.buttons.buttonContainer, { marginRight: 7.5 }]}>
                                <Text style={this.style.effectiveness.header.buttons.buttonLabel}>{I18n.t('statistics.circuit')}</Text>
                                {/* <TouchableOpacity style={[this.style.effectiveness.header.buttons.button]}>
                                    <Text style={this.style.effectiveness.header.buttons.buttonText}>Wszystkie</Text>
                                    
                                </TouchableOpacity> */}
                                <Select small
                                    autoSize
                                    value={I18n.t(`planner.circuits.${this.state.circuit}`)}
                                    onChange={(value) => this.changeCircuit(value)} options={this.circuitsOptionsTranslated}
                                    textStyle={selectTextStyles}
                                    containerStyle={this.style.effectiveness.header.buttons.button}
                                />
                            </View>

                            <View style={[this.style.effectiveness.header.buttons.buttonContainer, { marginLeft: 7.5 }]}>
                                <Text style={this.style.effectiveness.header.buttons.buttonLabel}>{I18n.t('statistics.sort')}</Text>
                                <TouchableOpacity
                                    onPress={this.toggleSort}
                                    style={[this.style.effectiveness.header.buttons.button]}>
                                    <Text style={sortTextStylesAZ}>A-Z</Text>
                                    <Text style={[this.style.effectiveness.header.buttons.buttonText, {marginHorizontal: 3}]}>/</Text>
                                    <Text style={sortTextStylesPercent}>%</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={this.style.effectiveness.header.left}>
                        <CircleProgress fill={this._getPercentBySelectedCircuit()} />
                    </View>
                </View>
            </View>
        );
    }

    _getPercentBySelectedCircuit = (): number => {
        switch (this.state.circuit) {
            case 'all':
                return this.props.statistics.percent_goals_achieved;
            case 'previous':
                return this.props.statistics.last_circle_percent_goals_achieved;
            case 'current':
                return this.props.statistics.current_circle_percent_goals_achieved;
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
