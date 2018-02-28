import React from 'react';
import {Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Container, Content, List, Item, Icon, Text, Left, Body, Right, Separator,
    Header, Button, Footer, Fab
} from 'native-base';

import Swipeable from 'react-native-swipeable';

import {themeDark} from './../home';

import I18n from './../../../Translations/translations';

import homeStyle, {tileSizeMedium} from './../home.style';
import Color from './../../../Styles/color';
import Style from './../../../Styles/style';
const TileSectionStyle = homeStyle.tileSection;

export default class ListItem extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            swipeAnim: new Animated.Value(0),
            theme: themeDark
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps === this.props) {
            return false;
        }

        return true;
    }

    render() {
        const {goal, keyValue, sectionName, isFirst, isLast, isSectionLast} = this.props;

        let goalKey = sectionName.toString() + keyValue.toString();

        let percentWidth = 0;
        let textLeft = 0;
        let percent = goal.done_this_circuit / goal.required_amount;
        if (goal.required_type !== 'none') {
            percentWidth = Style.widthValue * percent;
            textLeft = percentWidth - 20;
            textLeft = textLeft < 10 ? 10 : textLeft;
        }
        if (percentWidth > Style.widthValue) {
            percentWidth = Style.widthValue;
            textLeft = Style.widthValue - 20;
        }

        const leftContent = <View style={{height: 70, justifyContent: 'center', backgroundColor: this.state.theme.goalSwipeLeftButtonBackgroundColor}}>
            <Icon active name="ios-information-circle-outline" style={{color: this.state.theme.goalSwipeLeftButtonTextColor, marginRight: 20, alignSelf: 'flex-end'}}/>
        </View>;

        const rightButtons = [
            <TouchableOpacity style={{flex: 1, height: 70, backgroundColor: this.state.theme.goalSwipeRightButton1BackgroundColor, borderBottomColor: isLast ? 'transparent' : Color.black.colorHalf, borderBottomWidth: Style.borderWidth.borderWidth}} onPress={() => this.props.openChangeSectionGoalModal(goal, sectionName)}>
                <View style={{flexDirection: 'row', height: 70, width: 70, justifyContent: 'center'}}>
                    <Icon active name="ios-arrow-round-down" style={{color: this.state.theme.goalSwipeRightButton1TextColor, marginLeft: 5, alignSelf: 'center'}}/>
                    <Icon active name="ios-arrow-round-up" style={{color: this.state.theme.goalSwipeRightButton1TextColor, marginLeft: 0, alignSelf: 'center'}}/>
                </View>
            </TouchableOpacity>,
            <TouchableOpacity style={{flex: 1, height: 70, backgroundColor: this.state.theme.goalSwipeRightButton2BackgroundColor, borderBottomColor: isLast ? 'transparent' : Color.black.colorHalf, borderBottomWidth: Style.borderWidth.borderWidth}} onPress={() => this.props.onGoalRemove(goal)}>
                <View style={{flexDirection: 'row', height: 70, width: 70, justifyContent: 'center'}}>
                    <Icon active name="ios-trash" style={{color: this.state.theme.goalSwipeRightButton2TextColor, marginLeft: 5, alignSelf: 'center'}}/>
                </View>
            </TouchableOpacity>
        ];

        let titleRight = this.state.swipeAnim.interpolate({
            inputRange: [-Style.widthValue, 0],
            outputRange: [-(Style.widthValue/2), 0],
            extrapolate: 'clamp',
        });
        let opacity = this.state.swipeAnim.interpolate({
            inputRange: [-125, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        let bottomBorder = isLast ? {} : Object.assign({}, Style.card.cardItem.border_bottom);
        bottomBorder['borderBottomColor'] = this.state.theme.goalBorderColor;
        if (isSectionLast && isLast) {
            bottomBorder.borderBottomWidth = Style.borderWidth.borderWidth;
            bottomBorder.borderBottomColor = Color.light_black.colorHalf;
        }

        return (
            <View style={{backgroundColor: this.state.theme.goalBackgroundColor}}>
                <Swipeable style={{zIndex: 2}}
                           onPanAnimatedValueRef={(pan) => {
                               pan.addListener(Animated.event(
                                   // scrollX = e.nativeEvent.contentOffset.x
                                   [{x: this.state.swipeAnim}]
                               ))
                           }}
                           //ref={ref => {this.swipeRefs.push(ref)}}
                           onSwipeStart={() => {
                               this.props.disableScroll();
                           }}
                           onSwipeRelease={() => {
                               this.props.enableScroll();
                           }}
                           onLeftActionRelease={() => this.props.onGoalInfo(goal)}
                           leftContent={leftContent}
                           rightButtons={rightButtons}>
                    <TouchableHighlight onPress={() => this.props.openCreateSetModal(goal)} style={[bottomBorder, {backgroundColor: 'transparent', marginLeft: 20, marginRight: 0, paddingLeft: 0, height: 70}]}>
                        <View style={{flex: 1, flexDirection: 'row', marginLeft: 0, paddingLeft: 0}}>
                            <Left style={{flex: 1, alignItems: 'center'}}>
                                <View style={{alignSelf: 'stretch'}}>
                                    <Icon name="ios-add" style={[TileSectionStyle.smallTileSingle.overlay.icon, Style.touchColor]}/>
                                </View>
                            </Left>
                            <Body style={[{flex: 5, flexDirection: 'row', marginLeft: 15, alignItems: 'flex-start', alignSelf: 'center'}]}>
                                <View style={{flex: 3, justifyContent: 'center'}}>
                                    <Animated.View style={{right: titleRight, flex: 1, justifyContent: 'center'}}>
                                        <Text style={[Style.card.cardItem.text, {marginRight: 0, color: this.state.theme.textColor}]} numberOfLines={1}>
                                            { goal.exercise.name }
                                        </Text>
                                        {goal.exercise_variant && goal.exercise_variant.name && <Text style={[Style.card.cardItem.text_note, {color: this.state.theme.textNoteColor}]} numberOfLines={1}>{ goal.exercise_variant.name }</Text>}
                                    </Animated.View>
                                </View>
                                <Animated.View style={{flex: 2, alignItems: 'flex-start', alignSelf: 'center', opacity: opacity}}>
                                    {goal.required_type !== 'none' && percent < 1 && <Text style={[Style.card.cardItem.text_note, {color: this.state.theme.textNoteColor, marginRight: 20}]} numberOfLines={1}>Brakuje: { goal.required_amount - goal.done_this_circuit }</Text>}
                                    {goal.required_type !== 'none' && percent < 1 && <Text style={[Style.card.cardItem.text_note, {color: this.state.theme.textNoteColor, marginRight: 20}]} numberOfLines={1}>Typ: { I18n.t('planner.type.' + goal.required_type) }</Text>}
                                    {goal.required_type !== 'none' && percent >= 1 && <Text style={[Style.card.cardItem.text_note, {color: this.state.theme.textNoteColor, marginRight: 20}]} numberOfLines={1}>Cel osiągnięty!</Text>}
                                </Animated.View>
                            </Body>
                        </View>
                    </TouchableHighlight>
                </Swipeable>
                {goal.required_type !== 'none' && <Text note style={[Style.card.cardItem.text_note, {backgroundColor: 'transparent', left: textLeft, bottom: 0, position: 'absolute', fontSize: 10, color: this.state.theme.textNoteColor, zIndex: 2}]}>{ Math.round(percent * 100) }%</Text>}
                <View style={{width: percentWidth, height: 70, bottom: 0, position: 'absolute', backgroundColor: this.state.theme.goalPercentageLineBackground, zIndex: 1}}></View>
            </View>
        )
    }
}