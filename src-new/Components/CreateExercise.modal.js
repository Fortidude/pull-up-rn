import React from 'react'
import PropTypes from 'prop-types';
import { View, Switch } from 'react-native';
import { Text, Card, Input, Button, Item } from 'native-base';

import Modal from 'react-native-modal';

import Spinner from './Spinner';
import {Goal} from './../Models/Goal'

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class CreateExerciseModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,

        onDismiss: PropTypes.func,
        createExercise: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,

        onDismiss: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            formValid: false,
            name: '',
            variant: '',
            is_cardio: false
        }
    }

    _cancel() {
        this.setState({value: 1});
        this.props.onDismiss();
    }

    _create() {
        this.props.createExercise(this.state.name, this.state.variant, this.state.is_cardio);
        this._cancel();
    }

    _isValid = () => this.state.name.length >= 1;

    render() {
        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', height: (Style.heightValue/3)+100, width: Style.widthValue-40, marginLeft: 20, marginRight: 20, backgroundColor: Color.light_black_03.color}}>
                    <View style={{flex:3, paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>

                        <Text style={[Style.card.cardItem.text, {marginBottom: 20, marginTop: 20}]}>{ I18n.t('planner.exercise.add_new') }</Text>

                        <Text style={[Style.card.cardItem.text_note]}>{ I18n.t('planner.exercise.name') }</Text>
                        <Input style={Style.card.cardItem.input}
                               value={this.state.name.toString()}
                               selectTextOnFocus={true}
                               keyboardAppearance="dark"
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType={'default'}
                               onChangeText={value => this.setState({name: value})}
                        />

                        <Text style={[Style.card.cardItem.text_note, {marginTop: 10}]}>{ I18n.t('planner.exercise.variant') }</Text>
                        <Input style={Style.card.cardItem.input}
                               value={this.state.variant.toString()}
                               selectTextOnFocus={true}
                               keyboardAppearance="dark"
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType={'default'}
                               placeholder="Opcjonalnie"
                               onChangeText={value => this.setState({variant: value})}
                        />

                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={{flex: 1}}>
                                <Text style={[Style.card.cardItem.text_note, {flex: 1}]}>{ I18n.t('planner.exercise.is_cardio') }</Text>
                            </View>
                            <View style={{flex: 1, marginRight: 10}}>
                                <Switch style={{alignSelf: 'flex-end'}} value={this.state.is_cardio}
                                        onValueChange={value => this.setState({is_cardio: value})} />
                            </View>
                        </View>
                    </View>
                    <View style={{flex:2, flexDirection: 'row'}}>
                        <Button rounded={isIos()} bordered disabled={!this._isValid()}
                                style={{borderColor: Style.touchColor.color, marginLeft: 20, marginRight: 10, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => this._create()}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.ok') }</Text>
                        </Button>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Color.red.color, marginLeft: 10, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => {this._cancel()}}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.cancel') }</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}