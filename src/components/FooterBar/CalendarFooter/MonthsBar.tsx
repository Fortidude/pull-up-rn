import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import CalendarService from 'src/service/Calendar';

import Styles, { MONTH_ITEM_WIDTH } from './MonthsBar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import MonthItem from './MonthItem';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SET_ACTION_FROM_X = (SCREEN_WIDTH / 2) - MONTH_ITEM_WIDTH;
const SCROLL_MARGIN = SET_ACTION_FROM_X + (MONTH_ITEM_WIDTH / 2);

interface Props {
    onLayout?: () => void;
    dispatch: Dispatch;
    theme: ThemeInterface;
}

interface State {
    now: moment.Moment;
    months: moment.Moment[],
    currentMonthIndex: number;
}

class MonthsBar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    containerRef: ScrollView | null = null;
    scrollPosition = new Animated.Value(0);

    scrolling = false;

    constructor(props: Props) {
        super(props);

        const { months, currentMonthIndex } = CalendarService.getMonthsList();

        this.style = Styles(this.props.theme);
        this.state = {
            now: moment(),
            months,
            currentMonthIndex
        }

        CalendarService.swipePosition.addListener(({ value }) => {
            if (this.scrolling) {
                return;
            }

            this.scrollPosition.setValue(value);
            this.scrollTo(value);
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    onMonthPress = (key: number) => {
        const to = (key-1) * MONTH_ITEM_WIDTH;
        const position = this.scrollPosition._value; 

        if (to < position) {
            this.scrollTo(position - MONTH_ITEM_WIDTH);
        } else {
            this.scrollTo(position + MONTH_ITEM_WIDTH);
        }
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <ScrollView
                    horizontal
                    ref={ref => this.containerRef = ref}
                    onLayout={this._onScrollViewLayout}
                    scrollEventThrottle={12}
                    showsHorizontalScrollIndicator={false}
                    contentInset={{ left: SCROLL_MARGIN, right: SCROLL_MARGIN }}
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEnd}
                    onScrollBeginDrag={this._onScrollStart}
                >
                    {this.state.months.map((month, key) => <MonthItem
                        onPress={() => this.onMonthPress(key)}
                        key={key}
                        date={month}
                        now={this.state.now}
                        activeOffsetXFrom={SET_ACTION_FROM_X}
                        activeOffsetXTo={SET_ACTION_FROM_X + MONTH_ITEM_WIDTH}
                        scrollPosition={this.scrollPosition}
                    />)}
                </ScrollView>
            </View>
        );
    }

    scrollTo = (position: number) => {
        if (!this.containerRef) {
            return;
        }

        let rest = (position) % MONTH_ITEM_WIDTH;
        if (rest <= 12) {
            rest += MONTH_ITEM_WIDTH;
        }

        let to = 0;
        const maxEnd = (this.state.months.length - 1) * MONTH_ITEM_WIDTH - SCROLL_MARGIN;

        // SCROLL TO THIRD OR HIGHER POSITION
        if (position > 0) {
            if (position > maxEnd) {
                to = maxEnd;
            } else {
                to = position - rest - (SCROLL_MARGIN - MONTH_ITEM_WIDTH) + MONTH_ITEM_WIDTH;
            }
            // SCROLL TO SECOND POSITION
        } else if (position > -(SET_ACTION_FROM_X)) {
            to = -SET_ACTION_FROM_X + (MONTH_ITEM_WIDTH / 2);
            // SCROLL TO FIRST POSITION
        } else {
            to = -SCROLL_MARGIN
        }

        this.containerRef.scrollTo({ x: to });

        if (to !== CalendarService.swipePosition._value) {
            CalendarService.swipePosition.setValue(to)
        }
    }

    _onScroll = (event: any) => this.scrollPosition.setValue(event.nativeEvent.contentOffset.x);
    _onScrollEnd = (event: any) => {
        this.scrolling = false;
        if (!this.containerRef) {
            return;
        }

        const position = event.nativeEvent.contentOffset.x;
        this.scrollTo(position);
    }
    _onScrollStart = () => {
        this.scrolling = true;
    }

    _onScrollViewLayout = () => {
        if (!this.containerRef) {
            return;
        }

        const offset = (SCREEN_WIDTH - (MONTH_ITEM_WIDTH * 3)) / 2
        const xPosition = ((this.state.currentMonthIndex - 2) * MONTH_ITEM_WIDTH) - offset;
        this.containerRef.scrollTo({ x: xPosition });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(MonthsBar);
