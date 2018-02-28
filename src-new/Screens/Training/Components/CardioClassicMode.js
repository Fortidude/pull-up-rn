import React from 'react';
import {View, ScrollView} from 'react-native';
import {Container, Content, Button, Text, List, ListItem} from 'native-base';

import PropTypes from 'prop-types';

import Style from './../../../Styles/style';
import Color from './../../../Styles/color';

const CardioStyle = Style.cardio;

const INITIAL_STATE = {
    running: false,

    hours: 0,
    minutes: 0,
    seconds: 0,

    prev_save_hours: 0,
    prev_save_minutes: 0,
    prev_save_seconds: 0,

    rounds: []
};

export default class CardioClassicMode extends React.Component {
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

            let hours = this.state.hours;
            let minutes = this.state.minutes;
            let seconds = this.state.seconds + 1;

            if (seconds === 60) {
                minutes = minutes + 1;
                seconds = 0;
            }

            if (minutes === 60) {
                hours = hours + 1;
                minutes = 0;
            }

            if (seconds % 10 === 0 && this.props.onTimeStageCompleted) {
                this.props.onTimeStageCompleted(10)
            }

            this.setState({hours: hours, minutes: minutes, seconds: seconds});
        }, 100);


        if (this.props.hasStart) {
            this.props.hasStart();
        }

        this.setState({running: true});
    }

    round() {
        let rounds = this.state.rounds;
        let totalTime = this.state.seconds + (this.state.minutes * 60) + (this.state.hours * 60 * 60);
        let totalTimePrev = this.state.prev_save_seconds + (this.state.prev_save_minutes * 60) + (this.state.prev_save_hours * 60 * 60);
        let state = {
            prev_save_hours: this.state.hours,
            prev_save_minutes: this.state.minutes,
            prev_save_seconds: this.state.seconds,
            rounds: []
        };

        let roundTime = totalTime - totalTimePrev;

        let seconds = roundTime % 60;
        roundTime = roundTime - seconds;

        let minutes = Math.round(roundTime/60) % 60;
        roundTime = roundTime - minutes;

        let hours = Math.round((roundTime)/3600);

        rounds.unshift({hours: hours, minutes: minutes, seconds: seconds, index: rounds.length + 1});

        state.rounds = rounds;

        this.setState(state);
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
        let hours = this.addZeroPrefix(this.state.hours);
        let minutes = this.addZeroPrefix(this.state.minutes);
        let seconds = this.addZeroPrefix(this.state.seconds);

        return (
            <View style={CardioStyle.timer.container}>
                <View style={{flex: 1}}></View>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ hours.substr(0, 1) }</Text>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ hours.substr(1, 2) }</Text>
                <Text style={[CardioStyle.timer.colon, {color: this.props.theme.textColor}]}>:</Text>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ minutes.substr(0, 1) }</Text>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ minutes.substr(1, 2) }</Text>
                <Text style={[CardioStyle.timer.colon, {color: this.props.theme.textColor}]}>:</Text>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ seconds.substr(0, 1) }</Text>
                <Text style={[CardioStyle.timer.count, {color: this.props.theme.textColor}]}>{ seconds.substr(1, 2) }</Text>
                <View style={{flex: 1}}></View>
            </View>
        )
    }

    formatRound(round) {
        let hours = this.addZeroPrefix(round.hours);
        let minutes = this.addZeroPrefix(round.minutes);
        let seconds = this.addZeroPrefix(round.seconds);

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={[CardioStyle.rounds.title, {color: this.props.theme.textColor}]}>runda</Text>
                    <Text style={[CardioStyle.rounds.title, {width: 20, color: this.props.theme.textColor}]}>{round.index}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ hours.substr(0, 1) }</Text>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ hours.substr(1, 2) }</Text>
                    <Text style={[CardioStyle.rounds.colon, {color: this.props.theme.textColor}]}>:</Text>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ minutes.substr(0, 1) }</Text>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ minutes.substr(1, 2) }</Text>
                    <Text style={[CardioStyle.rounds.colon, {color: this.props.theme.textColor}]}>:</Text>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ seconds.substr(0, 1) }</Text>
                    <Text style={[CardioStyle.rounds.count, {color: this.props.theme.textColor}]}>{ seconds.substr(1, 2) }</Text>
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
            <View style={{flex: 10, backgroundColor: this.props.theme.backgroundColor}}>
                { this.formatted() }

                <View style={CardioStyle.button.container}>
                    {!this.state.running && <Button transparent style={CardioStyle.button.restart} onPress={this.restart.bind(this)}>
                        <Text style={CardioStyle.button.restart_text}>WYZERUJ</Text>
                    </Button>}
                    {this.state.running && <Button transparent style={CardioStyle.button.round} onPress={this.round.bind(this)}>
                        <Text style={CardioStyle.button.round_text}>RUNDA</Text>
                    </Button>}

                    {!this.state.running && <Button transparent style={CardioStyle.button.start} onPress={this.start.bind(this)}>
                        <Text style={CardioStyle.button.start_text}>START</Text>
                    </Button>}
                    {this.state.running && <Button transparent style={CardioStyle.button.stop} onPress={this.stop.bind(this)}>
                        <Text style={CardioStyle.button.stop_text}>STOP</Text>
                    </Button>}
                </View>

                <View style={CardioStyle.rounds.container}>
                    <ScrollView>
                        {this.state.rounds.map((round) => <ListItem style={[CardioStyle.rounds.item_container, {backgroundColor: this.props.theme.backgroundColor}]}>
                            { this.formatRound(round) }
                        </ListItem>)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}