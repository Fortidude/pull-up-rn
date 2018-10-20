import React from 'react';
import { Dispatch } from 'redux';
import { Animated, ScrollView, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import CalendarService from 'src/service/Calendar';

import Styles from './MonthList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { MONTH_ITEM_WIDTH } from 'src/components/FooterBar/CalendarFooter/MonthsBar.styles';
import WeekLine from './WeekLine';
import Spinner from 'src/components/Spinner/Spinner';
import Events from 'src/service/Events';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
}

interface State {
    months: moment.Moment[];
    monthElements: React.ReactFragment[];
    currentMonthIndex: number;
    activeMonthIndex: number;
}

class MonthList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    containerRef: ScrollView | null = null;
    scrollPosition = new Animated.Value(0);

    scrolling = false;
    scrollStartPosition: number;

    unmounting = false;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        const { months, currentMonthIndex } = CalendarService.getMonthsList();
        this.state = {
            months,
            currentMonthIndex,
            activeMonthIndex: currentMonthIndex,
            monthElements: []
        }

        CalendarService.swipePosition.addListener(({ value }) => {
            if (this.scrolling) {
                return;
            }

            const mathedValue = Math.round((value + MONTH_ITEM_WIDTH) / MONTH_ITEM_WIDTH) * SCREEN_WIDTH;
            this.scrollPosition.setValue(mathedValue);

            this.addMonthToListIfNotExist(mathedValue);
            this.scrollTo(mathedValue);
        });
    }

    componentWillMount() {
        Events.listenTo('footer_bar_animation_in_finished', 'month_list', () => {
            if (!this.unmounting) {
                this.setState({ monthElements: this.createMonthComponents(this.state.months, this.state.currentMonthIndex) })
            }
        });
    }

    componentWillUnmount() {
        this.unmounting = true;
        Events.remove('footer_bar_animation_in_finished', 'month_list');
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                {this.state.monthElements.length === 0 && <Spinner color={this.props.theme.colors.main} large />}
                {this.state.monthElements.length > 0 && <ScrollView
                    showsHorizontalScrollIndicator={false}
                    ref={ref => this.containerRef = ref}
                    horizontal
                    onLayout={this._onScrollViewLayout}
                    onScroll={this._onScroll}
                    onScrollEndDrag={this._onScrollEnd}
                    onScrollBeginDrag={this._onScrollStart}
                    scrollEventThrottle={12}
                >
                    {this.state.monthElements.map((elements, key) => (
                        <View key={key} style={this.style.monthItem.container}>
                            {elements}
                        </View>
                    ))}

                </ScrollView>}
            </View>
        );
    }

    /**
     * @todo
     * 
     * scroll fast, element not rendered
     */
    createMonthComponents = (moments: moment.Moment[], currentMonthIndex: number) => {
        let months: React.ReactFragment[] = [];
        moments.map((month, key) => {

            const index = key + 1;
            const renderThisMonth = index - 1 <= currentMonthIndex && index + 1 >= currentMonthIndex;

            if (renderThisMonth) {
                const calendar = this.getMonthCalendar(month);
                months[key] = calendar.map((week, key) => {
                    return <WeekLine key={key} week={week} currentMonth={month} />
                })
            } else {
                //@ts-ignore
                months[key] = null;
            }
        })

        return months;
    }

    /**
     * @todo
     * 
     * scroll fast, element not rendered
     */
    getMonthCalendar = (month: moment.Moment) => {
        const startWeek = month.startOf('month').week();
        let endWeek = month.endOf('month').week();
        if (startWeek > endWeek) {
            endWeek = 53;
        }

        const calendar: moment.Moment[] = [];
        for (var week = startWeek; week <= endWeek; week++) {
            calendar.push(moment().week(week));
        }

        return calendar;
    }

    scrollTo = (position: number) => {
        if (this.containerRef) {
            this.containerRef.scrollTo({ x: position });
        }
    }

    scrollBarTo = (position: number) => {
        const rest = position % SCREEN_WIDTH;
        const mathedValue = (((position - rest) / SCREEN_WIDTH) + 1) * MONTH_ITEM_WIDTH - (MONTH_ITEM_WIDTH * 2);
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

        const position = event.nativeEvent.contentOffset.x;

        //@ts-ignore
        if (this.scrollPosition._value !== CalendarService.swipePosition._value) {
            const mathedValue = this.countBarScrollToPosition(position);
            this.scrollBarTo(mathedValue);
        }
    }

    _onScrollViewLayout = () => {
        if (!this.containerRef) {
            return;
        }

        const xPosition = (this.state.currentMonthIndex - 1) * SCREEN_WIDTH;
        this.containerRef.scrollTo({ x: xPosition, animated: false });
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

    addMonthToListIfNotExist = (position: number) => {
        const monthIndex = Math.round(position / SCREEN_WIDTH);
        const monthElements = this.state.monthElements;

        const renderIfNotRendered = (index: number) => {
            if (this.state.monthElements[index] === null) {
                const calendar = this.getMonthCalendar(this.state.months[index]);
                monthElements[index] = calendar.map((week, key) => {
                    return <WeekLine key={key} week={week} currentMonth={this.state.months[index]} />
                });
                this.setState({ monthElements: monthElements });
            }
        }

        renderIfNotRendered(monthIndex + 1);
        renderIfNotRendered(monthIndex - 1);
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(MonthList);
