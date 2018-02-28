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

export default class popularity extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        isToggled: PropTypes.bool.isRequired,

        changeRightHeader: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {}
        
        setTimeout(() => {
            this.mapStoreToState(this.props);
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
            this.props.changeRightHeader("Popularność");
        }
    }

    mapStoreToState(props) {
        if (!props.store.planner.statistics) {
            return;
        }

        let goalStatisticsOptions = [];
        if (props.store.planner.statistics.achieved_per_circuit) {
            Object.keys(props.store.planner.statistics.achieved_per_circuit).forEach(key => {
                goalStatisticsOptions.push(props.store.planner.statistics.achieved_per_circuit[key]['name']);
            });
        }

        this.setState({
            percentage_sets_usage: props.store.planner.statistics.percentage_sets_usage
        })
    }

    _getMostPopularData() {
        if (!this.state.percentage_sets_usage) {
            return [];
        }

        let data = [];
        let totalPercentage = 0;
        let pallete = [
            {'r':25,'g':99,'b':201},
            {'r':24,'g':175,'b':35},
            {'r':243,'g':156,'b':18},
            {'r':190,'g':31,'b':69},
            {'r':100,'g':36,'b':199},
            {'r':214,'g':207,'b':32},
            {'r':198,'g':84,'b':45},
            {'r':22,'g':160,'b':133},
        ];
        this.state.percentage_sets_usage.usage.forEach(exercise => {
            if (data.length < 8) {
                totalPercentage = totalPercentage + exercise.percentage;
                data.push({
                    title: exercise.name + " (" + exercise.percentage + "%)",
                    name: exercise.percentage + '%',
                    percentage: exercise.percentage,
                    color: pallete[data.length],
                })
            }
        });

        if (totalPercentage < 100) {
            let left = 100 - totalPercentage;
            data.push({
                title: 'Inne',
                name: left + '%',
                percentage: left,
                color: {'r':189,'g':195,'b':199}
            });
        }

        return {
            data: data,
            percentage: totalPercentage
        };
    }


    _getColorFromChart(color) {
        return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    }

    render() {
        let percentageUsage = this._getMostPopularData();

        return (
            <View style={this.props.isToggled ? {} : {position: 'absolute', width: 0, height: 0, zIndex: -2, overflow: 'hidden'}}>
                {this.state.percentage_sets_usage && this.state.percentage_sets_usage.usage && <View style={[Style.card.container, Style.card.cardItem.container, Style.card.cardItem.border_bottom]}>
                    <Text style={[Style.card.text_header_sub, {fontSize: 13}]}>Najczęściej wykonywane przez Ciebie ćwiczenia</Text>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 40, marginRight: 40}}>
                        <Text style={[Style.card.text_header_sub, {fontSize: 13, textAlign: 'left', flex: 1}]}>
                            Łącznie setów: <Text style={Style.card.cardItem.text}>{ this.state.percentage_sets_usage.total }</Text>
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', flex: 1}}>
                        <View style={{flex: 1}}>
                            {percentageUsage.percentage > 0 &&
                            <Pie data={percentageUsage.data}
                                 width={Style.widthValue / 2}
                                 height={Style.widthValue / 2}
                                 options={{
                                     width: Style.widthValue,
                                     height: 300,
                                     color: '#2980B9',
                                     legendPosition: 'bottomRight'
                                 }}
                                 accessorKey="percentage"
                                 color={Color.orange.color}
                                 r={0}
                                 R={70}
                                 legendPosition="bottomRight"
                                 label={{
                                     fontFamily: 'Poppins-Light',
                                     fontSize: 12,
                                     fontWeight: false,
                                     color: Color.white.color
                                 }}
                            />}
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            {percentageUsage.data.map((exercise, key) => {
                                return (<View key={key} style={{flexDirection: 'row'}}>
                                    <View style={{height: 12, width: 12, marginRight: 5, backgroundColor: this._getColorFromChart(exercise.color)}}></View>
                                    <Text numberOfLines={1} style={[Style.card.cardItem.text_note, {fontSize: 16, lineHeight: 18}]}>{exercise.title}</Text>
                                </View>)
                            })}
                        </View>
                    </View>
                </View>}
            </View>
        );
    }
}