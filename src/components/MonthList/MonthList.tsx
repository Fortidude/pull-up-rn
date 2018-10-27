import React from 'react';
import { Dispatch } from 'redux';
import { Animated, ScrollView, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import CalendarService from 'src/service/Calendar';

import Styles from './MonthList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { MONTH_ITEM_WIDTH } from 'src/components/FooterBar/CalendarFooter/MonthsBar.styles';
import Spinner from 'src/components/Spinner/Spinner';
import { PlannerActions } from 'src/store/actions/planner';
import Month from './Month';
import Events from 'src/service/Events';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    onDayClick: (...arg: any) => void;
}

interface State {
    months: moment.Moment[];
    monthElements: React.ReactFragment[];
    currentMonthIndex: number;
    activeMonthIndex: number;

    loading: boolean;
}

class MonthList extends React.PureComponent<Props, State> {
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
            monthElements: [],
            loading: true
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

    init = async () => {
        this.setState({ monthElements: this.createMonthComponents(this.state.months, this.state.currentMonthIndex) }, () => {
            const { months, currentMonthIndex } = CalendarService.getMonthsList();
            const fromDate = months[0].startOf('month');
            const toDate = months[currentMonthIndex].endOf('month');
            this.props.dispatch(PlannerActions.loadSetsByDatePeriod(fromDate, toDate));
        });
    }

    componentWillMount() {
    }

    componentDidMount() {
        /**
         * @TODO
         * OLD CODE, leave for now
         */
        // Events.listenTo('footer_bar_animation_in_finished', 'month_list', () => {
        //     if (!this.unmounting) {
        //     //    this.setState({ monthElements: this.createMonthComponents(this.state.months, this.state.currentMonthIndex) })
        //     }
        // });
    }

    componentWillUnmount() {
        this.unmounting = true;
        //Events.remove('footer_bar_animation_in_finished', 'month_list');
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    monthsAreActive = () => {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    goToCurrentMonth = (animated: boolean = true) => {
        if (!this.containerRef) {
            return;
        }
        
        const currentMonthPosition = (this.state.currentMonthIndex) * SCREEN_WIDTH;
        this.scrollBarTo(currentMonthPosition);
    }

    render() {
        const activeMonth = this.state.months[this.state.activeMonthIndex] || null;
        const currentMonthIsActive = this.state.currentMonthIndex === this.state.activeMonthIndex;
        return (
            <View style={this.style.container} onLayout={this.init}>
                {activeMonth && !this.state.loading &&
                    <View style={this.style.header}>
                        <Text style={this.style.title}>
                            {activeMonth.format('MMMM')[0].toLocaleUpperCase()}{activeMonth.format('MMMM').substring(1)}
                        </Text>
                        {!currentMonthIsActive && <TouchableOpacity style={this.style.todayButton.container} onPress={() => this.goToCurrentMonth()}>
                            <Text style={this.style.todayButton.text}>Today</Text>
                        </TouchableOpacity>}
                    </View>
                }

                {this.state.loading && <View style={{ position: 'absolute' }}><Spinner color={this.props.theme.colors.main} large /></View>}
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
                    {this.state.monthElements.map((monthElement, key) => {
                        if (monthElement) {
                            return monthElement;
                        }

                        return <Month key={key} empty />
                    })}
                </ScrollView>}
            </View>
        );
    }

    /**
     * @todo
     * 
     * scroll fast, element not rendered
     * 
     * 
     * @todo refactor
     * Empty Months are rendering on render(), while non-empty here...
     */
    createMonthComponents = (moments: moment.Moment[], currentMonthIndex: number) => {
        let months: React.ReactFragment[] = [];
        moments.map((month, key) => {

            const renderThisMonth = key - 1 <= currentMonthIndex && key + 1 >= currentMonthIndex;

            if (renderThisMonth) {
                const calendar = this.getMonthCalendar(month);
                months[key] = <Month key={key} onLayout={this.monthsAreActive} weeks={calendar} onDayClick={this.props.onDayClick} currentMonth={month} />
            } else {
                //@ts-ignore
                //
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
            if (endWeek === 53) {
                calendar.push(moment().week(week));
            } else {
                calendar.push(moment().week(week).year(month.year()));
            }
        }

        return calendar;
    }

    scrollTo = (position: number) => {
        if (this.containerRef) {
            this.containerRef.scrollTo({ x: position });
            const activeMonthIndex = Math.round(position / SCREEN_WIDTH);
            this.setState({ activeMonthIndex });
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
        this.goToCurrentMonth(false);
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
            if (this.state.monthElements[index] === null && !this.unmounting) {
                const calendar = this.getMonthCalendar(this.state.months[index]);
                monthElements[index] = <Month
                    key={index}
                    weeks={calendar}
                    onDayClick={this.props.onDayClick}
                    currentMonth={this.state.months[index]} />;

                this.setState({ monthElements: monthElements });
                this.forceUpdate();
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
