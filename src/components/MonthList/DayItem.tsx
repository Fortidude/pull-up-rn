import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View, Animated } from 'react-native';

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
    scale = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidMount() {
        Animated.timing(this.scale, {
            toValue: 1,
            delay: parseInt(this.props.day.format('D')) * 30,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    render() {
        const style = [this.style.dayItem.container];
        if (this.props.day.format('M') === this.props.currentMonth.format('M')) {
            style.push(this.style.dayItem.active);
        }

        return (
            <Animated.View style={[style, { opacity: this.scale }]}>
                <Text style={this.style.dayItem.text}>{this.props.day.format('D')}</Text>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayItem);
