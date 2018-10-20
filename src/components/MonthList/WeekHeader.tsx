import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import data from 'src/api/data';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};
class WeekHeader extends React.Component<Props> {
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
            <View style={[this.style.weekItem.container, this.style.weekItem.headerContainer]}>
                {this.renderDays()}
            </View>
        );
    }

    renderDays = () => {
        var startOfWeek = moment().startOf('isoWeek');
        var endOfWeek = moment().endOf('isoWeek');

        var days = [];
        var day = startOfWeek;

        while (day <= endOfWeek) {
            days.push(
                <View key={day.format('D')} style={this.style.dayName.container}>
                    <Text style={this.style.dayName.text}>{day.format('ddd')}</Text>
                </View>
            );
            day = day.clone().add(1, 'd');
        }

        return days;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(WeekHeader);
