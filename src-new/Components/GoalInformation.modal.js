import React from 'react'
import PropTypes from 'prop-types';
import { View, ScrollView, StatusBar } from 'react-native';
import { Text, Card, Input, Button, Item } from 'native-base';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import { SmoothLine, StockLine } from 'react-native-pathjs-charts'

import Spinkit from './Spinner';

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class GoalInformation extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        goal: PropTypes.object,

        onDismiss: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,
    };

    constructor(props) {
        super(props);
    }

    _dismiss() {
        this.props.onDismiss();
    }

    addZeroPrefix(text) {
        text = text.toString();
        if (text.length === 1) {
            return '0' + text;
        } else if (text.length === 0) {
            return '00';
        }

        return text;
    }

    CircleGoalProgress() {
        let percent = 100;
        let tintColor = Color.light_black.color;
        let widthSize = 2;
        let isGoal = false;
        if (this.props.goal.required_type !== 'none') {
            percent = (this.props.goal.done_this_circuit / this.props.goal.required_amount) * 100
            tintColor = Color.tealBlue.color;
            widthSize = 5;
            isGoal = true;
        }

        return (
            <AnimatedCircularProgress
                style={{backgroundColor: 'transparent'}}
                size={100}
                width={widthSize}
                fill={percent}
                tension={5}
                friction={30}
                rotation={0}
                tintColor={tintColor}
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={Color.light_black.colorHalf}>
                {
                    (fill) => (
                        <View style={{alignItems: 'center'}}>
                            <Text numberOfLines={1} style={[Style.card.cardItem.text]}>{this.props.goal.exercise.name }</Text>
                            {isGoal && <Text numberOfLines={1} style={[Style.card.cardItem.text_note]}>({ I18n.t('planner.type.' + this.props.goal.required_type) })</Text>}
                        </View>
                    )
                }
            </AnimatedCircularProgress>
        )
    }

    CurrentCircuitSets() {
        let data = [];
        let thisCircuit = [];
        let tickValuesX = [];

        let maxValue = 0;
        let tickValuesY = [];

        if (!this.props.goal.sets || this.props.goal.sets.length < 2) {
            return (<View style={{flex: 1, justifyContent: 'center'}}><Text style={[Style.card.cardItem.text_blue, {alignSelf: 'center'}]}>Wykres setów niedostępny. Wykonaj przynajmniej dwa.</Text></View>);
        }

        this.props.goal.sets.forEach((set, key) => {
            let x = key + 1;
            thisCircuit.push({y: set.value, x: x});
            tickValuesX.push({value: x.toString()});

            if (set.value > maxValue) {
                maxValue = set.value;
            }
        });

        data.push(thisCircuit);

        let width = Style.widthValue-50;
        if (data[0] && data[0].length > 16) {
            width = Style.widthValue * (data[0].length / 16);
        }

        let part = Math.round(maxValue / 10);
        if (maxValue > 0 && part > 0) {
            for (let index = part; index <= maxValue; index += part) {
                tickValuesY.push({value: index});
            }
        } else {
            tickValuesY = [{value: 1}];
        }

        let options = {
            width: width,
            height: Style.widthValue/2,
            color: '#157CED',
            margin: {
                top: 20,
                left: 40,
                bottom: 30,
                right: 10
            },
            axisX: {
                showAxis: true,
                showLines: false,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: tickValuesX,
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: false,
                    fill: '#fff'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                tickValues: tickValuesY,
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: false,
                    fill: '#fff'
                }
            }
        };

        return (
            <View>
                <Text style={[Style.card.cardItem.text_note, {alignSelf: 'flex-start', marginLeft: 20}]}>ilość powtórzeń</Text>
                <ScrollView horizontal={true} style={[Style.card.container, Style.card.cardItem.container, {marginLeft: -10, marginRight: -10}]}>
                    <StockLine data={data} options={options} xKey='x' yKey='y' />
                </ScrollView>
                <Text style={[Style.card.cardItem.text_note, {alignSelf: 'flex-end', marginRight: 20}]}>numer setu</Text>
            </View>
        )
    }

    render() {
        if (this.props.goal === null) {
            return <View></View>;
        }

        let variantName = '-';
        let goalType = I18n.t('planner.type.none_t');
        let left = false;
        let lastModified = '-';
        let createdAt = '-';
        if (this.props.goal.exercise_variant && this.props.goal.exercise_variant.name) {
            variantName =  this.props.goal.exercise_variant.name;
        }

        if (this.props.goal.required_type !== 'none') {
            left = this.props.goal.required_amount - this.props.goal.done_this_circuit;
        }

        if (this.props.goal.created_at) {
            let dateString = this.props.goal.created_at.replace(' ', 'T').replace('0100', '01:00');
            let date = new Date(dateString);
            createdAt = date.getFullYear() + '-' + this.addZeroPrefix(date.getMonth()+1) + '-' + this.addZeroPrefix(date.getDate()) + " " + this.addZeroPrefix(date.getHours()) + ':' + this.addZeroPrefix(date.getMinutes());
        }

        if (this.props.goal.updated_at && this.props.goal.created_at !== this.props.goal.updated_at) {
            let updated_at = this.props.goal.updated_at.replace(' ', 'T').replace('0100', '01:00');
            let date = new Date(updated_at);
            lastModified = date.getFullYear() + '-' + this.addZeroPrefix(date.getMonth()+1) + '-' + this.addZeroPrefix(date.getDate()) + " " + this.addZeroPrefix(date.getHours()) + ':' + this.addZeroPrefix(date.getMinutes());
        }

        if (this.props.goal.required_type !== 'none') {
            goalType = I18n.t('planner.type.' + this.props.goal.required_type) + ' (' + this.props.goal.required_amount + ')';
        }

        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', height: Style.heightValue, width: Style.widthValue, backgroundColor: Color.light_black_03.color}}>
                    <StatusBar hidden={true}/>
                    {this.props.goal && <View style={{flex:6, justifyContent: 'center'}}>
                        {this.props.goal.exercise.is_cardio && <Text style={[Style.card.cardItem.text_note, {position: 'absolute', right: 20, top: 20}]}>(cardio)</Text>}
                        <View style={{alignItems: 'center', marginTop: 20}}>

                            { this.CircleGoalProgress() }
                        </View>

                        <View style={{height: Style.widthValue/2 + 70, marginTop: 20, marginBottom: 20}}>
                            { this.CurrentCircuitSets() }
                        </View>
                        <View style={{padding: 20}}>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>Wariant:</Text></View>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>{ variantName }</Text></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>Typ celu:</Text></View>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>{ goalType }</Text></View>
                            </View>
                            {left !== false && <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>Pozostało:</Text></View>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>{ left }</Text></View>
                            </View>}
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>Utworzono:</Text></View>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>{ createdAt }</Text></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>Ostatni set:</Text></View>
                                <View style={{flex: 1}}><Text style={[Style.card.cardItem.text_dark]}>{ lastModified }</Text></View>
                            </View>
                        </View>

                    </View>}
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex: 0.5}}></View>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Color.red.color, marginLeft: 20, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => this._dismiss()}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.close') }</Text>
                        </Button>
                        <View style={{flex: 0.5}}></View>
                    </View>
                </View>
            </Modal>
        );
    }
}