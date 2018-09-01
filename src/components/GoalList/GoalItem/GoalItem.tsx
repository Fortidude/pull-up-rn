import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

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
                <TouchableOpacity style={this.style.plusIconContainer}>
                    <View style={this.style.plusIconView}>
                        <EvilIcon name="close" color={this.props.theme.colors.main} size={42} />
                    </View>
                </TouchableOpacity>
                <View style={this.style.summaryContent}>
                    <View style={this.style.summaryLeftContent}>
                        <Text style={this.style.title}>{this.props.goal.exercise.name}</Text>
                        <Text style={this.style.subTitle}>Weight / Sets</Text>
                    </View>
                    <View style={this.style.summaryRightContent}>
                        <Text style={this.style.infoTitleTop}>Typ: 5x5</Text>
                        <Text style={this.style.infoTitleBottom}>Brakuje: 2 sety</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ExerciseItem);
