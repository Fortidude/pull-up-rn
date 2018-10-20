import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';
import moment from 'moment';

import getStyle from './Calendar.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import MonthList from './components/MonthList/MonthList';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
};

interface State {}

class Calendar extends React.Component<Props, State> {
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

    componentDidMount() {
    }

    render() {
        return (
            <View style={this.style.container}>
                <MonthList />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Calendar);