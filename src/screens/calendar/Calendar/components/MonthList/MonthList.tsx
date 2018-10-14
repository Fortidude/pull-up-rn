import React from 'react';
import { Dispatch } from 'redux';
import { Animated, ScrollView, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment = require('moment');

import CalendarService from 'src/service/Calendar';

import Styles from './MonthList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { MONTH_ITEM_WIDTH } from 'src/components/FooterBar/CalendarFooter/MonthsBar.styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
}

interface State {
    months: moment.Moment[];
    currentMonthIndex: number;
}

class MonthList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    containerRef: ScrollView | null = null;
    scrollPosition = new Animated.Value(0);

    scrolling = false;
    scrollStartPosition: number;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        const { months, currentMonthIndex } = CalendarService.getMonthsList();
        this.state = {
            months,
            currentMonthIndex
        }

        CalendarService.swipePosition.addListener(({ value }) => {
            if (this.scrolling) {
                return;
            }

            const mathedValue = Math.round((value + MONTH_ITEM_WIDTH) / MONTH_ITEM_WIDTH) * SCREEN_WIDTH;
            this.scrollPosition.setValue(mathedValue);
            this.scrollTo(mathedValue);
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <ScrollView
                    ref={ref => this.containerRef = ref}
                    horizontal
                    onLayout={this._onScrollViewLayout}
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEnd}
                    onScrollBeginDrag={this._onScrollStart}
                    scrollEventThrottle={12}
                >
                    {this.state.months.map((month, key) => {
                        return (
                            <View key={key} style={this.style.monthItem.container}>
                                <Text style={this.style.monthItem.text}>{month.format('MMMM Y')}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }

    scrollTo = (position: number) => {
        if (this.containerRef) {
            this.containerRef.scrollTo({ x: position });
        }
    }

    scrollBarTo = (position: number) => {
        const rest = position % SCREEN_WIDTH;
        const mathedValue = (((position - rest) / SCREEN_WIDTH) + 1) * MONTH_ITEM_WIDTH - (MONTH_ITEM_WIDTH*2);
        CalendarService.swipePosition.setValue(mathedValue)
    }

    _onScroll = (event: any) => {
        const position = event.nativeEvent.contentOffset.x;
        this.scrollPosition.setValue(position);

        if (this.scrolling) {
            const mathedValue = this.countBarScrollToPosition(position);
            this.scrollBarTo(mathedValue);
        }
    }

    _onScrollStart = (event: any) => {
        this.scrolling = true;
        this.scrollStartPosition = event.nativeEvent.contentOffset.x
    }
    _onScrollEnd = (event: any) => {
        this.scrolling = false;
        if (this.scrollPosition._value !== CalendarService.swipePosition._value) {
            const position = event.nativeEvent.contentOffset.x;
            const mathedValue = this.countBarScrollToPosition(position);
            this.scrollBarTo(mathedValue);
        }
    }

    _onScrollViewLayout = () => {
        if (!this.containerRef) {
            return;
        }

        const xPosition = (this.state.currentMonthIndex - 1) * SCREEN_WIDTH;
        this.containerRef.scrollTo({ x: xPosition });
    }

    countBarScrollToPosition = (currentPosition: number) => {
        const rest = currentPosition % SCREEN_WIDTH;
        let mathedValue = currentPosition - rest;

        if ((currentPosition - (SCREEN_WIDTH * 0.15)) >= this.scrollStartPosition) {
            mathedValue = mathedValue + SCREEN_WIDTH;
        } else if (this.scrollStartPosition > currentPosition && this.scrollStartPosition < (currentPosition + (SCREEN_WIDTH * 0.15))) {
            mathedValue = mathedValue + SCREEN_WIDTH;
        }

        return mathedValue;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(MonthList);
