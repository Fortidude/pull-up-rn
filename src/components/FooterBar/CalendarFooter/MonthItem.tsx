import React from 'react';
import { Dispatch } from 'redux';
import { Text, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Styles from './MonthsBar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Events from 'src/service/Events';
import Button from '../Button/Button';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onPress: () => void;

    now: moment.Moment;
    date: moment.Moment;

    activeOffsetXFrom: number;
    activeOffsetXTo: number;
    scrollPosition: Animated.Value;
}

interface State {
    isActive: boolean;
}

class MonthItem extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidMount() {
        setTimeout(this.ifActiveSetItActive, 0);
        this.props.scrollPosition.addListener(() => {
            this.ifActiveSetItActive();
        })
    }

    render() {
        const monthStyles = [this.style.monthItem.monthYear];
        if (this.state.isActive) {
            monthStyles.push(this.style.monthItem.monthYearActive);
        }

        return (
            <TouchableOpacity onPress={this.props.onPress} ref="container" style={this.style.monthItem.container}>
                <Text style={this.style.monthItem.yearText}>{this.props.date.format('Y')}</Text>
                <Text style={monthStyles}>{this.props.date.format('MMMM')}</Text>
            </TouchableOpacity>
        );
    }

    ifActiveSetItActive = () => {
        //@ts-ignore
        if (!this.refs.container || !this.refs.container.measure) {
            return;
        }

        //@ts-ignore
        this.refs.container.measure((x, y, width, height, windowX, windowY) => {
            const active = (windowX > this.props.activeOffsetXFrom && windowX < this.props.activeOffsetXTo);
            if (!this.state.isActive && active) {
                this.setState({ isActive: true });
            } else if (this.state.isActive && !active) {
                this.setState({ isActive: false });
            }

            //if (!this.state.isActive && active) {

            // }
        });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(MonthItem);
