import React from 'react'
import PropTypes from 'prop-types';
import { View, Animated, TouchableHighlight } from 'react-native';
import { Text, Card, Input, Button, Item, SwipeRow, Left, Body, Right, Icon } from 'native-base';

import Spinner from './Spinner';
import CreateSetModal from './CreateSet.modal';
import SwipeResponder from './SwipeResponder';
import I18n from './../Translations/translations';

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
const swipeRowStyle = Style.planner.list.swipe_row;

class QuickSet extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,
        planner: PropTypes.object,

        close: PropTypes.func
    };

    static defaultProps = {
        isVisible: false,

        onDismiss: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            max_width: Style.widthValue * (2/3),
            max_height: Style.heightValue * (2/3),
            width: new Animated.Value(0),
            height: new Animated.Value(0),
            opacity: new Animated.Value(0),

            create_set_modal: false,
            create_set_goal: null
        };

        this.runAnimation(props);
    }

    componentWillReceiveProps(nextProps) {
        this.runAnimation(nextProps);
    }

    componentDidMount() {
        if (!this.props.planner.loaded) {
            this.props.dispatchLoadPlanner();
        }
    }

    runAnimation(props) {
        if (props.isVisible === this.props.isVisible) {
            return;
        }

        let widthValue = 0;
        let widthDelay = 0;

        let heightValue = 0;
        let heightDelay = 100;

        let opacityValue = 0;

        if (props.isVisible) {
            widthValue = this.state.max_width;
            heightValue = this.state.max_height;
            heightDelay = 0;
            widthDelay = 100;
            opacityValue = 1;
        }

        Animated.parallel([
            Animated.timing(this.state.width, {
                toValue: widthValue,
                duration: 150,
                delay: widthDelay
            }),
            Animated.timing(this.state.opacity, {
                toValue: opacityValue,
                duration: 150,
            }),
            Animated.timing(this.state.height, {
                toValue: heightValue,
                duration: 150,
                delay: heightDelay
            })
        ]).start()
    }

    closeCreateSetModal = () => this.setState({create_set_modal: false, create_set_goal: null});
    createSet = (goal, value) => {
        let type = goal.required_type === 'none' ? 'reps' : goal.required_type;
        let payload = {goal: goal.id, data: new Date()};
        payload[type] = value;

        this.props.dispatchCreateSet(payload);
        this.closeCreateSetModal();
    };

    close() {
        if (this.props.close) {
            this.props.close();
        }
    }

    render() {
        let goals = [];

        if (typeof this.props.planner.planner.today !== 'undefined') {
            goals = this.props.planner.planner.today;
        } else {
            Object.keys(this.props.planner.planner).forEach(key => {
                if (this.props.planner.planner[key].length > 0) {
                    goals = this.props.planner.planner[key];
                }
            });
        }

        if (goals.length > 5) {
            goals.length = 5;
        }

        return (
            <Animated.View style={{position: 'absolute', right: 10, bottom: 60, opacity: this.state.opacity, height: this.state.height, width: this.state.width, borderColor: Color.purple.colorHalf, borderWidth: Style.borderWidth.borderWidth, borderRadius: 25, backgroundColor: Color.black.color}}>
                <SwipeResponder allowVertical={true} onDown={() => this.close()} onLeft={() => this.close()}>
                <View style={{flex: 1, paddingTop: 0, paddingBottom: 0}}>
                    {goals.map((goal, key) => {
                        return (<View key={key} style={[swipeRowStyle.body.container]}>
                            <Body style={[swipeRowStyle.body.body, {flex: 2,alignItems: 'flex-start', backgroundColor: 'transparent'}]}>
                                <Text style={[Style.card.cardItem.text, {textAlign: 'left'}]}>{ goal.exercise.name } {goal.exercise_variant.name && <Text style={[Style.card.cardItem.text_note]}>• { goal.exercise_variant.name }</Text>}</Text>
                                <View style={{flexDirection:"row"}}>
                                    {goal.required_type !== 'none' &&
                                    <Text style={[{flex: 1}, Style.card.cardItem.text_note]}>
                                        { goal.done_this_circuit } / { goal.required_amount } { goal.required_type === 'time' ? 'minut' : goal.required_type }
                                    </Text>
                                    }
                                    {goal.required_type === 'none' &&
                                    <Text style={[{flex: 1}, Style.card.cardItem.text_note]}>
                                        { goal.done_this_circuit }
                                    </Text>
                                    }
                                    {goal.last_set_value > 0 &&
                                    <Text style={[{flex: 1}, Style.card.cardItem.text_note]}>
                                        • ostatnio: { goal.last_set_value }
                                    </Text>
                                    }
                                </View>
                            </Body>
                            <Right style={[swipeRowStyle.body.right, {flex: 1}]}>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    style={{backgroundColor: 'transparent'}}
                                    activeOpacity={0.5}
                                    onPress={_ => this.setState({create_set_modal: true, create_set_goal: goal})}
                                >
                                    <View>
                                        <Icon name="ios-add-circle-outline" style={[{fontSize: 40}, Style.touchColor]}/>
                                    </View>
                                </TouchableHighlight>
                            </Right>
                        </View>)
                    })}

                    <CreateSetModal
                        isVisible={this.state.create_set_modal}
                        goal={this.state.create_set_goal}
                        cancel={this.closeCreateSetModal.bind(this)}
                        createSet={this.createSet.bind(this)}
                    />
                </View>
                </SwipeResponder>
            </Animated.View>
        );
    }
}

import {connect} from 'react-redux';
import {createSet, loadPlanner} from '../Store/Planner/planner.actions';

function mapStateToProps (state) {
    return {
        planner: state.planner
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLoadPlanner: (refresh = false) => {dispatch(loadPlanner(refresh))},
        dispatchCreateSet: (payload) => {dispatch(createSet(payload))},
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(QuickSet)