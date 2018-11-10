import React from 'react';
import { View, Keyboard, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import Styles from './DateTimeInput.styles';
import { ModalActions } from 'src/store/actions/modal';
import { Dispatch } from 'redux';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    placeholder?: string;
    value?: string;

    style?: {};

    date: Date
    onChange: (date: Date) => void;

    format?: string | null
}

class DateTimeInput extends React.Component<Props> {
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

    openDatetimePicker = () => {
        Keyboard.dismiss();
        this.props.dispatch(ModalActions.datetimePickerOpen(this.props.date, (date: Date) => {
            this.props.onChange(date);
        }));
    }

    render() {
        const date = moment(this.props.date);
        const formattedDate = this.props.format ? date.format(this.props.format) : date.calendar();

        return (
            <TouchableOpacity style={[this.style.dateContainer, this.props.style]} onPress={this.openDatetimePicker}>
                <Text style={this.style.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DateTimeInput);
