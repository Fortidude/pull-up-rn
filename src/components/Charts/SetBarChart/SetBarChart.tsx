import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles from './SetBarChart.styles';
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

        this.props.sets.sort(sortSetsByDate);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme, nextProps.big);
        }

        this.props.sets.sort(sortSetsByDate);
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
        let maxValue = 0;
        let maxWeight = 0;

        this.props.sets.forEach((set: SetInterface) => {
            let setValue: number = set.value || set.reps || set.time || 0;

            maxValue = setValue > maxValue ? setValue : maxValue;
            maxWeight = set.weight && set.weight > maxWeight ? set.weight : maxWeight;
        })

        let prevSetDay = '';
        return (
            <View style={this.style.container}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                {this.state.activeSetKey === null && <Text style={this.style.hourText}>{ I18n.t('mics.pick_bar_to_check_time')}</Text>}
                {this.state.activeSetKey !== null &&
                    <Text style={this.style.hourText}>
                        {this.getDate(this.props.sets[this.state.activeSetKey])}
                    </Text>
                }
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={this.style.scrollContainer}>
                    {this.props.sets.map((set: SetInterface, key: number) => {
                        const setDay = moment(set.date).format('DM');
                        let isDayEnd = prevSetDay !== '' && setDay !== prevSetDay;
                        prevSetDay = setDay;
                        return (
                            <SingleBar
                                key={key}
                                index={key}
                                big={this.props.big}
                                maxValue={maxValue}
                                maxWeight={maxWeight}
                                isDayEnd={isDayEnd}
                                onClick={this.onClick}
                                active={this.state.activeSetKey === key}
                                set={set} />
                        )
                    })}
                </ScrollView>
                {this.props.big && <View style={this.style.legend.container}>
                    <Text style={this.style.legend.textEasy}>Łatwy</Text>
                    <Text style={this.style.legend.textMedium}>Średni</Text>
                    <Text style={this.style.legend.textHard}>Trudny</Text>
                    <Text style={this.style.legend.textTitle}>Poziom trudności</Text>
                </View>}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(SetBarChart);
