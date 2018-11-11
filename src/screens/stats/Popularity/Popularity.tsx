import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import getStyle from './../Stats.styles';
import Chart from './Chart/Chart';
import { StatisticsInterface } from 'src/models/Statistics';
import ListItem from './ListItem/ListItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    statistics: StatisticsInterface;
};

class Popularity extends Component<Props> {
    palette = [
        "#C0392B",
        "#9B59B6",
        "#2980B9",
        "#1ABC9C",
        "#F1C40F",
        "#E67E22",
        "#808B96",
        "#D98880"
    ];

    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = getStyle(this.props.theme);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        const colorLength = this.palette.length;
        return (
            <View style={[this.style.container, this.style.popularityContainer]}>
                <View style={this.style.popularity.listContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.props.statistics.percentage_sets_usage.usage.map((item, key) => {
                            const color = this.palette[key] ? this.palette[key] : this.palette[key - colorLength];
                            return (<ListItem key={key} name={item.name} percent={item.percentage} color={color} />)
                        })}
                    </ScrollView>
                </View>
                <View style={this.style.popularity.chartContainer}>
                    <Chart palette={this.palette} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    statistics: state.planner.statistics
});

export default connect(mapStateToProps)(Popularity);
