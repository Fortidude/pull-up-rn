import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text } from 'react-native';
import moment from 'moment';

import getStyle from './Day.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    opacity: Animated.Value;

    day: moment.Moment;
    currentMonth: moment.Moment;
    numberOfSets: number;
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
        const containerStyle = [this.style.dayItem.container];
        const textContainerStyle = [];
        const TextStyle = [];
        let isToday = false;
        if (this.props.day.format('M') === this.props.currentMonth.format('M')) {
            containerStyle.push(this.style.dayItem.active);
        }

        if (this.props.day.format('DMY') === moment().format('DMY')) {
            isToday = true;
        }

        if (this.props.numberOfSets > 0) {
            TextStyle.push(this.style.dayItem.mediumDensityText);
            textContainerStyle.push(this.style.dayItem.mediumDensityOfSets);
        }

        return (
            <Animated.View style={[containerStyle, { opacity: this.props.opacity }]}>
                <Animated.View style={textContainerStyle}>
                    <Text style={[this.style.dayItem.text, TextStyle]}>{this.props.day.format('D')}</Text>
                    {isToday && <Text style={this.style.dayItem.subText}>TODAY</Text>}
                </Animated.View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayItemText);
