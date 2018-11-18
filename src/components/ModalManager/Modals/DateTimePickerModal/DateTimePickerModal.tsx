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
import Button from 'src/components/FooterBar/Button/Button';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    options: { date?: Date };
    cancelButton: boolean;
    callback: (date: Date) => void;
}

interface State {
    date: Date;
    now: Date;
}

class DateTimePickerModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        const now = new Date();

        this.style = Styles(this.props.theme);
        this.state = {
            date: props.options && props.options.date ? props.options.date : now,
            now: now
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
        this.setState({ date: new Date() });
    }

    closeModal = () => {
        this.props.dispatch(ModalActions.datetimePickerClose());
    }

    render() {
        const showScrollToNowButton = Math.abs((this.state.now.getTime() - this.state.date.getTime()) / 1000) > 60;
        
        return (
            <View style={this.style.container}>
                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {showScrollToNowButton && <Button
                        style={this.style.scrollToNowButton.container}
                        textStyle={this.style.scrollToNowButton.text}
                        onPress={this.today}
                        text={I18n.t('buttons.scroll_to_now')} />}
                </View>
                <DatePicker
                    date={this.state.date}
                    onDateChange={(date: Date) => this.setState({ date })}
                    textColor={this.props.theme.colors.textColor}
                    maximumDate={new Date()}
                    locale={I18n.locale}
                />
                <ModalFooter loading={false}
                    successText={I18n.t('buttons.ok')} onSuccess={this.success}
                    cancelText={I18n.t('buttons.cancel')} onCancel={this.closeModal}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    options: state.modal.datetimePickerOptions
});

export default connect(mapStateToProps)(DateTimePickerModal);
