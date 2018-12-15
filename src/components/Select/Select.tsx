import React from 'react';
import { View, Text, ActionSheetIOS, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import Styles from './Select.styles';
import { Dispatch } from 'redux';
import { ModalActions } from '../../store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onChange: (value: string) => void;
    placeholder?: string;
    small?: boolean;
    medium?: boolean;
    autoSize?: boolean;
    disabled?: boolean;
    value?: string;

    options: string[];

    containerStyle?: {}
    textStyle?: {}
}

class Select extends React.Component<Props> {
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

    showPicker = () => {
        if (this.props.disabled) {
            return;
        }

        const options = this.props.options.sort((a, b) => {
            return a.toLocaleUpperCase() > b.toLocaleUpperCase() ? 1 : -1;
        })
        const onPick = (index: number) => {
            this.props.onChange(options[index]);
        }

        this.props.dispatch(ModalActions.pickerOpen(options.map((string: String) => string.ucFirst()), true, onPick));
    }

    render() {
        const height = this.props.small ? 30 : this.props.medium ? 40 : 65;
        const containerStyle = this.style.formContainer;
        const inputStyle = [this.style.formInput, this.props.textStyle];

        return (
            <TouchableOpacity onPress={this.showPicker} style={[this.style.container, !this.props.autoSize && { height: height }, containerStyle, this.props.containerStyle]}>
                {!this.props.value && <Text
                    style={[inputStyle, { color: this.style.placeholderColor }]}>{this.props.placeholder}</Text>}
                {!!this.props.value && <Text
                    style={[inputStyle]}>{this.props.value}</Text>}
                <Icon name="chevron-down" size={20} color={this.props.disabled ? this.props.theme.colors.disableText : this.props.theme.colors.textColor} style={{ position: 'absolute', right: 5 }} />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Select);
