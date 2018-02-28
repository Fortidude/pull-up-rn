import React from 'react'
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, RefreshControl } from 'react-native';
import { Content, Text, ActionSheet } from 'native-base';

import { Pie, SmoothLine, StockLine } from 'react-native-pathjs-charts'

import Style, {borderRadiusIfApple} from '../../../Styles/style';
import Color from '../../../Styles/color';
import Spinner from "../../../Components/Spinner";
import SimpleChooseModal from "../../../Components/SimpleChoose.modal";
import I18n from "../../../Translations/translations";

export default class progress extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        isToggled: PropTypes.bool.isRequired,

        changeRightHeader: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,

            circuit: null,

            goal_statistics_options: [],
            goal_statistics_modal: false,
            goal_statistics_selected: null,
        };
        
        setTimeout(() => {
            this.mapStoreToState(this.props, this.state.circuit);
        });

        this.whenToggled(this.props.isToggled);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.store.planner.statistics !== this.props.store.planner.statistics) {
            this.mapStoreToState(nextProps);
        }

        if (nextProps.isToggled !== this.props.isToggled) {
            this.whenToggled(nextProps.isToggled);
        }
    }

    whenToggled(isToggled) {
        if (isToggled) {
            this.props.changeRightHeader("Progresja");
        }
    }

    mapStoreToState(props, circuitMode = false) {
        if (!props.store.planner.statistics) {
            return;
        }

        let percentageGoals = [];
        let percentGoals = [];
        if (circuitMode === 'current') {
            percentageGoals = props.store.planner.statistics.current_circle_percentage_goals_achieved;
            percentGoals = props.store.planner.statistics.current_circle_percent_goals_achieved;
        } else if (circuitMode === 'previous') {
            percentageGoals = props.store.planner.statistics.last_circle_percentage_goals_achieved;
            percentGoals = props.store.planner.statistics.last_circle_percent_goals_achieved;
        } else {
            percentageGoals = props.store.planner.statistics.percentage_goals_achieved;
            percentGoals = props.store.planner.statistics.percent_goals_achieved;
        }

        let goalStatisticsOptions = [];
        if (props.store.planner.statistics.achieved_per_circuit) {
            Object.keys(props.store.planner.statistics.achieved_per_circuit).forEach(key => {
                goalStatisticsOptions.push(props.store.planner.statistics.achieved_per_circuit[key]['name']);
            });
        }

        this.setState({
            achieved_per_circuit: props.store.planner.statistics.achieved_per_circuit,
            percentage_goals_achieved: percentageGoals,
            percent_goals_achieved: percentGoals,
            circuit: circuitMode ? circuitMode : 'all',
            goal_statistics_options: goalStatisticsOptions,
            goal_statistics_selected: typeof goalStatisticsOptions[0] !== 'undefined' ? goalStatisticsOptions[0] : null
        })
    }

    SmoothLineChartBasic() {
        let data = [];
        let tickValues = [];

        if (!this.state.achieved_per_circuit) {
            return [];
        }

        let perGoal = [];
        Object.keys(this.state.achieved_per_circuit).forEach(key => {
            if (this.state.achieved_per_circuit[key]['name'] !== this.state.goal_statistics_selected) {
                return;
            }
            perGoal = [];
            this.state.achieved_per_circuit[key]['data'].forEach((y, x) => {
                perGoal.push({x: x+1, y: y});
                tickValues.push({value: (x+1).toString()});
            });

            if (perGoal.length >= 2) {
                data.push(perGoal);
            }
        });

        let width = Style.widthValue-80;
        if (data[0] && data[0].length > 8) {
            width = Style.widthValue * (data[0].length / 10);
        }

        if (!data[0] || data[0].length < 2) {
            let currentCircuitTime = this.props.store.auth.user.days_per_circuit;
            return <View style={[Style.card.container, Style.card.cardItem.container, {paddingLeft: 40, paddingRight: 40, minHeight: Style.widthValue}]}>
                <Text style={Style.card.cardItem.text}>{ this.state.goal_statistics_selected } - Za mało potrzebnych danych.</Text>
                <Text style={Style.card.cardItem.text_note}>Potrzebne są przynajmniej dwa pełne obiegi.</Text>
                <Text style={Style.card.cardItem.text_note}>Liczba dni na obieg: <Text style={{fontWeight: '500'}}>{ currentCircuitTime }</Text>. Możesz to zmienić w ustawieniach swojego konta.</Text>
            </View>
        }

        let options = {
            width: width,
            height: Style.widthValue - 100,
            color: '#2980B9',
            margin: {
                top: 20,
                left: 45,
                bottom: 25,
                right: 20
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: tickValues,
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        };

        return (
            <ScrollView horizontal={true} style={[Style.card.container, Style.card.cardItem.container]}>
                <StockLine data={data} options={options} xKey='x' yKey='y' />
            </ScrollView>
        )
    }

    changeGoalStatistics(index) {
        setTimeout(() => {
            this.setState({goal_statistics_selected: this.state.goal_statistics_options[index]});
        }, 500);
    }

    render() {
        return (
            <View style={this.props.isToggled ? {} : {position: 'absolute', width: 0, height: 0, zIndex: -2, overflow: 'hidden'}}>
                {this.state.percentage_goals_achieved && this.state.percentage_goals_achieved.total_circuits && <View style={[Style.card.container, Style.card.cardItem.container, Style.card.cardItem.container]}>
                    <Text style={[Style.card.text_header_sub, {fontSize: 13}]}>Wykonane powtórzenia (lub minuty) w poszczególnych obiegach.</Text>
                    <Text style={[Style.card.text_header_sub, {fontSize: 13}]}>Niektóre ćwiczenia mogą posiadać mniej obiegów, ze względu na czas utworzenia.</Text>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginRight: 40}}>
                        <Text style={[Style.card.text_header_sub, {fontSize: 13, textAlign: 'left', flex: 1}]}>
                            Łącznie celów: <Text style={Style.card.cardItem.text}>{ this.state.goal_statistics_options.length }</Text>
                        </Text>
                        <Text style={[Style.card.text_header_sub, {fontSize: 13, textAlign: 'right', flex: 1}]}>
                            Łącznie obiegów: <Text style={Style.card.cardItem.text}>{ this.state.percentage_goals_achieved.total_circuits }</Text>
                        </Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginRight: 40, marginBottom: 10}}>
                        <TouchableOpacity style={{borderRadius: borderRadiusIfApple(15), height: 30, marginRight: 10, borderColor: Color.blue.color, borderWidth: StyleSheet.hairlineWidth, flex: 1, justifyContent: 'center'}}
                                          onPress={() => this.setState({goal_statistics_modal: true})}>
                            <Text style={[Style.card.cardItem.text_blue, {textAlign: 'center'}]}>{ this.state.goal_statistics_selected ? this.state.goal_statistics_selected : 'Wybierz' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

                { this.SmoothLineChartBasic() }

                <SimpleChooseModal isVisible={this.state.goal_statistics_modal}
                                   collection={this.state.goal_statistics_options}
                                   onDismiss={() => this.setState({goal_statistics_modal: false})}
                                   onChose={this.changeGoalStatistics.bind(this)}/>
            </View>
        );
    }
}