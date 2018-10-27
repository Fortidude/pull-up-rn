import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Styles from './Month.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import Week from './../Week';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    weeks?: moment.Moment[];
    currentMonth?: moment.Moment;

    empty?: boolean;

    onDayClick?: (...arg: any) => void;
    onLayout?: () => any;
}

class Month extends React.Component<Props> {
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

    build = () => {
        const { weeks, currentMonth, onDayClick } = this.props;
        if (!weeks || !currentMonth || !onDayClick) {
            return;
        }

        const month = [<Week.Header key={'week'} />];
        weeks.forEach((week, key) => {
            month.push(<Week.Line
                key={key}
                week={week}
                currentMonth={currentMonth}
                onDayClick={onDayClick}
            />);
        })

        return month;
    }

    onLayout = () => {
        if (this.props.onLayout) {
            this.props.onLayout();
        }
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.onLayout}>
                {!this.props.empty && this.build()}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Month);
