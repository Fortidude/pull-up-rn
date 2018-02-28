import React from 'react'
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Animated } from 'react-native';
import { Button, Icon, Body, Left, Right, Text, SwipeRow } from 'native-base';

import I18n from './../../../Translations/translations';
import Spinkit from './../../../Components/Spinner';
import TextLetterSpacing from './../../../Components/TextWithLetterSpacing';
import Swipeable from 'react-native-swipeable';

import Style from './../../../Styles/style';
import Color from './../../../Styles/color';

const swipeRowStyle = Style.planner.list.swipe_row;

export default class ListSection extends React.Component {
    swipeRefs = [];

    static propTypes = {
        sectionName: PropTypes.string,
        goals: PropTypes.array,
        shouldBeToggled: PropTypes.bool,
        simpleAnimation: PropTypes.bool,
        plannerCustomMode: PropTypes.bool,

        onGoalEdit: PropTypes.func,
        onGoalRemove: PropTypes.func,
        onCreateSet: PropTypes.func,
        onGoalCreateForSection: PropTypes.func,

        editMode: PropTypes.bool
    };

    static defaultProps = {
        goals: [],
        shouldBeToggled: false,
        simpleAnimation: false,

        onGoalEdit: (goal, currentSection) => alert('clicked on edit'),
        onGoalRemove: (goal) => alert('clicked on remove'),
        onCreateSet: (goal) => alert('clicked on create set')
    };

    constructor(props) {
        super(props);

        this.state = {
            toggled: this.props.shouldBeToggled,
            amount: 0,
            header_height: 0,
            height: 0,
            anim_height: null
        }
    }

    componentWillMount() {
        this.initSection(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.swipeRefs.forEach(ref => {
            if (ref && (ref._root !== null)) {
                ref._root.closeRow();
            }
        });

        this.initSection(nextProps, true);

        if (nextProps.editMode) {
            this.swipeRefs.forEach(ref => {
                if (ref && (ref._root !== null)) {
                    ref._root.manuallySwipeRow(50);
                }
            });
        }
    }

    initSection(props, afterMounted = false) {
        let headerHeight = 50;
        let amount = props.goals.length;
        let height = (amount * 80) + headerHeight;

        if (props.editMode && this.props.sectionName !== 'other') {
            height += 80;
        }

        let state = {
            amount: amount,
            header_height: headerHeight,
            height: height
        };

        if (!afterMounted) {
            state['toggled'] = props.shouldBeToggled;
            state['anim_height'] = new Animated.Value(props.shouldBeToggled ? height : headerHeight);
        }

        this.setState(state, () => {
            if (afterMounted) {
                let toValue = this.state.toggled ? height : headerHeight;

                if (this.props.simpleAnimation) {
                    Animated.timing(this.state.anim_height, {
                        toValue: toValue,
                        duration: 300,
                    }).start();
                } else {
                    Animated.spring(this.state.anim_height, {
                        toValue: toValue,
                        duration: 300,
                    }).start();
                }
            }
        });
    }

    toggleSection() {
        let toValue = this.state.height;
        if (this.state.toggled) {
            toValue = this.state.header_height;
        }
        this.setState({toggled: !this.state.toggled});

        if (this.props.simpleAnimation) {
            Animated.timing(this.state.anim_height, {
                toValue: toValue,
                duration: 300,
            }).start();
        } else {
            Animated.spring(this.state.anim_height, {
                toValue: toValue,
                duration: 300,
            }).start();
        }
    }

    renderListItem(goal, key, sectionName) {
        let percent = 0;
        if (goal.required_type !== 'none') {
            percent = Style.widthValue * (goal.done_this_circuit / goal.required_amount);
        }

        return (
           <SwipeRow key={key}
                     ref={ref => {this.swipeRefs.push(ref)}}
                     style={swipeRowStyle.container}
                     leftOpenValue={this.props.plannerCustomMode ? 50 : 0}
                     rightOpenValue={-75}
                      left={
                          this.props.plannerCustomMode && <Button transparent onPress={() => this.props.onGoalEdit(goal, sectionName)}>
                              {!goal.loading && <View style={{flexDirection: 'row', marginLeft: 25}}>
                                <Icon active name="ios-arrow-round-down" style={[Style.touchColor, {marginRight: 0}]}/>
                                <Icon active name="ios-arrow-round-up" style={[Style.touchColor, {marginLeft: 0}]}/>
                              </View>}
                              {goal.loading && <View style={{flexDirection: 'row', marginLeft: 20}}>
                                  <Spinkit size={30}/>
                              </View>}
                          </Button>
                      }
                     body={
                          <View style={swipeRowStyle.body.container}>
                              <Body style={[swipeRowStyle.body.body, {zIndex: 2, backgroundColor: 'transparent'}]}>
                              <Text style={Style.card.cardItem.text}>{ goal.exercise.name } {goal.exercise_variant.name && <Text style={[Style.card.cardItem.text_note]}>• { goal.exercise_variant.name }</Text>}</Text>
                              <View style={{flexDirection:"row"}}>
                                  {goal.required_type !== 'none' &&
                                  <Text note style={[{flex: 1}, Style.card.cardItem.text]}>
                                      { goal.done_this_circuit } / { goal.required_amount } { goal.required_type === 'time' ? 'minut' : goal.required_type }
                                  </Text>
                                  }
                                  {goal.required_type === 'none' &&
                                  <Text note style={[{flex: 1}, Style.card.cardItem.text]}>
                                      { goal.done_this_circuit }
                                  </Text>
                                  }
                                  {goal.last_set_value > 0 &&
                                  <Text note style={[{flex: 1}, Style.card.cardItem.text]}>
                                      • ostatnio: { goal.last_set_value }
                                  </Text>
                                  }
                              </View>
                              </Body>
                              <Right style={[swipeRowStyle.body.right, {zIndex: 2}]}>
                                  <TouchableHighlight
                                      underlayColor="transparent"
                                      style={{backgroundColor: 'transparent'}}
                                      activeOpacity={0.5}
                                      onPress={_ => this.props.onCreateSet(goal)}
                                  >
                                      <View>
                                          <Icon name="ios-add-circle-outline" style={[{fontSize: 40}, Style.touchColor]}/>
                                      </View>
                                  </TouchableHighlight>
                              </Right>
                              <View style={{width: percent, height: 80, top: 0, position: 'absolute', backgroundColor: Color.light_black_03.color, zIndex: 1}}></View>
                          </View>
                     }
                      right={
                          <Button transparent onPress={() => this.props.onGoalRemove(goal.id)}>
                              <Icon active name="trash" style={{color: Color.red.color}}/>
                          </Button>
                      }
           />
        )
    }

    renderAddGoal(key, sectionName) {
        return (
            <SwipeRow key={key}
                          style={swipeRowStyle.container}
                          leftOpenValue={0}
                          rightOpenValue={0}
                          body={
                              <View style={swipeRowStyle.body.container}>

                                      <TouchableHighlight
                                          underlayColor="transparent"
                                          style={[{backgroundColor: 'transparent', alignContent: 'center', justifyContent: 'center', flex: 1, height: 80}]}
                                          activeOpacity={0.5}
                                          onPress={_ => this.props.onGoalCreateForSection(sectionName)}
                                      >
                                          <Text style={Style.card.cardItem.text_blue}>Dodaj kolejne do "{ sectionName }"</Text>
                                      </TouchableHighlight>

                              </View>
                          }
            />
        )
    }

    renderSectionHeader(key) {
        let sectionName = key === 'other' ? I18n.t('planner.sections.other') : key;
        if (!this.props.plannerCustomMode) {
            sectionName = I18n.t('planner.sections.' + key);
        }

        return (
            <Button key={key} full
                    onPress={() => this.toggleSection()}
                    style={Style.planner.section.button}>
                <Left style={{flex: 3}}>
                    <TextLetterSpacing left spacing={0.5} textStyle={[Style.card.text_header, {alignSelf: 'flex-start'}]}>{ sectionName }</TextLetterSpacing>
                </Left>
                <Body style={{flex: 1}}>
                </Body>
                <Right style={{flex: 1}}>
                    {this.state.toggled && this.state.amount > 0 && <Icon name="arrow-down" style={{color: Color.grey.color}}/>}
                    {!this.state.toggled && this.state.amount > 0 && <Icon name="arrow-back" style={Style.touchColor}/>}
                    {this.state.amount === 0 && <Icon name="arrow-back" style={{color: Color.grey.colorHalf}}/>}
                </Right>
            </Button>
        )
    }

    renderList() {
        let view = [];

        if (this.props.plannerCustomMode && this.props.goals.length === 0 && this.props.sectionName === 'other') {
            return null;
        }

        view.push(this.renderSectionHeader(this.props.sectionName));
        this.props.goals.forEach((goal, key) => {
            if (goal) {
                view.push(this.renderListItem(goal, this.props.sectionName + key, this.props.sectionName));
            }
        });

        if (this.props.editMode && this.props.sectionName !== 'other') {
            view.push(this.renderAddGoal(view.length + 1, this.props.sectionName));
        }

        return view;
    }

    render() {
        let list = this.renderList();
        if (!list) {
            return null;
        }

        return (
            <Animated.View key={this.props.sectionName} style={{height: this.state.anim_height, overflow: 'hidden', elevation: 0}}>
                { list }
            </Animated.View>
        );
    }
}