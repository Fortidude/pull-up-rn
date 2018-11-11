import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, Animated, TouchableHighlight } from 'react-native';
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


interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;

    goal: Goal;

    isToggled: boolean;
    toggleParentScroll?: (enable: boolean) => void,

    onMoveToSection: (goalId: string, onPickCallback?: () => void, onDispatchCallback?: () => void) => void;
}

interface State {
    animeteOut: boolean;
    goal: Goal;
}

class GoalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    scrolling: boolean;
    swipeItemPosition = new Animated.Value(0);
    progressPercent = new Animated.Value(0);
    swipeItemRef: any;

    unMounted = false;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
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
        this.props.onMoveToSection(this.state.goal.id, onPickCallback, onDispatchCallback);
    }

    onRemove = () => {
        const onSuccess = () => {
            this.props.dispatch(PlannerActions.removeGoal(this.state.goal.id));
        }
        const options = [I18n.t('buttons.remove')];
        HapticFeedback('selection');
        this.props.dispatch(ModalActions.pickerOpen(options, true, onSuccess))
    }

    render() {
        let goal = this.state.goal;
        const rightButtons = [
            <TouchableOpacity onPress={this.onMoveToOtherSection} style={[this.style.buttonReorderContainer]}>
                <Icon name="exchange-alt" solid={true} style={this.style.iconReorder} />
            </TouchableOpacity>,
            <TouchableOpacity onPress={this.onRemove} style={[this.style.buttonRemoveContainer]}>
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
                animateOut={this.state.animeteOut}
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
                                <View style={this.style.infoTitleBottomContainerTimeAgo}>
                                    <EvilIcon name="clock" size={this.props.theme.fonts.fontSize} color={this.props.theme.colors.subTextColor} />
                                    <Text style={[this.style.infoTitleBottom, { textAlign: 'left', marginLeft: 5 }]} numberOfLines={1}>{moment.parseZone(this.props.goal.lastSetAdded).startOf('minute').fromNow()} </Text>
                                </View>
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
