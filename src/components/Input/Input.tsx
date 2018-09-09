import React from 'react';
import { TextInput, View, KeyboardTypeOptions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import Styles from './Input.styles';

interface Props {
    theme: ThemeInterface;
    onChange: (value: string) => void;
    placeholder?: string;
    value?: string;
    password?: boolean;

    small?: boolean;
    authStyle?: boolean;
    style?: {};

    /**
     * enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
     * 'decimal-pad', 'twitter', 'web-search', 'visible-password')
     */
    keyboardType?: KeyboardTypeOptions;
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
            <View style={[this.style.container, {height: height}, containerStyle, this.props.style]}>
                <TextInput
                    keyboardType={this.props.keyboardType || "default"}
                    autoCapitalize={'none'}
                    secureTextEntry={this.props.password}
                    style={[this.style.input, inputStyle]}
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
