import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import moment = require('moment');

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    day: moment.Moment;
    currentMonth: moment.Moment;
};

class DayItem extends React.Component<Props> {
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
        const style = [this.style.dayItem.container];
        if (this.props.day.format('M') === this.props.currentMonth.format('M')) {
            style.push(this.style.dayItem.active);
        }

        return (
            <View style={style}>
                <Text style={this.style.dayItem.text}>{this.props.day.format('D')}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayItem);
