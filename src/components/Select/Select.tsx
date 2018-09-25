import React from 'react';
import { View, Text, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import Styles from './Select.styles';

interface Props {
    theme: ThemeInterface;
    onChange: (value: string) => void;
    placeholder?: string;
    small?: boolean;
    disabled?: boolean;
    value?: string;

    options: string[];
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

        const options = ['Cancel', ...this.props.options];

        ActionSheetIOS.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: 0
        },
            (buttonIndex) => {
                if (buttonIndex > 0) {
                    this.props.onChange(this.props.options[buttonIndex - 1]);
                }
            });
    }

    render() {
        const height = this.props.small ? 30 : 65;
        const containerStyle = this.style.formContainer;
        const inputStyle = this.style.formInput;

        return (
            <View style={[this.style.container, { height: height }, containerStyle]}>
                {!this.props.value && <Text
                    onPress={this.showPicker}
                    style={[inputStyle, { color: this.style.placeholderColor }]}>{this.props.placeholder}</Text>}
                {!!this.props.value && <Text
                    onPress={this.showPicker}
                    style={[inputStyle]}>{this.props.value}</Text>}

                <Icon name="chevron-down" size={20} color={this.props.disabled ? this.props.theme.colors.disableText : this.props.theme.colors.textColor} style={{ position: 'absolute', right: 0 }} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Select);
