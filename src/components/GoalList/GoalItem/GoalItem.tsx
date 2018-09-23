import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, Animated, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './GoalItem.styles';
import I18n from '../../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Goal from '../../../models/Goal';
import SwipeItem from '../../SwipeItem';
import { ModalActions } from '../../../store/actions/modal';
import { PlannerActions } from '../../../store/actions/planner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;

    goal: Goal;

    isToggled: boolean;
    toggleParentScroll?: (enable: boolean) => void,
}

interface State {
    goal: Goal
}

class GoalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    scrolling: boolean;
    swipeItemPosition = new Animated.Value(0);
    progressPercent = new Animated.Value(0);
    swipeItemRef: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            goal: Object.assign({}, props.goal)
        }
    }

    componentDidMount() {
        // @ts-ignore
        this.swipeItemRef.getSwipePosition().addListener(({ value }) => {
            this.swipeItemPosition.setValue(value);
        });

        this.animateProgress();
    }

    componentWillReceiveProps(nextProps: Props) {

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.plannerEditMode && !this.props.plannerEditMode) {
            setTimeout(() => {
                this.swipeItemRef.forceOpenRight();
            }, this.props.isToggled ? 0 : 300);
        } else if (!nextProps.plannerEditMode && this.props.plannerEditMode) {
            this.swipeItemRef.forceClose();
        }
    }

    componentDidUpdate() {
        if (this.state.goal.doneThisCircuit !== this.props.goal.doneThisCircuit) {
            this.setState({ goal: Object.assign({}, this.props.goal) }, () => {
                this.animateProgress();
            });
        }
    }

    onAddSetPress = () => {
        this.props.dispatch(PlannerActions.selectGoal(this.props.goal));
        this.props.dispatch(ModalActions.addSetOpen());
    }

    animateProgress = () => {
        const goal = this.props.goal;
        Animated.timing(this.progressPercent, {
            toValue: goal.requiredType !== 'none' ? (goal.doneThisCircuit / goal.requiredAmount) * 100 : 0,
            delay: 300
        }).start();
    }

    render() {
        let goal = this.state.goal;
        const rightButtons = [
            <TouchableOpacity style={[this.style.buttonReorderContainer]}>
                <Icon name="exchange-alt" solid={true} style={this.style.iconReorder} />
            </TouchableOpacity>,
            <TouchableOpacity style={[this.style.buttonRemoveContainer]}>
                <Icon name="trash-alt" solid={true} style={this.style.iconRemove} />
            </TouchableOpacity>
        ];

        const summaryContentLeft = this.swipeItemPosition.interpolate({
            inputRange: [-100, 0],
            outputRange: [50, 0],
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp'
        });

        const opacityContentRight = this.swipeItemPosition.interpolate({
            inputRange: [-140, -100, 0],
            outputRange: [0.2, 0.5, 1],
            extrapolate: 'clamp'
        });

        const progressWidth = this.progressPercent.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '110%'],
            extrapolate: 'clamp'
        })

        return (
            <SwipeItem style={this.style.swipeout}
                ref={ref => this.swipeItemRef = ref}
                rightButtons={rightButtons}
                onMoveBegin={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(false) : null}
                onMoveEnd={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(true) : null}
            >
                <TouchableOpacity style={this.style.exerciseContainer} onPress={this.onAddSetPress}>
                    <View style={this.style.plusIconContainer}>
                        <View style={this.style.plusIconView}>
                            <EvilIcon name="close" color={this.props.theme.colors.main} size={42} />
                        </View>
                    </View>
                    <View style={this.style.summaryContent}>
                        <Animated.View style={[this.style.summaryLeftContent, { left: summaryContentLeft }]}>
                            <Text style={this.style.title}>{goal.exercise.name} </Text>
                            {!!goal.exercise.exerciseVariant.name && <Text style={this.style.subTitle}>{goal.exercise.exerciseVariant.name} </Text>}
                        </Animated.View>
                        <Animated.View style={[this.style.summaryRightContent, { opacity: opacityContentRight }]}>
                            <View style={this.style.infoTitleTopContainer}>
                                <Text style={[this.style.infoTitleTop, { flex: 3 }]}>{I18n.t('planner.done_of')}: </Text>
                                <Text style={[this.style.infoTitleTop, { flex: 2, textAlign: 'right' }]} numberOfLines={1}>
                                    {this.props.goal.doneThisCircuit}
                                    {!!this.props.goal.requiredAmount && <Text> / {this.props.goal.requiredAmount}</Text>}
                                </Text>
                            </View>
                            <View style={this.style.infoTitleBottomContainer}>
                                <Text style={[this.style.infoTitleBottom, { flex: 1 }]}>{I18n.t('planner.type')}: </Text>
                                <Text style={[this.style.infoTitleBottom, { flex: 2, textAlign: 'right' }]} numberOfLines={1}>{I18n.t(`planner.types.${goal.requiredType}`)} </Text>
                            </View>
                        </Animated.View>
                        <Animated.View style={[this.style.progressBar, { width: progressWidth }]}></Animated.View>
                    </View>
                </TouchableOpacity>
            </SwipeItem>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(GoalItem);
