import React from 'react';
import Abstract from './../abstract';
import {View, Alert, ScrollView} from 'react-native';
import {Container, Content, Button, Text, List, ListItem} from 'native-base';
import KeepAwake from 'react-native-keep-awake';

import PullUpHeader from './../../Components/PullUpHeader';
import FooterSaveButton from './../../Components/FooterSaveButton';

import CardioConfigModal, {MODE_TABATA, MODE_CLASSIC} from './Components/CardioConfigModal';
import CardioClassicMode from './Components/CardioClassicMode';
import CardioTabataMode from './Components/CardioTabataMode';

import Style from './../../Styles/style';
import Color from './../../Styles/color';

const CardioStyle = Style.cardio;

const INITIAL_STATE = {
    running: false,
    cunning_time: 0,

    config_modal_visible: false,
    goal: null,
    mode: MODE_CLASSIC,
};

const theme = {
    backgroundColor: Color.white.color,
    textColor: Color.black.color
};
const themeDark = {
    backgroundColor: Color.black.color,
    textColor: Color.white.color
};

class cardio extends Abstract {

    constructor(props) {
        super(props);

        this.state = Object.assign({
            theme: this.props.store.settings.settings.light_theme ? theme : themeDark
        }, INITIAL_STATE);

        this.props.dispatchLoadPlanner();
    }

    onStart() {
        if (this.props.store.settings.settings.cardio_screen_on) {
            KeepAwake.activate();
        }
        this.setState({running: true});
    }

    onStop() {
        if (this.props.store.settings.settings.cardio_screen_on) {
            KeepAwake.deactivate();
        }
        this.setState({running: false});
    }

    onStageCompleted(time) {
        let totalTime = this.state.cunning_time + time;

        this.setState({cunning_time: totalTime}, () => {
            this.props.dispatchSetCardioTime(totalTime);
        });
    }

    componentDidMount() {
        this.setState({
            cunning_time: this.props.store.training.time,
            goal: this.props.store.training.goal,
            mode: this.props.store.training.mode ? this.props.store.training.mode : MODE_CLASSIC
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.props.store.planner.error) {
            Alert.alert('Wystapił błąd', "Nie udało się zapisać setu.");
            this.props.dispatchResetError();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.store.settings.settings.light_theme !== this.props.store.settings.settings.light_theme) {
            this.setState({theme: nextProps.store.settings.settings.light_theme ? theme : themeDark})
        }
    }

    getTextRightHeader() {
        if (this.state.running) {
            return (<Button transparent onPress={() => {}}><Text style={[Style.header.right.text_button, Style.header.right.text_button_disabled]}>Ustaw</Text></Button>)
        }

        return (<Button transparent onPress={() => {this.setState({config_modal_visible: true})}}><Text style={Style.header.right.text_button}>Ustaw</Text></Button>)
    }

    setGoalAndMode(goal, mode) {
        let oldGoal = this.state.goal;
        let oldMode = this.state.mode;
        this.setState({goal: goal, mode: mode}, () => {
            if (goal && oldGoal !== goal) {
                this.props.dispatchSetCardioGoal(goal);
            }
            if (mode && oldMode !== mode) {
                this.props.dispatchSetCardioMode(mode);
            }
        });
    }

    onClear() {
        this.setState({cunning_time: 0}, () => {
            this.props.dispatchResetCardioTime();
        })
    }

    getSaveButtonText() {
        let totalTime = this.state.cunning_time;
        let seconds = totalTime % 60;
        totalTime = totalTime - seconds;

        let minutes = Math.round(totalTime/60) % 60;
        totalTime = totalTime - minutes;

        let hours = Math.round((totalTime)/3600);

        let time = this.addZeroPrefix(hours) + ":" + this.addZeroPrefix(minutes);

        return "Zapisz jako set (" + time + ")";
    }

    saveSet() {
        if (!this.state.goal) {
            return;
        }

        let totalTime = this.state.cunning_time;
        let seconds = totalTime % 60;
        let minutes = Math.round((totalTime - seconds)/60) % 60;

        let payload = {goal: this.state.goal.id, data: new Date(), time: minutes};
        this.setState({cunning_time: 0}, () => {
            this.props.dispatchCreateSet(payload);
            this.props.dispatchResetCardioTime();
        })
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
            <Container>
                <PullUpHeader back
                              navigation={this.props.navigation}
                              bodyText={"Cardio"}
                              lightTheme={this.props.store.settings.settings.light_theme}
                              right={this.getTextRightHeader()}
                />

                <View style={{flex: 1}}>
                    <View style={CardioStyle.header.container}>
                        {this.state.goal && <Text style={[Style.card.text_header, {flex: 1, textAlign: 'right', marginRight: 10, paddingLeft: 40, overflow: 'hidden', color: this.state.theme.textColor}]} numberOfLines={1}>{ this.state.goal.exercise.name }{this.state.goal.exercise_variant.name && ', ' + this.state.goal.exercise_variant.name}</Text>}
                        <Text style={[Style.card.text_header, {flex: 1}, this.state.goal ? {textAlign: 'left', marginLeft: 10, paddingRight: 40, overflow: 'hidden', color: this.state.theme.textColor} : {textAlign: 'center'}]} numberOfLines={1}>{ this.state.mode }</Text>
                    </View>

                    {this.state.mode === MODE_CLASSIC && <CardioClassicMode
                        hasStart={this.onStart.bind(this)}
                        hasStop={this.onStop.bind(this)}
                        onReset={this.onClear.bind(this)}
                        theme={this.state.theme}
                        onTimeStageCompleted={this.onStageCompleted.bind(this)}
                    />}

                    {this.state.mode === MODE_TABATA && <CardioTabataMode
                        hasStart={this.onStart.bind(this)}
                        hasStop={this.onStop.bind(this)}
                        onReset={this.onClear.bind(this)}
                        theme={this.state.theme}
                        onTimeStageCompleted={this.onStageCompleted.bind(this)}
                    />}
                </View>

                <CardioConfigModal
                    onDismiss={() => {this.setState({config_modal_visible: false})}}
                    onSelect={this.setGoalAndMode.bind(this)}
                    goalSections={this.props.store.planner.planner}
                    goal={this.state.goal}
                    mode={this.state.mode}
                    isVisible={this.state.config_modal_visible}
                />

                <FooterSaveButton onPress={() => {this.saveSet()}}
                                  changed={((this.state.goal !== null) && this.state.cunning_time >= 60)}
                                  text={this.getSaveButtonText()}/>
            </Container>
        );
    }
}

import { createSet, loadPlanner, resetError } from './../../Store/Planner/planner.actions';
import { setCardioTime, setCardioGoal, setCardioMode, resetCardioTime } from './../../Store/Training/actions';
import { connect } from 'react-redux';

function mapStateToProps (state) {
    return {
        store: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLoadPlanner: () => dispatch(loadPlanner()),
        dispatchCreateSet: (payload) => dispatch(createSet(payload)),
        dispatchResetError: () => dispatch(resetError()),

        dispatchSetCardioTime: (time) => dispatch(setCardioTime(time)),
        dispatchSetCardioGoal: (goal) => dispatch(setCardioGoal(goal)),
        dispatchSetCardioMode: (mode) => dispatch(setCardioMode(mode)),

        dispatchResetCardioTime: () => dispatch(resetCardioTime()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(cardio)
