import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import getStyle from './../Stats.styles';
import Header from './Header';
import Set from 'src/models/Set';
import SetBarChart from 'src/components/Charts/SetBarChart/SetBarChart';

interface Props {
    dispatch: Dispatch,
    theme: ThemeInterface,
};

interface State {
    sets: Set[];
}

class Progress extends Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = getStyle(this.props.theme);
        this.state = {
            sets: []
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    onFilter = (sets: Set[]) => {
        this.setState({ sets });
    }

    render() {
        return (
            <View style={this.style.container}>
                <Header onFilter={this.onFilter} />
                
                <View style={[ this.style.progressContainer]}>
                    <SetBarChart big sets={this.state.sets}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    exerciseToFilter: state.exercise.exercisesToFilter
});

export default connect(mapStateToProps)(Progress);
