import React from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Content, Button, Text, List, ListItem } from 'native-base';

import PropTypes from 'prop-types';

import Style from './../../../Styles/style';
import Color from './../../../Styles/color';

const CardioStyle = Style.cardio;

const RUNNING_DURATION = 20;
const REST_DURATION = 10;
const INITIAL_STATE = {
    running: false,

    running_seconds: RUNNING_DURATION,
    rest_seconds: REST_DURATION,

    rest: true,

    rounds: [],
    roundIndex: 0
};

export default class CardioTabataMode extends React.Component {
    static propTypes = {
        hasStart: PropTypes.func,
        hasStop: PropTypes.func,
        onReset: PropTypes.func,
        onTimeStageCompleted: PropTypes.func,
        theme: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    start() {
        this.interval = this.interval ? this.interval : setInterval(() => {
            let rest = this.state.rest;

            if (rest) {
                let left = this.state.rest_seconds - 1;
                let state = {rest_seconds: left, rest: rest, running_seconds: RUNNING_DURATION};
                if (left === -1) {
                    state.rest = false;
                    let rounds = this.state.rounds;
                    rounds.unshift({rest: true, duration: REST_DURATION, index: null});
                    state['rounds'] = rounds;
                    state['roundIndex'] = this.state.roundIndex + 1;
                }

                this.setState(state);
            } else {
                let left = this.state.running_seconds - 1;
                let state = {running_seconds: left, rest: rest, rest_seconds: REST_DURATION};
                if (left === -1) {
                    state.rest = true;
                    let rounds = this.state.rounds;
                    rounds.unshift({rest: false, duration: RUNNING_DURATION, index: this.state.roundIndex});
                    state['rounds'] = rounds;
                }

                this.setState(state, () => {
                    if (left === 0 && this.props.onTimeStageCompleted) {
                        this.props.onTimeStageCompleted(RUNNING_DURATION);
                    }
                });
            }
        }, 1000);

        if (this.props.hasStart) {
            this.props.hasStart();
        }

        this.setState({running: true});
    }

    restart() {
        let state = Object.assign({}, INITIAL_STATE, {rounds: []});
        this.setState(state, () => {
            if (this.props.onReset) {
                this.props.onReset();
            }
        });
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;

        if (this.props.hasStop) {
            this.props.hasStop();
        }

        this.setState({running: false});
    }

    formatted() {
        if (!this.state.running && this.state.rounds.length === 0 && this.state.rest_seconds === 10) {
            let style = [CardioStyle.timer.color, {marginLeft: 40, marginBottom: 40, textAlign: 'left', fontSize: 40, color: this.props.theme.textColor}];
            return (
                <View style={[CardioStyle.timer.container, {flexDirection: 'column'}]}>
                    <Text style={style} numberOfLines={1}>
                        <Text style={[style, {color: Color.red.color}]}>Czerw.</Text> - odpoczywaj!
                    </Text>
                    <Text style={style} numberOfLines={1}>
                        <Text style={[style]}>Biały</Text> - GO!
                    </Text>
                </View>
            )
        }

        let seconds = '00';
        let color = this.props.theme.textColor;
        if (this.state.rest) {
            seconds = this.addZeroPrefix(this.state.rest_seconds);
            color = Color.red.color;
        } else {
            if (this.state.running_seconds <= 3) {
                color = Color.orange.color;
            }
            seconds = this.addZeroPrefix(this.state.running_seconds);
        }

        let style = [CardioStyle.timer.count, {fontSize: 120, color: color}];
        if (seconds === '00') {
            return (
                <View style={CardioStyle.timer.container}>
                    {this.state.rest && <Text style={style}>GO !</Text>}
                    {!this.state.rest && <Text style={style}>REST !</Text>}
                </View>
            )
        }

        return (
            <View style={CardioStyle.timer.container}>
                <View style={{flex: 3}}></View>
                <Text style={style}>{ seconds.substr(0, 1) }</Text>
                <Text style={style}>{ seconds.substr(1, 2) }</Text>
                <View style={{flex: 3}}></View>
            </View>
        )
    }

    formatRound(round) {
        let color = round.index !== null ? this.props.theme.textColor : Color.red.color;
        let style = [CardioStyle.rounds.count, {color: color}];
        let seconds = round.duration.toString();

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {round.index !== null && <Text style={[CardioStyle.rounds.title, {flex: 1}]}>#</Text>}
                    {round.index !== null && <Text style={[CardioStyle.rounds.title, {flex: 3}]}>{round.index}</Text>}
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={style}>0</Text>
                    <Text style={style}>0</Text>
                    <Text style={[CardioStyle.rounds.colon, {color: color}]}>:</Text>
                    <Text style={style}>{ seconds.substr(0, 1) }</Text>
                    <Text style={style}>{ seconds.substr(1, 2) }</Text>
                </View>
            </View>
        )
    }

    addZeroPrefix(value) {
        value = value.toString();
        if (value.length === 1) {
            value = '0' + value;
        }

        return value;
    }

    render() {
        return (
            <View style={{flex: 10}}>
                { this.formatted() }

                <View style={CardioStyle.button.container}>
                    {!this.state.running &&
                    <Button transparent style={CardioStyle.button.restart} onPress={this.restart.bind(this)}>
                        <Text style={CardioStyle.button.restart_text}>WYZERUJ</Text>
                    </Button>}

                    {!this.state.running &&
                    <Button transparent style={CardioStyle.button.start} onPress={this.start.bind(this)}>
                        <Text style={CardioStyle.button.start_text}>START</Text>
                    </Button>}
                    {this.state.running &&
                    <Button transparent style={[CardioStyle.button.stop, {marginLeft: 20}]} onPress={this.stop.bind(this)}>
                        <Text style={CardioStyle.button.stop_text}>STOP</Text>
                    </Button>}
                </View>

                <View style={CardioStyle.rounds.container}>
                    <ScrollView>
                        {this.state.rounds.map((round, key) => <ListItem key={key} style={[CardioStyle.rounds.item_container, {backgroundColor: this.props.theme.backgroundColor}]}>
                            { this.formatRound(round) }
                        </ListItem>)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}