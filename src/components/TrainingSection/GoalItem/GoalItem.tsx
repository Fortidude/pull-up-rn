import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './GoalItem.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import HapticFeedback from 'src/service/Haptic';

import Goal from 'src/models/Goal';
import SwipeItem from 'src/components/SwipeItem';

import { ModalActions } from 'src/store/actions/modal';
import { PlannerActions } from 'src/store/actions/planner';
import moment from 'moment';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';
import GoalItemAddSet from './GoalItemAddSet';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
    plannerCustomMode: boolean;

    goal: Goal;
    goalToAddSetSelected: Goal | null;

    isToggled: boolean;
    onGoalClick?: () => void;
    toggleParentScroll?: (enable: boolean) => void;
    onMoveToSection?: (goalId: string, onPickCallback?: () => void, onDispatchCallback?: () => void) => void;
    onGoalClickOverride?: (goal: Goal) => void;
    onRightSwipe?: (goal: Goal) => void;
}

interface State {
    mockContent: boolean;
    animeteOut: boolean;
    goal: Goal;
}

class GoalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    unMounted = false;
    swipeItemRef: any;
    scrolling: boolean;
    swipeItemPosition = new Animated.Value(0);
    progressPercent = new Animated.Value(0);

    mockTranslateY = new Animated.Value(0);
    mockVisible = new Animated.Value(0);
    mockAnimateInProgress = false;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            mockContent: false,
            animeteOut: false,
            goal: Object.assign({}, props.goal)
        }
    }

    componentDidMount() {
        this.swipeItemPosition = this.swipeItemRef.getSwipePosition();
        this.animateProgress();

        /**
         * @TODO 
         * 
         * Goal data not animating on Swipe element pan responder.
         * Only after state update.
         */
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.plannerEditMode && !this.props.plannerEditMode) {
            setTimeout(() => {
                this.swipeItemRef.forceOpenRight();
            }, this.props.isToggled ? 0 : 400);
        } else if (!nextProps.plannerEditMode && this.props.plannerEditMode) {
            this.swipeItemRef.forceClose();
        }

        /**
         * ON CLOSE - ANIMATION CLOSE
         */
        if (this.state.mockContent && !this.mockAnimateInProgress
            && ((!nextProps.goalToAddSetSelected)
                || (nextProps.goalToAddSetSelected && nextProps.goalToAddSetSelected.id !== this.state.goal.id))
        ) {
            this.mockAnimateInProgress = true;
            this.props.toggleParentScroll && this.props.toggleParentScroll(true);
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(this.mockVisible, { toValue: 0, useNativeDriver: true }),
                    Animated.timing(this.mockTranslateY, { toValue: 0, duration: 400, useNativeDriver: true })
                ]).start(() => this.setState({ mockContent: false }, () => this.mockAnimateInProgress = false));
            }, 100);
        }
    }

    componentDidUpdate() {
        if (this.state.goal.doneThisCircuit !== this.props.goal.doneThisCircuit) {
            this.setState({ goal: Object.assign({}, this.props.goal) }, () => {
                this.animateProgress();
            });
        }
    }

    componentWillUnmount() {
        this.unMounted = true;
    }

    onAddSetPress = () => {
        if (this.props.onGoalClickOverride) {
            this.props.onGoalClickOverride(this.props.goal);
            return;
        }

        this.props.toggleParentScroll && this.props.toggleParentScroll(false);
        this.props.dispatch(PlannerActions.selectGoalToAddSet(this.props.goal));
        this.setState({ mockContent: true }, () => {
            //@ts-ignore
            this.refs.element.measure((x, y, width, height, windowX, windowY) => {
                Animated.parallel([
                    Animated.spring(this.mockTranslateY, { toValue: -windowY + HEADER_HEIGHT, useNativeDriver: true }),
                    Animated.timing(this.mockVisible, { toValue: 1, useNativeDriver: true })
                ]).start(() => this.props.onGoalClick && this.props.onGoalClick());
            });
        })
    }

    animateProgress = () => {
        const goal = this.props.goal;
        Animated.timing(this.progressPercent, {
            toValue: goal.requiredType !== 'none' ? (goal.doneThisCircuit / goal.requiredAmount) * 100 : 0,
            delay: 500
        }).start();
    }

    onMoveToOtherSection = () => {
        const onPickCallback = () => {
            if (!this.unMounted) {
                this.setState({ animeteOut: true });
            }
        }

        const onDispatchCallback = () => {
            if (!this.unMounted) {
                this.setState({ animeteOut: false });
            }
        }

        HapticFeedback('selection');
        if (this.props.onMoveToSection) {
            this.props.onMoveToSection(this.state.goal.id, onPickCallback, onDispatchCallback);
        }
    }

    onRemove = () => {
        const onSuccess = () => {
            this.props.dispatch(PlannerActions.removeGoal(this.state.goal.id));
        }
        const options = [I18n.t('buttons.remove')];
        HapticFeedback('selection');
        this.props.dispatch(ModalActions.pickerOpen(options, true, onSuccess))
    }

    onRightSwipeRelease = () => {
        this.setState({ animeteOut: true });

        //@ts-ignore
        this.refs.leftSwipeIconComponent.measure((x, y, width, height, windowX, windowY) => {
            if (!this.props.onRightSwipe) {
                this.props.dispatch(PlannerActions.selectGoal(this.props.goal));
                this.props.dispatch(ModalActions.goalInformationOpen(0, windowY));
            } else {
                this.props.onRightSwipe(this.props.goal);
            }

            this.setState({ animeteOut: false });
        })
    }

    render() {
        let { goal, mockContent } = this.state;
        const rightButtons = [
            <TouchableOpacity onPress={this.onMoveToOtherSection} style={[this.style.buttonReorderContainer]}>
                <Icon name="exchange-alt" solid={true} style={this.style.iconReorder} />
            </TouchableOpacity>,
            <TouchableOpacity onPress={this.onRemove} style={[this.style.buttonRemoveContainer]}>
                <Icon name="trash-alt" solid={true} style={this.style.iconRemove} />
            </TouchableOpacity>
        ];

        const leftSwipe = (
            <View style={this.style.showDetailsContainer}>
                <Icon name="info-circle" solid={true} style={this.style.iconShowDetails} />
            </View>
        );

        const leftSwipeReached = (
            <View ref="leftSwipeIconComponent" style={this.style.showDetailsContainer}>
                <Icon name="info-circle" solid={true} style={this.style.iconShowDetailsReached} />
            </View>
        );

        const summaryContent = this._getSummaryContent(goal);

        return (
            <SwipeItem style={this.style.swipeout}
                disable={this.state.mockContent}
                animateOut={this.state.animeteOut}
                ref={ref => this.swipeItemRef = ref}
                rightButtons={rightButtons}
                leftSwipe={leftSwipe}
                leftSwipeReached={leftSwipeReached}
                leftSwipeReleaseCallback={this.onRightSwipeRelease}
                onMoveBegin={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(false) : null}
                onMoveEnd={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(true) : null}
            >

                <View ref="element"></View>
                {!mockContent && <TouchableOpacity style={this.style.exerciseContainer} onPress={this.onAddSetPress}>
                    <View style={this.style.plusIconContainer}>
                        <View style={this.style.plusIconView}>
                            <EvilIcon name="close" color={this.props.theme.colors.main} size={42} />
                        </View>
                    </View>
                    {summaryContent}
                </TouchableOpacity>}

                {mockContent && <GoalItemAddSet
                    visibleAnimation={this.mockVisible}
                    summaryContentTranslateY={this.mockTranslateY}
                >
                    {summaryContent}
                </GoalItemAddSet>}
            </SwipeItem>
        );
    }

    _getSummaryContent = (goal: Goal) => {
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
            <View style={this.style.summaryContent}>
                <Animated.View style={[this.style.summaryLeftContent, { transform: [{ translateX: summaryContentLeft }] }]}>
                    <Text style={this.style.title}>{goal.exercise.name} </Text>
                    {!!goal.exercise.exerciseVariant.name && <Text style={this.style.subTitle}>{goal.exercise.exerciseVariant.name} </Text>}
                </Animated.View>
                <Animated.View style={[this.style.summaryRightContent, { opacity: opacityContentRight }]}>
                    <View style={this.style.infoTitleTopContainer}>
                        {goal.requiredType !== 'none' && <Text style={[this.style.infoTitleTop, { flex: 3 }]} numberOfLines={1}>{I18n.t(`planner.types.${goal.requiredType}`)}: </Text>}
                        {goal.requiredType === 'none' && <Text style={[this.style.infoTitleTop, { flex: 3 }]} numberOfLines={1}>{I18n.t(`planner.types.reps`)}: </Text>}
                        <Text style={[this.style.infoTitleTop, { flex: 2, textAlign: 'right' }]} numberOfLines={1}>
                            {this.props.goal.doneThisCircuit}
                            {!!this.props.goal.requiredAmount && <Text> / {this.props.goal.requiredAmount}</Text>}
                        </Text>
                    </View>
                    {false && <View style={this.style.infoTitleBottomContainer}>
                        <Text style={[this.style.infoTitleBottom, { flex: 1 }]}>{I18n.t('planner.type')}: </Text>
                        <Text style={[this.style.infoTitleBottom, { flex: 2, textAlign: 'right' }]} numberOfLines={1}>{I18n.t(`planner.types.${goal.requiredType}`)} </Text>
                    </View>}
                    <View style={this.style.infoTitleBottomContainer}>
                        {this.props.plannerCustomMode && <View style={this.style.infoTitleBottomContainerTimeAgo}>
                            <EvilIcon name="clock" size={this.props.theme.fonts.fontSize} color={this.props.theme.colors.subTextColor} />
                            <Text style={[this.style.infoTitleBottom, { textAlign: 'left', marginLeft: 5 }]} numberOfLines={1}>{moment.parseZone(this.props.goal.lastSetAdded).startOf('minute').fromNow()} </Text>
                        </View>}
                        {!this.props.plannerCustomMode && <View style={this.style.infoTitleBottomContainerTimeAgo}>
                            <EvilIcon name="tag" size={this.props.theme.fonts.fontSize} color={this.props.theme.colors.subTextColor} />
                            <Text style={[this.style.infoTitleBottom, { textAlign: 'left', marginLeft: 5 }]} numberOfLines={1}>{this.props.goal.trainingName.toLocaleLowerCase()} </Text>
                        </View>}
                    </View>
                </Animated.View>
                <Animated.View style={[this.style.progressBar, { width: progressWidth }]}></Animated.View>
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false,
    goalToAddSetSelected: state.planner.goalToAddSetSelected
});

export default connect(mapStateToProps)(GoalItem);
