import React from 'react';
import { Dispatch } from 'redux';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import getStyle from './PlannerList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { PlannerActions } from 'src/store/actions/planner';

import Planner from 'src/models/Planner';
import { GoalInterface } from 'src/models/Goal';

import GoalList from 'src/components/TrainingSection';
import EmptyList from 'src/components/TrainingSection/EmptyList';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    planner: Planner;
    plannerLoaded: boolean;
    plannerEditMode: boolean;
    goalSelected: GoalInterface | null;
    isOnline: boolean;
    isLogged: boolean;
    scrollBegin?: () => void;
}

interface State {
}

class PlannerList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    flatListReference: any;

    static defaultProps = {
        scrollBegin: () => { }
    }

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme)
        this.state = {}
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
    }

    render() {
        return (
            <View style={this.style.listContainer}>
                <FlatList
                    keyboardDismissMode={"interactive"}
                    keyboardShouldPersistTaps="never"
                    ref={(ref: any) => this.flatListReference = ref}
                    onScrollBeginDrag={this.props.scrollBegin}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    data={this.props.planner.trainings}
                    extraData={this.props.goalSelected}
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
    isOnline: state.app.isOnline,
    isLogged: state.auth.isLogged
});

export default connect(mapStateToProps)(PlannerList);
