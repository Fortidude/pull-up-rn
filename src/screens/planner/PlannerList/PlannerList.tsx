import React from 'react';
import { Dispatch } from 'redux';
import { FlatList, Animated, View } from 'react-native';
import { connect } from 'react-redux';

import GoalList from '../../../components/GoalList';
import getStyle from './PlannerList.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Planner from '../../../models/Planner';
import { PlannerActions } from '../../../store/actions/planner';
import { GoalInterface } from '../../../models/Goal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    planner: Planner;
    plannerLoaded: boolean;
    goalSelected: GoalInterface | null;
    isOnline: boolean;
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
        if (!this.props.plannerLoaded) {
            this.props.dispatch(PlannerActions.loadByTrainings());
        }
    }

    componentWillReceiveProps(nextProps: Props) {
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
                    ref={ref => this.flatListReference = ref}
                    onScrollBeginDrag={this.props.scrollBegin}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    data={this.props.planner.trainings}
                    extraData={this.props.goalSelected}
                    renderItem={({ item, index }) => (
                        <GoalList
                            toggleParentScroll={(enable) => {
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
    plannerLoaded: state.planner.loadedByTrainings,
    isOnline: state.app.isOnline
});

export default connect(mapStateToProps)(PlannerList);
