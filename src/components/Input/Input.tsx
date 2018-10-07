import React from 'react';
import { TextInput, View, KeyboardTypeOptions } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import Styles from './Input.styles';

interface Props {
    theme: ThemeInterface;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    value?: string;

    disabled?: boolean;
    password?: boolean;
    small?: boolean;
    authStyle?: boolean;

    style?: {};

    /**
     * enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
     * 'decimal-pad', 'twitter', 'web-search', 'visible-password')
     */
    keyboardType?: KeyboardTypeOptions;
    inputRef?: (ref: any) => void;
}

class Input extends React.Component<Props> {
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

    render() {
        const height = this.props.small ? 30 : 65;
        const containerStyle = this.props.authStyle ? this.style.authContainer : this.style.formContainer;
        const inputStyle = this.props.authStyle ? this.style.authInput : this.style.formInput;

        return (
            <View style={[this.style.container, { height: height }, containerStyle, this.props.style]}>
                <TextInput
                    ref={this.props.inputRef}
                    contextMenuHidden={this.props.disabled}
                    selectTextOnFocus={!this.props.disabled}
                    editable={!this.props.disabled}
                    keyboardType={this.props.keyboardType || "default"}
                    keyboardAppearance={this.props.theme.keyboardAppearance}
                    autoCapitalize={'none'}
                    secureTextEntry={this.props.password}
                    style={[this.style.input, inputStyle]}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onChangeText={this.props.onChange}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.style.placeholderColor}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Input);
