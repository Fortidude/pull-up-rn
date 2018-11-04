import React from 'react';
import { Dispatch } from 'redux';
import { Animated, FlatList, View } from 'react-native';
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

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    planner: Planner;
    plannerLoaded: boolean;
    plannerEditMode: boolean;
    plannerLoading: boolean;
    goalSelected: GoalInterface | null;
    isOnline: boolean;
    isLogged: boolean;
    scrollBegin?: () => void;
}

interface State {
    scrollY: Animated.Value;
    readyToRefresh: boolean;
    refreshing: boolean;
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
            readyToRefresh: false
        };
    }

    componentWillMount() {
        if (!this.props.plannerLoaded && this.props.isOnline) {
            this.props.dispatch(PlannerActions.loadByTrainings());
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
            this.props.dispatch(PlannerActions.loadByTrainings());
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
        this.props.dispatch(PlannerActions.loadByTrainings());
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

        const isEmpty = true;// this.props.planner.trainings.length === 0;

        return (
            <React.Fragment>
                {!this.state.refreshing && <Animated.View style={[this.style.refreshingProgressBar, { backgroundColor: backgroundColor, width: refreshIndicatorWidth }]}></Animated.View>}
                {this.state.refreshing && <Animated.View style={[this.style.refreshingIndicator, { opacity: indicatorOpacity }]}><Spinner /></Animated.View>}
                <View style={this.style.listContainer}>
                    <FlatList
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
                        renderItem={({ item, index }) => (
                            <GoalList
                                toggleParentScroll={(enable: boolean) => {
                                    this.flatListReference.getScrollResponder().setNativeProps({ scrollEnabled: enable })
                                }}
                                training={item}
                                isFirst={index === 0} />
                        )}
                    />
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    planner: state.planner.byTrainings,
    goalSelected: state.planner.goalSelected,
    plannerEditMode: state.app.plannerEditMode,
    plannerLoaded: state.planner.loadedByTrainings,
    plannerLoading: state.planner.loading,
    isOnline: state.app.isOnline,
    isLogged: state.auth.isLogged
});

export default connect(mapStateToProps)(PlannerList);
