import React from 'react';
import { Dispatch } from 'redux';
import { FlatList, Animated, View } from 'react-native';
import { connect } from 'react-redux';

import Data from '../../../api/data';
import GoalList from '../../../components/GoalList';
import getStyle from './PlannerList.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Planner from '../../../models/Planner';
import { PlannerActions } from '../../../store/actions/planner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    planner: Planner;
    plannerLoaded: boolean;
    onScroll?: (position: number) => void;
}

interface State {
    scrollY: any;
}

class PlannerList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    static defaultProps = {
        onScroll: (position: number) => { }
    }

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme)
        this.state = {
            scrollY: new Animated.Value(0),
        }
    }

    async componentWillMount() {
        if (!this.props.plannerLoaded) {
            this.props.dispatch(PlannerActions.loadByTrainings());
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.listContainer}>
                <FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        {
                            listener: (event) => {
                                this.props.onScroll(event.nativeEvent.contentOffset.y);
                            }
                        }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    data={this.props.planner.trainings}
                    renderItem={({ item, index }) => (
                        <GoalList training={item} isFirst={index === 0} />
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
    plannerLoaded: state.planner.loadedByTrainings,
});

export default connect(mapStateToProps)(PlannerList);
