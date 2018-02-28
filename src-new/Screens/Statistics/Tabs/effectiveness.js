import React from 'react'
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import { Content, Text, ActionSheet } from 'native-base';

import Style, {borderRadiusIfApple} from '../../../Styles/style';
import Color from '../../../Styles/color';
import SimpleChooseModal from "../../../Components/SimpleChoose.modal";
import I18n from "../../../Translations/translations";

export default class effectiveness extends React.Component {
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
            percentage_goals_achieved_order: '%',

            circuit_mode_options: [I18n.t('planner.circuits.current'), I18n.t('planner.circuits.previous'), I18n.t('planner.circuits.all')],
            circuit_select_modal: false,
        };
        
        setTimeout(() => {
            this.mapStoreToState(this.props, this.state.circuit);
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.store.planner.statistics !== this.props.store.planner.statistics) {
            this.mapStoreToState(nextProps);
        } else if (nextProps.isToggled !== this.props.isToggled) {
            this.whenToggled(nextProps);
        }
    }

    whenToggled(isToggled) {
        if (isToggled) {
            let effectiv = this.state.percent_goals_achieved ? this.state.percent_goals_achieved : '0';
            this.props.changeRightHeader("Skuteczność: " + effectiv + "%");
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

        this.setState({
            percentage_goals_achieved: percentageGoals,
            percent_goals_achieved: percentGoals,
            circuit: circuitMode ? circuitMode : 'all',
        }, () => {
            this.whenToggled(props);
        })
    }

    _getGoalsPercentage() {
        if (!this.state.percentage_goals_achieved) {
            return null;
        }

        let goals = this.state.percentage_goals_achieved.goals;
        let sort = this.state.percentage_goals_achieved_order;
        let data = [];

        goals.sort((first, second) => {
            if (sort === 'az') {
                if(first.name < second.name) return -1;
                if(first.name > second.name) return 1;
            }

            if (sort === '%') {
                return second.percentage - first.percentage;
            }

            return 0;
        });

        goals.forEach((goal, key) => {

            let width = Style.widthValue * (goal.percentage / 100);
            width = width > 0 ? width : 1;

            let variantName = goal.variant_name ? '(' + goal.variant_name + ')' : null;
            data.push(<View key={key} style={{width: Style.widthValue, height: 30, marginTop: 2, marginBottom: 2, justifyContent: 'center'}}>
                <Text style={[Style.card.cardItem.text, {lineHeight: 30, marginLeft: 20, zIndex: 3}]}>{ goal.name } <Text style={Style.card.cardItem.text_note}>{ variantName } (<Text style={Style.card.cardItem.text_blue}>{ goal.percentage }%</Text>)</Text></Text>
                <View style={{width: width, height: 30, top: 0, position: 'absolute', backgroundColor: Color.tealBlue.color02, zIndex: 2}}></View>
            </View>)
        })

        return data;
    }

    changePercentageOrder() {
        let order = this.state.percentage_goals_achieved_order === 'az' ? '%' : 'az';

        LayoutAnimation.spring();
        this.setState({percentage_goals_achieved_order: order});
    }

    changeCircuitStatistics(index) {
        let circuits = ['current', 'previous', 'all'];

        LayoutAnimation.spring();
        this.mapStoreToState(this.props, circuits[index]);
    }

    render() {
        let percentageGoals = this._getGoalsPercentage();

        return (
            <View style={this.props.isToggled ? {} : {position: 'absolute', width: 0, height: 0, zIndex: -2, overflow: 'hidden'}}>
                {this.state.percentage_goals_achieved && this.state.percentage_goals_achieved.goals && <View style={[Style.card.container, Style.card.cardItem.container, Style.card.cardItem.border_bottom]}>
                    <Text style={[Style.card.text_header_sub, {fontSize: 13}]}>Sprawdź jak często udaje Ci się wykonywać dany cel</Text>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginRight: 40}}>
                        <Text style={[Style.card.text_header_sub, {fontSize: 13, textAlign: 'left', flex: 1}]}>
                            Łącznie celów: <Text style={Style.card.cardItem.text}>{ this.state.percentage_goals_achieved.total_goals }</Text>
                        </Text>
                        <Text style={[Style.card.text_header_sub, {fontSize: 13, textAlign: 'right', flex: 1}]}>
                            Łącznie obiegów: <Text style={Style.card.cardItem.text}>{ this.state.percentage_goals_achieved.total_circuits }</Text>
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginRight: 40, marginBottom: 10}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={{borderRadius: borderRadiusIfApple(15), height: 30, marginRight: 10, borderColor: Color.blue.color, borderWidth: StyleSheet.hairlineWidth, flex: 1, justifyContent: 'center'}}
                                              onPress={() => this.setState({circuit_select_modal: true})}>
                                <Text style={[Style.card.cardItem.text_blue, {textAlign: 'center'}]}>{ I18n.t('planner.circuits.' + this.state.circuit) }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={{borderRadius: borderRadiusIfApple(15), height: 30, marginLeft: 10, borderColor: Color.blue.color, borderWidth: StyleSheet.hairlineWidth, flex: 1, justifyContent: 'center'}}
                                              onPress={() => this.changePercentageOrder()}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[{flex: 3, textAlign: 'right'}, this.state.percentage_goals_achieved_order === 'az' ? Style.card.cardItem.text_blue : Style.card.cardItem.text_disabled]}>A-Z</Text>
                                    <Text style={[{flex: 1, textAlign: 'center'}, Style.card.cardItem.text_disabled]}>/</Text>
                                    <Text style={[{flex: 3, textAlign: 'left'}, this.state.percentage_goals_achieved_order === '%' ? Style.card.cardItem.text_blue : Style.card.cardItem.text_disabled]}>%</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex: 1, marginBottom: 50}}>
                        { percentageGoals }
                    </View>
                </View>}


                <SimpleChooseModal isVisible={this.state.circuit_select_modal}
                                   collection={this.state.circuit_mode_options}
                                   onDismiss={() => this.setState({circuit_select_modal: false})}
                                   onChose={this.changeCircuitStatistics.bind(this)}/>
            </View>
        );
    }
}