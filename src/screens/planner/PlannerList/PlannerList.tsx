import React from 'react';
import { Dispatch } from 'redux';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import Data from '../../../api/data';
import GoalList from '../../../components/GoalList';
import Training from '../../../models/Training';

interface Props {
    dispatch: Dispatch;
}

interface State {
    trainings: Training[]
}

class PlannerList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            trainings: []
        }
    }

    async componentWillMount() {
        const planner = await Data.getPlannerByTrainings();
        this.setState({ trainings: planner.trainings });
    }

    render() {
        return (
            <FlatList
                data={this.state.trainings}
                renderItem={({ item, separators }) => (
                    <GoalList training={item} />
                )}
            />
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch
});

export default connect(mapStateToProps)(PlannerList);
