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
        const style = [this.style.dayItem.container];
        const densityContainerStyle = [];
        const densityTextStyle = []
        if (this.props.day.format('M') === this.props.currentMonth.format('M')) {
            style.push(this.style.dayItem.active);
        }

        if (this.props.numberOfSets > 0) {
            densityTextStyle.push(this.style.dayItem.mediumDensityText);
            densityContainerStyle.push(this.style.dayItem.mediumDensityOfSets);
        }

        return (
            <Animated.View style={[style, { opacity: this.props.opacity }]}>
                <Animated.View style={densityContainerStyle}>
                    <Text style={[this.style.dayItem.text, densityTextStyle]}>{this.props.day.format('D')}</Text>
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
