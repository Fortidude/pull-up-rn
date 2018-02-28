import React from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Card, Input, Button, Item, ActionSheet } from 'native-base';

import Modal from 'react-native-modal';

import SimpleChooseModal from './../../../Components/SimpleChoose.modal';
import InformationModal from './../../../Components/Information.modal';

import Style, {isIos} from './../../../Styles/style';
import Color from './../../../Styles/color';
import I18n from './../../../Translations/translations';

export const MODE_TABATA = 'Tabata';
export const MODE_CLASSIC = 'Klasycznie';

export default class CardioConfigModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,

        goalSections: PropTypes.object.isRequired,

        goal: PropTypes.object,
        mode: PropTypes.string,

        onDismiss: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isVisible: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            goals: [],

            formValid: false,
            goal: this.props.goal ? this.props.goal : null,
            mode: this.props.mode ? this.props.mode : null,

            choose_exercise_modal: false,
            choose_exercise_options: [],
            choose_mode_modal: false,
            choose_mode_options: [MODE_CLASSIC, MODE_TABATA]
        }
    }

    componentDidMount() {
        this._mapGoals();
    }

    componentWillReceiveProps(nextProps) {
        let changed = false;
        let state = this.state;

        if (nextProps.goal !== this.props.goal) {
            state.goal = nextProps.goal;
        }

        if (nextProps.mode !== this.props.mode) {
            state.mode = nextProps.mode;
        }

        if (changed) {
            this.setState(state);
        }
    }

    _mapGoals() {
        let goals =[];
        Object.keys(this.props.goalSections).forEach(key => {
            this.props.goalSections[key].forEach(goal => {
                if (goal && goal.exercise.is_cardio) {
                    goals.push(goal);
                }
            })
        });

        let options = [];
        goals.forEach((goal) => {
            if (goal.exercise_variant.name) {
                options.push(goal.exercise.name + ' | ' + goal.exercise_variant.name);
            } else {
                options.push(goal.exercise.name);
            }
        });

        this.setState({goals: goals, choose_exercise_options: options});
    }

    _cancel() {
        this.props.onDismiss();
    }

    _select() {
        this.props.onSelect(this.state.goal, this.state.mode);
        this._cancel();
    }

    choiceExercise(index) {
        let goal = this.state.goals[index];
        this.setState({goal: goal});
    }

    choiceMode(index) {
        this.setState({mode: this.state.choose_mode_options[index]});
    }

    render() {
        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', height: (Style.heightValue/3)+50, width: Style.widthValue-40, marginLeft: 20, marginRight: 20, backgroundColor: Color.light_black_03.color}}>
                    <View style={{flex:3, paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>

                        <Text style={[Style.card.cardItem.text, {marginBottom: 20, marginTop: 20}]}>Ustaw trening CARDIO</Text>


                        <Button transparent
                                onPress={() => this.setState({choose_exercise_modal: true})}
                                style={[Style.card.cardItem.input_with_icon.container, {width: Style.widthValue /2, paddingLeft: 0, marginLeft: 0, marginRight: 0, justifyContent: 'center', alignSelf: 'center'}]}>
                            {!this.state.goal && <Text style={{color: Style.touchColor.color}}>Wybierz Cwiczenie</Text>}

                            {this.state.goal && !this.state.goal.exercise_variant.name && <Text style={{color: Style.touchColor.color}}>{ this.state.goal.exercise.name }</Text>}
                            {this.state.goal && this.state.goal.exercise_variant.name && <Text style={{width: Style.widthValue/2, paddingLeft: 15, paddingRight: 15, overflow: 'hidden', color: Style.touchColor.color}} numberOfLines={1}>{ this.state.goal.exercise.name } ({this.state.goal.exercise_variant.name})</Text>}
                        </Button>

                        <Button transparent
                                onPress={() => this.setState({choose_mode_modal: true})}
                                style={[Style.card.cardItem.input_with_icon.container, {width: Style.widthValue /2, paddingLeft: 0, marginLeft: 0, marginRight: 0, marginTop: 15, justifyContent: 'center', alignSelf: 'center'}]}>
                            {!this.state.mode && <Text style={{color: Style.touchColor.color}}>Wybierz Tryb</Text>}
                            {this.state.mode && <Text style={{color: Style.touchColor.color}}>{ this.state.mode }</Text>}
                        </Button>

                    </View>
                    <View style={{flex:2, flexDirection: 'row'}}>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Style.touchColor.color, marginLeft: 20, marginRight: 10, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => this._select()}>
                            <Text style={{color: Color.white.color}}>OK</Text>
                        </Button>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Color.red.color, marginLeft: 10, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => {this._cancel()}}>
                            <Text style={{color: Color.white.color}}>Anuluj</Text>
                        </Button>
                    </View>
                </View>

                <SimpleChooseModal isVisible={this.state.choose_exercise_modal && this.state.choose_exercise_options.length > 0}
                                   collection={this.state.choose_exercise_options}
                                   onDismiss={() => this.setState({choose_exercise_modal: false})}
                                   onChose={this.choiceExercise.bind(this)}/>
                
                <SimpleChooseModal isVisible={this.state.choose_mode_modal}
                                   collection={this.state.choose_mode_options}
                                   onDismiss={() => this.setState({choose_mode_modal: false})}
                                   onChose={this.choiceMode.bind(this)}/>

                <InformationModal isVisible={this.state.choose_exercise_modal && this.state.choose_exercise_options.length === 0}
                                  onDismiss={() => this.setState({choose_exercise_modal: false})}
                                  message={'informations.no_cardio_exercises'}
                />

            </Modal>
        );
    }
}