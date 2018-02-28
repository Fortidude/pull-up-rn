import React from 'react'
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Text, Card, Input, Button, Item, Content } from 'native-base';

import Modal from 'react-native-modal';

import Spinner from './Spinner';
import {Goal} from './../Models/Goal'

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class CreateSetModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,
        goal: PropTypes.object,

        cancel: PropTypes.func,
        createSet: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,

        cancel: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            formValid: false,
            value: ''
        }
    }

    _updateValue(value) {
        value = parseInt(value);
        let valid = false;
        if (isNaN(value)) {
            value = '';
        }

        if (value > 0 || value.length > 0) {
            valid = true;
        }

        this.setState({formValid: valid, value: value});
    }

    _cancel() {
        this.setState({value: ''});
        this.props.cancel();
    }

    _create() {
        if (!this.state.value || this.state.value === 0 || this.state.value.length === 0) {
            return;
        }

        this.props.createSet(this.props.goal, this.state.value);
        this._cancel();
    }

    render() {
        let placeholder = 'Ile wykonałeś powtórzeń?';
        if (this.props.goal && this.props.goal.required_type === 'time') {
            placeholder = "Podaj ilość minut.";
        }

        return (
            <Content keyboardShouldPersistTaps="always" bounces={true} style={{padding: 0, margin: 0}}>
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>
                <View style={{alignSelf: 'center', alignContent: 'center', maxHeight: Style.heightValue/3, height: Style.heightValue/3, width: Style.widthValue-40, marginLeft: 20, marginRight: 20, backgroundColor: Color.light_black_03.color}}>
                        {this.props.goal && <View style={{flex:3, paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={[Style.card.cardItem.text, {flex: 1}]}>{ this.props.goal.exercise.name }</Text>

                                {this.props.goal.required_type !== 'none' && <Text style={[Style.card.cardItem.text_note, {flex: 1, textAlign: 'right'}]}>{ this.props.goal.done_this_circuit } / { this.props.goal.required_amount }</Text>}
                                {this.props.goal.required_type === 'none' && <Text style={[Style.card.cardItem.text_note, {flex: 1, textAlign: 'right'}]}>{ I18n.t('planner.create_set.till_now') }: { this.props.goal.done_this_circuit }</Text>}

                            </View>
                            <View style={{flexDirection: 'row', marginBottom: 10, minHeight: 20}}>
                                {this.props.goal.required_type !== 'none' && <Text style={[Style.card.cardItem.text_note, {flex: 1}]}>
                                    Cel: { this.props.goal.required_amount } { this.props.goal.required_type === 'time' ? I18n.t('planner.create_set.minutes') : this.props.goal.required_type }
                                </Text>}
                            </View>

                            <Input style={[Style.card.cardItem.input, {marginTop: 20}]}
                                                                                value={this.state.value.toString()}
                                                                                selectTextOnFocus={true}
                                                                                keyboardAppearance="dark"
                                                                                autoCapitalize="none"
                                                                                autoCorrect={false}
                                                                                keyboardType={'phone-pad'}
                                                                                placeholder={placeholder}
                                                                                onChangeText={this._updateValue.bind(this)}
                            />
                        </View>}
                        {this.props.goal && <View style={{flex:2, flexDirection: 'row'}}>
                            <Button rounded={isIos()} bordered disabled={false}
                                    style={{borderColor: Style.touchColor.color, marginLeft: 20, marginRight: 10, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                    onPress={_ => this._create()}>
                                <Text style={{color: Color.white.color}}>{ I18n.t('buttons.ok') }</Text>
                            </Button>
                            <Button rounded={isIos()} bordered disabled={false}
                                    style={{borderColor: Color.red.color, marginLeft: 10, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                    onPress={_ => {this._cancel()}}>
                                <Text style={{color: Color.white.color}}>{ I18n.t('buttons.cancel') }</Text>
                            </Button>
                        </View>}
                </View>
            </Modal>
            </Content>
        );
    }
}