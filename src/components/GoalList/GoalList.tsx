import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import Styles from './GoalList.styles';
import GoalListHeader from './GoalListHeader';
import GoalItem from './GoalItem';
import Training from '../../models/Training';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    training: Training
}

class ExerciseList extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.exerciseListContainer}>
                <GoalListHeader name={this.props.training.name} />
                {this.props.training.goals.map((goal, key) =>
                    <GoalItem goal={goal} key={key} />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ExerciseList);
