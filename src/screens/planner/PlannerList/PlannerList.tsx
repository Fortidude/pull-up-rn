import React from 'react';
import { Dispatch } from 'redux';
import { FlatList, Animated } from 'react-native';
import { connect } from 'react-redux';

import Data from '../../../api/data';
import GoalList from '../../../components/GoalList';
import Training from '../../../models/Training';

interface Props {
    dispatch: Dispatch;
    onScroll?: (position: number) => void;
}

interface State {
    trainings: Training[];
    scrollY: any;
}

class PlannerList extends React.Component<Props, State> {
    static defaultProps = {
        onScroll: (position: number) => { }
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            trainings: [],
            scrollY: new Animated.Value(0),
        }
    }

    async componentWillMount() {
        const planner = await Data.getPlannerByTrainings();
        this.setState({ trainings: planner.trainings });
    }

    render() {
        return (
            <FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                    {
                        listener: (event) => {
                            this.props.onScroll(event.nativeEvent.contentOffset.y);
                            //  const current = event.nativeEvent.contentOffset.y;
                            //  const height = this.state.predefined_trainings_height_max*2;
                            //  const endPosition = this.scrollEndPosition;
                            //  const directionUp = this.scrollEndVelocity > 0;
                        }
                    }
                )}
                showsVerticalScrollIndicator={false}
                data={this.state.trainings}
                renderItem={({ item, index }) => (
                    <GoalList training={item} isFirst={index === 0} />
                )}
            />
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch
});

export default connect(mapStateToProps)(PlannerList);
