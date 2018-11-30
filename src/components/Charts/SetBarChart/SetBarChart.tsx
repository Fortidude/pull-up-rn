import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Styles, { BIG_HEIGHT, SMALL_HEIGHT } from './SetBarChart.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { SetInterface, sortSetsByDate } from 'src/models/Set';
import SingleBar from './SingleBar';
import moment from 'moment';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    sets: SetInterface[];
    big?: boolean;
}

interface State {
    activeSetKey: number | null;
}

class SetBarChart extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme, this.props.big);
        this.state = {
            activeSetKey: null
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme, nextProps.big);
        }
    }

    onClick = (key: number) => {
        this.setState({ activeSetKey: key });
    }

    getDate = (set: SetInterface): string => {
        const today = moment();
        const date = moment(set.date);
        const diff = date.diff(today, 'days');
        if (diff > -2) {
            return date.calendar();
        }

        if (diff > -7) {
            return `${date.fromNow()}, ${date.format('hh:mm')}`;
        }

        return date.format('LLL');
    }

    render() {
        this.props.sets.sort(sortSetsByDate);

        let maxValue = 0;
        let maxWeight = 0;

        this.props.sets.forEach((set: SetInterface) => {
            maxValue = set.value && set.value > maxValue ? set.value : maxValue;
            maxWeight = set.weight && set.weight > maxWeight ? set.weight : maxWeight;
        })

        return (
            <View style={this.style.container}>
                {this.state.activeSetKey === null && <Text style={this.style.hourText}>Wybierz słupek, aby zobaczyć godzinę</Text>}
                {this.state.activeSetKey !== null &&
                    <Text style={this.style.hourText}>
                        {this.getDate(this.props.sets[this.state.activeSetKey])}
                    </Text>
                }
                <ScrollView horizontal style={this.style.scrollContainer}>
                    {this.props.sets.map((set: SetInterface, key: number) =>
                        <SingleBar
                            key={key}
                            index={key}
                            big={this.props.big}
                            maxValue={maxValue}
                            maxWeight={maxWeight}
                            onClick={this.onClick}
                            active={this.state.activeSetKey === key}
                            set={set} />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(SetBarChart);
