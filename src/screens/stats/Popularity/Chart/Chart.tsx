import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { VictoryPie } from "victory-native";

import Styles from './Chart.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { StatisticsInterface } from 'src/models/Statistics';
import { Dimensions } from 'react-native';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

const HEIGHT = Dimensions.get('window').height - FOOTER_HEIGHT - HEADER_HEIGHT;
const CHART_SIZE = HEIGHT / 2;
interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    statistics: StatisticsInterface;
    palette: string[];
}

class Chart extends React.Component<Props> {
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

    getData = () => {
        const data: { x: number, y: number, }[] = [];
        let total = 0;
        this.props.statistics.percentage_sets_usage.usage.forEach((element) => {
            if (total > 60) {
                // return;element.
            }
            total = + element.percentage;
            data.push({
                x: element.percentage,
                y: element.percentage,
            })
        })

        return data;
    }

    render() {
        return (
            <VictoryPie
                width={CHART_SIZE} height={CHART_SIZE}
                data={this.props.statistics.percentage_sets_usage.usage}
                x={"percentage"}
                y={"percentage"}
                labelRadius={50}
                innerRadius={20}
                padAngle={2}
                colorScale={this.props.palette}
                style={{ data: { borderColor: 'red', borderWidth: 1 }, labels: this.style.label }}
            />
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    statistics: state.planner.statistics
});

export default connect(mapStateToProps)(Chart);
