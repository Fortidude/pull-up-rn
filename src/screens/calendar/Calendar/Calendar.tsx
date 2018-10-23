import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';

import getStyle from './Calendar.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import MonthList from 'src/components/MonthList/MonthList';
import DayModalItem from 'src/components/MonthList/DayModal/DayModalItem';
import moment = require('moment');
import { number } from 'prop-types';
import Events from 'src/service/Events';
import { OPEN_MODAL_ANIMATION_OPTION, CLOSE_MODAL_ANIMATION_OPTION } from 'src/components/ModalManager/ModalManager';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};

interface State {
    day: moment.Moment | null;
    positionX: number;
    positionY: number;
    openProgress: Animated.Value;
}

class Calendar extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            day: null,
            positionX: 0,
            positionY: 0,
            openProgress: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidMount() {
        Events.listenTo('HEADER_ON_CLOSE_BUTTON', 'Calendar', this.closeDayItem);
    }

    componentWillUnmount() {
        Events.remove('HEADER_ON_CLOSE_BUTTON', 'Calendar');
    }

    openDayItem = (day: moment.Moment, positionX: number, positionY: number) => {
        this.setState({ day, positionX, positionY }, () => {
            Events.emit('FOOTER_BAR_CLOSE');
            Events.emit('HEADER_CALENDAR_SHOW_CLOSE_BUTTON');
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                useNativeDriver: true,
                ...OPEN_MODAL_ANIMATION_OPTION
            }).start();
        })
    }

    closeDayItem = () => {
        Events.emit('FOOTER_BAR_OPEN');
        Events.emit('HEADER_CALENDAR_HIDE_CLOSE_BUTTON');
        Animated.timing(this.state.openProgress, {
            toValue: 0,
            useNativeDriver: true,
            ...CLOSE_MODAL_ANIMATION_OPTION
        }).start(() => {
            this.setState({ day: null });
        });
    }

    render() {
        return (
            <View style={this.style.container}>
                <MonthList onDayOpen={this.openDayItem} />

                <DayModalItem
                    positionX={this.state.positionX}
                    positionY={this.state.positionY}
                    openProgress={this.state.openProgress}
                    onClose={this.closeDayItem}
                    day={this.state.day}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Calendar);
