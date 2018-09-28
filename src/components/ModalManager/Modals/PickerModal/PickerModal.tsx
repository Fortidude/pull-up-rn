import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Styles from './PickerModal.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';

import I18n from 'src/assets/translations';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    options: [];
    cancelButton: boolean;
    callback: (index: number) => void;
}

class PickerModal extends React.Component<Props> {
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

    pickOption = (index: number) => {
        this.props.callback(index);
        this.closeModal();
    }

    closeModal = () => {
        this.props.dispatch(ModalActions.pickerClose());
    }

    render() {
        return (
            <View style={this.style.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={this.style.buttonsContainer}
                >
                    {this._renderPickerOptions()}
                </ScrollView>

                <View style={this.style.buttonsContainer}>
                    {this.props.cancelButton && <TouchableOpacity style={this.style.button} onPress={this.closeModal}>
                        <Text style={this.style.cancelText}>{I18n.t('buttons.cancel')}</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        );
    }

    _renderPickerOptions = () => {
        if (!this.props.options) {
            return null;
        }

        return this.props.options.map((option, key) => {
            return <TouchableOpacity key={key}
                style={this.style.button}
                onPress={() => this.pickOption(key)}>
                <Text style={this.style.text}>{option}</Text>
            </TouchableOpacity>
        });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(PickerModal);
