import React from 'react';
import { Dispatch } from 'redux';
import { Animated, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import getStyle from './PlannerList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { PlannerActions } from 'src/store/actions/planner';

import Planner from 'src/models/Planner';
import { GoalInterface } from 'src/models/Goal';

import GoalList from 'src/components/TrainingSection';
import EmptyList from 'src/components/TrainingSection/EmptyList';
import Spinner from 'src/components/Spinner/Spinner';
import { ExerciseActions } from 'src/store/actions/exercise';

import PlannerListPlaceholder from '../PlannerListPlaceholder';
import User from 'src/models/User';

import GoalCreateSetModal from 'src/components/ModalManager/FullScreenModals/GoalCreateSetModal';
import GoalInformationModal from 'src/components/ModalManager/FullScreenModals/GoalInformationModal';
import Events from 'src/service/Events';

import { CLOSE_MODAL_ANIMATION_OPTION, OPEN_MODAL_ANIMATION_OPTION_SLOW } from 'src/components/ModalManager/ModalManager';
import { ModalActions } from 'src/store/actions/modal';


interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    planner: Planner;
    plannerLoaded: boolean;
    plannerEditMode: boolean;
    plannerLoading: boolean;
    user: User;
    goalSelected: GoalInterface | null;
    isOnline: boolean;
    isLogged: boolean;
    addSetModalVisible: boolean;
    scrollBegin?: () => void;
}

interface State {
    scrollY: Animated.Value;
    readyToRefresh: boolean;
    refreshing: boolean;

    temp: boolean;

    modalCreateSetOpenProgress: Animated.Value;
    modalInformationOpenProgress: Animated.Value;

    modalPositionX: number;
    modalPositionY: number;
    modalGoalId: string;
}

const MIN_PULLDOWN_DISTANCE = -120;
class PlannerList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    flatListReference: any;

    static defaultProps = {
        scrollBegin: () => { }
    }

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme)
        this.state = {
            scrollY: new Animated.Value(0),
            refreshing: false,
            readyToRefresh: false,
            temp: true,

            modalCreateSetOpenProgress: new Animated.Value(0),
            modalInformationOpenProgress: new Animated.Value(0),
            modalPositionX: 0,
            modalPositionY: 0,
            modalGoalId: ''
        };

        // setTimeout(() => {
        //     this.setState({temp: false});
        // }, 4000);
    }

    componentWillMount() {
        if (!this.props.plannerLoaded && this.props.isOnline) {
            this.loadPlanner();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!nextProps.isLogged) {
            return;
        }

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        if (nextProps.isOnline && !nextProps.plannerLoaded) {
            this.loadPlanner();
        }

        if (this.state.refreshing && !nextProps.plannerLoading) {
            this.flatListReference.getScrollResponder().scrollTo({ y: 0 });
            setTimeout(() => {
                this.setState({ refreshing: false });
            }, 500);
        }
    }

    handleRelease = () => {
        //@ts-ignore
        if (this.state.scrollY._value > MIN_PULLDOWN_DISTANCE) {
            return;
        }

        this.flatListReference.getScrollResponder().scrollTo({ y: MIN_PULLDOWN_DISTANCE + 20 });
        this.setState({ refreshing: true }, () => {
            this.refresh();
        })
    }

    refresh = () => {
        this.props.dispatch(ExerciseActions.loadExercises());
        this.loadPlanner();
    }

    loadPlanner = () => {
        // this.props.dispatch(PlannerActions.loadByTrainings());
        this.props.dispatch(PlannerActions.loadPlanner());
    }

    onGoalSwipeRelease = (goalId: string, positionX: number, positionY: number) => {
        this.setState({ modalGoalId: goalId, modalPositionX: positionX, modalPositionY: positionY }, () => {
            this.openModal(this.state.modalInformationOpenProgress);
        });
    }

    onGoalClick = (positionX: number, positionY: number) => {
        // this.setState({ modalPositionX: positionX, modalPositionY: positionY }, () => {
        //     this.openModal(this.state.modalCreateSetOpenProgress);
        // });
    }

    openModal = (animatedValue: Animated.Value) => {
        Events.emit('FOOTER_BAR_CLOSE');
        Events.emit('FULLSCREEN_MODAL_VISIBLE');
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            ...OPEN_MODAL_ANIMATION_OPTION_SLOW
        }).start();
    }

    closeModal = () => {
        Events.emit('FOOTER_BAR_OPEN');
        Events.emit('FULLSCREEN_MODAL_HIDDEN');
        Animated.parallel([
            Animated.timing(this.state.modalInformationOpenProgress, {
                toValue: 0,
                useNativeDriver: true,
                ...CLOSE_MODAL_ANIMATION_OPTION
            }),
            Animated.timing(this.state.modalCreateSetOpenProgress, {
                toValue: 0,
                useNativeDriver: true,
                ...CLOSE_MODAL_ANIMATION_OPTION
            })
        ]).start();
    }

    render() {
        const event = Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        y: this.state.scrollY
                    }
                }
            }
        ])

        const refreshIndicatorWidth = this.state.scrollY.interpolate({
            inputRange: [MIN_PULLDOWN_DISTANCE, 0],
            outputRange: ['100%', '0%'],
            extrapolate: 'clamp'
        });

        const backgroundColor = this.state.scrollY.interpolate({
            inputRange: [MIN_PULLDOWN_DISTANCE, MIN_PULLDOWN_DISTANCE + 2],
            outputRange: [this.props.theme.colors.danger, this.props.theme.colors.main],
            extrapolate: 'clamp'
        });

        const indicatorOpacity = this.state.scrollY.interpolate({
            inputRange: [MIN_PULLDOWN_DISTANCE / 4, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        let firstFound = false;

        return (
            <React.Fragment>
                {!this.state.refreshing && <Animated.View style={[this.style.refreshingProgressBar, { backgroundColor: backgroundColor, width: refreshIndicatorWidth }]}></Animated.View>}
                {this.state.refreshing && <Animated.View style={[this.style.refreshingIndicator, { opacity: indicatorOpacity }]}><Spinner /></Animated.View>}
                <View style={this.style.listContainer}>
                    {(!this.props.plannerLoaded || !this.props.user) && <PlannerListPlaceholder theme={this.props.theme} />}
                    {this.props.plannerLoaded && !!this.props.user && <FlatList
                        keyboardDismissMode={"interactive"}
                        keyboardShouldPersistTaps="never"
                        ref={(ref: any) => this.flatListReference = ref}
                        onScrollBeginDrag={this.props.scrollBegin}
                        onScroll={event}
                        onResponderRelease={this.handleRelease}
                        scrollEventThrottle={10}
                        showsVerticalScrollIndicator={false}
                        data={this.props.planner.trainings}
                        extraData={[this.props.goalSelected, this.props.planner.trainings]}
                        ListFooterComponent={<View style={this.style.listFooterComponent}></View>}
                        ListEmptyComponent={<EmptyList />}
                        renderItem={({ item, index }) => {
                            let isFirst = item.goals.length > 0 && (index === 0 || !firstFound);
                            if (isFirst) {
                                firstFound = true;
                            }

                            return <GoalList
                                toggleParentScroll={(enable: boolean) => {
                                    this.flatListReference.getScrollResponder().setNativeProps({ scrollEnabled: enable })
                                }}
                                onGoalSwipeRelease={this.onGoalSwipeRelease}
                                onGoalClick={this.onGoalClick}
                                training={item}
                                isFirst={isFirst} />
                        }}
                    />}

                    <GoalInformationModal
                        positionX={this.state.modalPositionX}
                        positionY={this.state.modalPositionY}
                        openProgress={this.state.modalInformationOpenProgress}
                        goalId={this.state.modalGoalId}
                        onClose={this.closeModal}
                    />

                    {/* <GoalCreateSetModal
                        positionX={this.state.modalPositionX}
                        positionY={this.state.modalPositionY}
                        openProgress={this.state.modalCreateSetOpenProgress}
                        goalId={this.state.modalGoalId}
                        onClose={() => {
                            this.props.dispatch(ModalActions.addSetClose());
                            this.closeModal();
                        }}
                    /> */}
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    planner: state.planner.planner,
    goalSelected: state.planner.goalSelected,
    plannerEditMode: state.app.plannerEditMode,
    plannerLoaded: state.planner.loadedPlanner,
    plannerLoading: state.planner.loading,
    user: state.user.current,
    isOnline: state.app.isOnline,
    isLogged: state.auth.isLogged,
    addSetModalVisible: state.modal.addSetModalVisible
});

export default connect(mapStateToProps)(PlannerList);
