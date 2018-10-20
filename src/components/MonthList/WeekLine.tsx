import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment';

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import DayItem from './DayItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    week: moment.Moment;
    currentMonth: moment.Moment;
};
class WeekLine extends React.Component<Props> {
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
        return (
            <View style={this.style.weekItem.container}>
                {this.renderDays()}
            </View>
        );
    }

    renderDays = () => {
        const days = [];
        let startDate = this.props.week.startOf('week');
        for (let i = 0; i < 7; i++) {
            days.push(
                <DayItem key={i} day={moment(startDate).add(i, 'days')} currentMonth={this.props.currentMonth} />
            );
        }
        return days;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(WeekLine);
