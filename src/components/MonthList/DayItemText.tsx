import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text } from 'react-native';
import moment from 'moment';

import getStyle from './MonthList.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    opacity: Animated.Value;

    day: moment.Moment;
    currentMonth: moment.Moment;
};

class DayItemText extends React.Component<Props> {
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
            <Animated.View style={[style, { opacity: this.props.opacity }]}>
                <Text style={this.style.dayItem.text}>{this.props.day.format('D')}</Text>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayItemText);
