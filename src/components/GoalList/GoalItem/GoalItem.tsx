import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Styles from './GoalItem.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Goal from '../../../models/Goal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    goal: Goal;
}

class ExerciseItem extends React.Component<Props> {
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
            <View style={this.style.exerciseContainer}>
                <Text>{this.props.goal.exercise.name}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ExerciseItem);
