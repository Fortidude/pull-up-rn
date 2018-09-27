import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Styles from './PickerModal.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from '../../../../store/actions/modal';

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

        console.log("picker build");
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
                {this.props.options.map((option, key) => {
                    return <TouchableOpacity key={key} onPress={() => this.pickOption(key)}><Text>{option}</Text></TouchableOpacity>
                })}

                {this.props.cancelButton && <TouchableOpacity onPress={this.closeModal}>
                    <Text>Close</Text>
                </TouchableOpacity>}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(PickerModal);
