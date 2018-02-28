import React from 'react'
import PropTypes from 'prop-types';
import { View, StatusBar, LayoutAnimation, TouchableOpacity, Platform } from 'react-native';
import { Card, Input, Button, Item, Text, Icon } from 'native-base';

import Modal from 'react-native-modal';

import TextWithLetterSpacing from './TextWithLetterSpacing';

import Style from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';
const gStyle = Style.planner.new_goal;

export default class ChoiceGoalTypeModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,

        onSelect: PropTypes.func.isRequired,
        onDismiss: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,

        onDismiss: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            help: false,
            help_width: 0,
            help_height: 0
        }
    }

    showHelpSection() {
        let show = !this.state.help;

        LayoutAnimation.spring();
        this.setState({
            help: show,
            help_height: show ? null : 0,
            help_width: show ? Style.widthValue-40 : 0
        });
    }

    _cancel() {
        this.props.onDismiss();
    }

    _select(type) {
        this.props.onSelect(type);
        this._cancel();
    }

    render() {
        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                backdropColor={Color.black.color}
                backdropOpacity={1}
                isVisible={this.props.isVisible}
                style={{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0}}>

                <View style={{height: Style.heightValue, borderColor: Color.black.color, borderWidth: 1}}>
                    {Platform.OS === 'ios' && <StatusBar hidden={true}/>}

                    <View style={{height: this.state.help_height, width: this.state.help_width, overflow: 'visible', margin: 20, padding: 20, marginBottom: 0, alignSelf: 'flex-end', borderColor: Color.light_black_03.color, borderWidth: this.state.help ? 1 : 0, borderRadius: 20}}>
                        <Text style={[Style.card.cardItem.text_note, {fontSize: 14}]}>{ I18n.t('planner.choice_type.help.header') }</Text>
                        <Text style={[Style.card.cardItem.text_note, {fontSize: 14}]}>
                            <Text style={Style.card.cardItem.text}>{ I18n.t('planner.choice_type.none').toLocaleUpperCase() }</Text> - { I18n.t('planner.choice_type.help.header') }
                        </Text>
                        <Text style={[Style.card.cardItem.text_note, {fontSize: 14}]}>
                            <Text style={Style.card.cardItem.text}>{ I18n.t('planner.choice_type.sets').toLocaleUpperCase() }</Text> - { I18n.t('planner.choice_type.help.sets') }
                        </Text>
                        <Text style={[Style.card.cardItem.text_note, {fontSize: 14}]}>
                            <Text style={Style.card.cardItem.text}>{ I18n.t('planner.choice_type.reps').toLocaleUpperCase() }</Text> - { I18n.t('planner.choice_type.help.reps') }
                        </Text>
                        <Text style={[Style.card.cardItem.text_note, {fontSize: 14}]}>
                            <Text style={Style.card.cardItem.text}>{ I18n.t('planner.choice_type.time').toLocaleUpperCase() }</Text> - { I18n.t('planner.choice_type.help.time') }
                        </Text>
                        <TouchableOpacity style={[Platform.select({ios: {top: 0}, android: {top: 8}}), {position: 'absolute', right: 0}]} onPress={() => this.showHelpSection()}>
                            {!this.state.help && <Icon name="ios-help-circle-outline" style={[Platform.select({ios: {fontSize: 40}, android: {fontSize: 35}}), {color: Style.touchColor.color}]}/>}
                            {this.state.help && <Icon name="ios-close-circle-outline" style={[Platform.select({ios: {fontSize: 40}, android: {fontSize: 35}}), {color: Style.touchColor.color}]}/>}
                        </TouchableOpacity>
                    </View>

                    <View style={gStyle.row}>
                        <TouchableOpacity style={[gStyle.tile_right]} onPress={() => this._select('none')}>
                            <View style={gStyle.tile_content}>
                                <TextWithLetterSpacing spacing={3} line={true} center>{ I18n.t('planner.choice_type.none').toLocaleUpperCase() }</TextWithLetterSpacing>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity  style={[gStyle.tile_right]} onPress={() => this._select('sets')}>
                            <View style={[gStyle.tile_content]}>
                                <TextWithLetterSpacing spacing={3} line={true} center>{ I18n.t('planner.choice_type.sets').toLocaleUpperCase() }</TextWithLetterSpacing>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[gStyle.row, {marginBottom: 50}]}>
                        <TouchableOpacity style={[gStyle.tile_right]} onPress={() => this._select('reps')}>
                            <View style={gStyle.tile_content}>
                                <TextWithLetterSpacing spacing={3} line={true} center>{ I18n.t('planner.choice_type.reps').toLocaleUpperCase() }</TextWithLetterSpacing>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity  style={[gStyle.tile_right]} onPress={() => this._select('time')}>
                            <View style={[gStyle.tile_content]}>
                                <TextWithLetterSpacing spacing={3} line={true} center>{ I18n.t('planner.choice_type.time').toLocaleUpperCase() }</TextWithLetterSpacing>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}