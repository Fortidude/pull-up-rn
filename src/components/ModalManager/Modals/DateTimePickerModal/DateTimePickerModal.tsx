import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
//@ts-ignore
import DatePicker from 'react-native-date-picker';


import Styles from './DateTimePickerModal.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';

import I18n from 'src/assets/translations';
import ModalFooter from '../../ModalFooter/ModalFooter';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    options: [];
    cancelButton: boolean;
    callback: (date: Date) => void;
}

interface State {
    date: Date
}

class DateTimePickerModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            date: new Date()
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    success = () => {
        this.props.callback(this.state.date);
        this.closeModal();
    }

    today = () => {
        this.setState({ date: new Date() }, this.success);
    }

    closeModal = () => {
        this.props.dispatch(ModalActions.datetimePickerClose());
    }

    render() {
        return (
            <View style={this.style.container}>
                <DatePicker
                    date={this.state.date}
                    onDateChange={(date: Date) => this.setState({ date })}
                    textColor={this.props.theme.colors.textColor}
                    maximumDate={new Date()}
                    locale={I18n.locale}
                />
                <ModalFooter loading={false}
                    successText={I18n.t('buttons.ok')} onSuccess={this.success}
                    cancelText={I18n.t('buttons.now')} onCancel={this.today}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DateTimePickerModal);
